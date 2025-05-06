import { initializePayment, verifyPayment } from "../config/paystack.js";
import Transaction from "../models/Transaction.js";

// Create payment
export const createPayment = async ({ email, amount, userId, callbackUrl }) => {
    const response = await initializePayment(email, amount, callbackUrl);

    await Transaction.create({
        userId,
        amount,
        reference: response.data.reference,
        status: "pending",
    });
    return response.data;
};

// Verify Payment Status
export const verifyPaymentStatus = async (reference) => {
    const response = await verifyPayment(reference);

    const { status, data } = response;
    if (status === "success") {
        await Transaction.update(
            { status: data.status, channel: data.channel },
            { where: { reference } }
        );
    }

    return data;
};




