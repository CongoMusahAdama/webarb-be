import * as transactionService from "../services/transactionService.js";


export const processWithdrawal = async (req, res) => {
  try {
    const { recipientCode, amount, userId } = req.body;
    const withdrawal = await transactionService.processWithdrawal(recipientCode, amount, userId);
    res.status(200).json({ success: true, data: withdrawal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyWithdrawal = async (req, res) => {
  try {
    const { transferCode } = req.body;
    const verification = await transactionService.verifyWithdrawal(transferCode);
    res.status(200).json({ success: true, data: verification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const finalizeWithdrawal = async (req, res) => {
  try {
    const { transferCode, otp } = req.body;
    const result = await transactionService.finalizeWithdrawal(transferCode, otp);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await transactionService.getUserTransactions(userId);
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTransactionStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;
    const updated = await transactionService.updateTransactionStatus(transactionId, status);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
