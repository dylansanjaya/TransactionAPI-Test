import { TransactionService } from "../services/transaction.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getUserBalance = async (req, res) => {
  try {
    const balance = await TransactionService.getBalance(req.user.id);
    successResponse(res, "Get Balance Berhasil", 200, 0, balance);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

export const topupUserBalance = async (req, res) => {
  try {
    const result = await TransactionService.topup(
      req.user.id,
      req.body.top_up_amount
    );
    successResponse(res, "Top Up Balance berhasil", 200, 0, result);
  } catch (err) {
    if (err.code && err.status) {
      return errorResponse(res, err.message, err.code, err.status);
    }
    errorResponse(res, err.message);
  }
};

export const createUserTransaction = async (req, res) => {
  try {
    const transaction = await TransactionService.createTransaction(
      req.user.id,
      req.body.service_code
    );
    successResponse(res, "Transaksi Berhasil", 200, 0, transaction);
  } catch (err) {
    if (err.code && err.status) {
      return errorResponse(res, err.message, err.code, err.status);
    }
    errorResponse(res, err.message);
  }
};

export const getUserTransactionsHistory = async (req, res) => {
  try {
    const history = await TransactionService.getHistory(req.user.id, req.query);
    successResponse(res, "Get History Berhasil", 200, 0, history);
  } catch (err) {
    errorResponse(res, err.message);
  }
};
