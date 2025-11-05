import pool from "../config/db.js";
import { generateInvoice } from "../utils/invoice.js";

export const TransactionModel = {
  async getBalance(userId) {
    const result = await pool.query(`SELECT balance FROM users WHERE id = $1`, [
      userId,
    ]);
    return result.rows[0];
  },

  async createTopupAndIncreaseBalance(userId, amount) {
    const client = await pool.connect();

    try {
      const invoiceNumber = generateInvoice();
      const description = "Top Up Balance";

      await client.query("BEGIN");

      await client.query(
        `INSERT INTO transactions (invoice_number, user_id, transaction_type_id, description, total_amount, created_at)
         VALUES ($1, $2, 1, $3, $4, NOW()) RETURNING *`,
        [invoiceNumber, userId, description, amount]
      );

      const balResult = await client.query(
        `UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING balance`,
        [amount, userId]
      );

      await client.query("COMMIT");

      return {
        balance: balResult.rows[0],
      };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async createTransactionAndUpdateBalance(userId, service) {
    const client = await pool.connect();

    try {
      const invoiceNumber = generateInvoice();

      await client.query("BEGIN");

      await client.query(
        `INSERT INTO transactions (invoice_number, user_id, service_id, transaction_type_id, description, total_amount, created_at)
         VALUES ($1, $2, $3, 2, $4, $5, NOW())`,
        [invoiceNumber, userId, service.id, service.service_name, service.service_tariff]
      );

      const balResult = await client.query(
        `UPDATE users SET balance = balance - $1 WHERE id = $2`,
        [service.service_tariff, userId]
      );

      const transactionHistory = await client.query(
        `SELECT t.invoice_number, s.service_code, s.service_name, tp.name as transaction_type, t.total_amount, t.created_at as created_on 
       FROM transactions as t 
       JOIN transaction_types as tp ON t.transaction_type_id = tp.id
       JOIN services as s ON t.service_id = s.id
       WHERE t.user_id = $1 AND t.invoice_number = $2`,
       [userId, invoiceNumber]
      )

      await client.query("COMMIT");

      return transactionHistory.rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async getHistory(userId, query) {
    const offset = query.offset ? parseInt(query.offset) : 0;
    const limit = query.limit ? parseInt(query.limit) : 10;

    const result = await pool.query(
      `SELECT t.invoice_number, tp.name as transaction_type, t.description, t.total_amount, t.created_at as created_on 
       FROM transactions as t 
       JOIN transaction_types as tp ON t.transaction_type_id = tp.id 
       WHERE t.user_id = $1 
       ORDER BY t.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
    return {
      offset: offset,
      limit: limit,
      records: result.rows,
    };
  },
};
