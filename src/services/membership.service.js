import { MembershipModel } from "../models/membership.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorThrower } from "../utils/error.js";
import path from "path";
import { env } from "../config/env.js";

export const MembershipService = {
  async register({ email, first_name, last_name, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await MembershipModel.createUser({
      email,
      first_name,
      last_name,
      password: hashedPassword,
    });

    return newUser;
  },

  async login({ email, password }) {
    const user = await MembershipModel.findByEmail(email);
    if (!user) throw new errorThrower("Username atau password salah", 401, 103);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new errorThrower("Username atau password salah", 401, 103);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { token };
  },

  async getProfile(userId) {
    const user = await MembershipModel.findById(userId);

    return user;
  },

  async updateProfile(userId, body) {
    const user = await MembershipModel.updateProfile(userId, body);

    return user;
  },

  async updateProfileImage(userId, filePath) {

    // handler image cuma bisa png atau jpg aja kalo bukan return error 
    const ext = path.extname(filePath).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      throw new errorThrower("Format image tidak sesuai", 400, 102);
    }

    const imageUrl = `http://localhost:${env.PORT}/uploads/${path.basename(filePath)}`;

    const user = await MembershipModel.updateProfileImage(userId, imageUrl);

    return user;
  },
};
