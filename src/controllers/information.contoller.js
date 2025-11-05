import { InformationService } from "../services/information.service.js";
import { successResponse, errorResponse } from "../utils/response.js";


export const getBanner = async (req, res) => {
  try {
    const banners = await InformationService.getBanners();
    successResponse(res, "Sukses", 200, 0, banners);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await InformationService.getServices();
    successResponse(res, "Sukses", 200, 0, services);
  } catch (err) {
    errorResponse(res, err.message);
  }
};
