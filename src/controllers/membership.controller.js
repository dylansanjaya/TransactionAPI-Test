import { MembershipService } from "../services/membership.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const registerUser = async (req, res) => {
  try {
    const user = await MembershipService.register(req.body);
    successResponse(res, "Registrasi berhasil silahkan login");
  } catch (err) {
    errorResponse(res, "Parameter email tidak sesuai format", 400, 102);
  }
};

export const loginUser = async (req, res) => {
  try {
    const token = await MembershipService.login(req.body);
    successResponse(res, "Login Sukses", 200, 0, token);
  } catch (err) {
    if (err.code && err.status) {
      return errorResponse(res, err.message, err.code, err.status);
    }
    errorResponse(res, "Parameter email tidak sesuai format", 400, 102);
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await MembershipService.getProfile(req.user.id);
    successResponse(res, "Sukses", 200, 0, user);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedData = await MembershipService.updateProfile(
      req.user.id,
      req.body
    );
    successResponse(res, "Update Profile Berhasil", 200, 0, updatedData);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const updatedData = await MembershipService.updateProfileImage(
      req.user.id,
      req.file.path
    );
    successResponse(res, "Update Profile Berhasil", 200, 0, updatedData);
  } catch (err) {
    if (err.code && err.status) {
      return errorResponse(res, err.message, err.code, err.status);
    }
    errorResponse(res, err.message);
  }
};
