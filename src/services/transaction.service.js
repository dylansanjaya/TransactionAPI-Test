import { TransactionModel } from "../models/transaction.model.js";
import { MembershipModel } from "../models/membership.model.js";
import { InformationModel } from "../models/information.model.js";
import { errorResponse } from "../utils/response.js";
import { errorThrower } from "../utils/error.js";

export const TransactionService = {
  async getBalance(userId) {
    const balance = await TransactionModel.getBalance(userId);

    return balance;
  },

  async topup(userId, amount) {
    if (!Number.isInteger(amount) || amount <= 0)
    throw new errorThrower("Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0", 400, 102);
    const transaction = await TransactionModel.createTopupAndIncreaseBalance(userId, amount);

    return transaction;
  },

  async createTransaction(userId, serviceCode) {
    const service = await InformationModel.findServiceByCode(serviceCode);
    if (!service) throw new errorThrower("Service ataus Layanan tidak ditemukan", 400, 102);

    const balance = await TransactionModel.getBalance(userId);
    if (balance.balance < service.service_tariff)
      throw new errorResponse("Balance user tidak mumpuni", 400, 103);

    const transaction = await TransactionModel.createTransactionAndUpdateBalance(userId, service);

    return transaction;
  },

  async getHistory(userId, query) {
    const history = await TransactionModel.getHistory(userId, query);

    return history;
  },
};
