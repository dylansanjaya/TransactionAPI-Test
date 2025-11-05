import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { errorResponse } from '../utils/response.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
      return errorResponse(res, "Akses token kosong", 401, 108);
  }

  jwt.verify(token, env.JWT_SECRET, (err, user) => {
    if (err) {
      return errorResponse(res, "Token tidak valid atau kadaluarsa", 401, 108);
    }

    req.user = user;
    next();
  });
}