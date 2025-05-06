import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = process.env.PAYSTACK_BASE_URL || "https://api.paystack.co";

console.log("🚀 Using PAYSTACK_BASE_URL:", PAYSTACK_BASE_URL);
console.log("✅ PAYSTACK_SECRET_KEY:", process.env.PAYSTACK_SECRET_KEY ? "Loaded" : "Missing");

// 1. Initialize Payment
export const initializePayment = async (email, amount, callbackUrl) => {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Convert to kobo
        callback_url: callbackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Payment initialized:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Payment init error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Payment initialization failed");
  }
};

// 2. Verify Payment
export const verifyPayment = async (reference) => {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Payment verification response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Payment verification error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Payment verification failed");
  }
};

// 3. Process Withdrawal (Initiate Transfer)
export const processWithdrawal = async (recipientCode, amount) => {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transfer`,
      {
        source: "balance",
        reason: "Withdrawal",
        amount: amount * 100, // Convert to kobo
        recipient: recipientCode,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Withdrawal initiated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Withdrawal initiation error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Withdrawal failed");
  }
};

// 4. Verify Withdrawal Status
export const verifyWithdrawalStatus = async (transferCode) => {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transfer/${transferCode}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Withdrawal status:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Withdrawal status error:", error.response?.data || error.message);
    throw new Error("Failed to verify withdrawal status");
  }
};

// 5. Finalize Withdrawal (with OTP)
export const finalizeWithdrawal = async (transfer_code, otp) => {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transfer/finalize_transfer`,
      {
        transfer_code,
        otp,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Withdrawal finalized:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Finalize withdrawal error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to finalize withdrawal");
  }
};


// 6. Webhook handler (for future: attach this to your routes)
export const handleWebhook = async (req, res) => {
  try {
    const event = req.body;

    console.log("🚨 Paystack Webhook Event:", event.event);

    // Handle different event types
    if (event.event === "charge.success") {
      console.log("✅ Payment successful:", event.data);
      // TODO: Update your database: mark order as paid
    }

    if (event.event === "transfer.success") {
      console.log("✅ Transfer successful:", event.data);
      // TODO: Update your database: mark withdrawal as completed
    }

    if (event.event === "transfer.failed") {
      console.log("⚠️ Transfer failed:", event.data);
      // TODO: Update your database: mark withdrawal as failed
    }

    res.status(200).send("Webhook received");
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(500).send("Webhook handling error");
  }
};
