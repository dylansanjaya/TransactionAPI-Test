import pool from "../config/db.js";

export const InformationModel = {
  async getBanners() {
    const result = await pool.query(`SELECT banner_name, banner_image, description FROM banners ORDER BY id ASC`);
    return result.rows;
  },

  async getServices() {
    const result = await pool.query(`SELECT service_code, service_name, service_icon, service_tariff FROM services ORDER BY id ASC`);
    return result.rows;
  },

  async findServiceByCode(serviceCode) {
    const result = await pool.query(
      `SELECT * FROM services WHERE service_code = $1 LIMIT 1`,
      [serviceCode]
    );
    return result.rows[0];
  }
};
