import pool from "../config/db.js";

export const MembershipModel = {
  async createUser({  email, first_name, last_name, password }) {
    const result = await pool.query(
      `INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name`,
      [email, first_name, last_name, password]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT email, first_name, last_name, profile_image FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async updateProfile(id, { first_name, last_name }) {
    const result = await pool.query(
      `UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING email, first_name, last_name, profile_image`,
      [first_name, last_name, id]
    );
    return result.rows[0];
  },

  async updateProfileImage(id, imageUrl) {
    const result = await pool.query(
      `UPDATE users SET profile_image = $1 WHERE id = $2 RETURNING email, first_name, last_name, profile_image`,
      [imageUrl, id]
    );
    return result.rows[0];
  },
};
