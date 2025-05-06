import { processWithdrawal as paystackWithdrawal, 
        verifyWithdrawalStatus, 
        finalizeWithdrawal as paystackFinalizeWithdrawal } from "../config/paystack.js";
import Transaction from "../models/Transaction.js";

export const processWithdrawal = async (recipientCode, amount, userId) => {
  try {
    const response = await paystackWithdrawal(recipientCode, amount);
    
    // Create transaction record
    const transaction = await Transaction.create({
      userId,
      amount,
      reference: response.data.reference,
      status: "pending",
      channel: "withdrawal",
      type: "debit"
    });

    return {
      ...response.data,
      transactionId: transaction.id
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const verifyWithdrawal = async (transferCode) => {
  try {
    const response = await verifyWithdrawalStatus(transferCode);
    
    // Update transaction status
    await Transaction.update(
      { status: response.data.status },
      { where: { reference: response.data.reference } }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const finalizeWithdrawal = async (transferCode, otp) => {
  try {
    const response = await paystackFinalizeWithdrawal(transferCode, otp);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllTransactions = async () => {
  try {
    return await Transaction.findAll({
      order: [['createdAt', 'DESC']]
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserTransactions = async (userId) => {
  try {
    return await Transaction.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTransactionStatus = async (transactionId, status) => {
  try {
    const [updated] = await Transaction.update(
      { status },
      { where: { id: transactionId } }
    );
    
    if (updated) {
      return await Transaction.findByPk(transactionId);
    }
    throw new Error('Transaction not found');
  } catch (error) {
    throw new Error(error.message);
  }
};
