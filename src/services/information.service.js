import { InformationModel } from "../models/information.model.js";

export const InformationService = {
  async getBanners() {
    const banners = await InformationModel.getBanners();
    
    return banners;
  },

  async getServices() {
    const services = await InformationModel.getServices();

    return services;
  },
};
