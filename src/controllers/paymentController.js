import * as paymentService from "../services/paymentService.js";


export const initializePayment = async(req, res) =>{
    try{
        const {email, amount, userId } = req.body;
        const callbackUrl = `${process.env.PAYSTACK_BASE_URL}/payments/verify`;

        const payment = await paymentService.createPayment({ email, amount, userId, callbackUrl });

        res.status(200).json({ success: true, payment });
    } catch (error){
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyPayment = async (req, res)=>{
    try {
        const { reference } = req.query;

        const paymentData = await paymentService.verifyPaymentStatus(reference);

        res.status(200).json({ success: true, data: paymentData });
    } catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createRecipient = async (req, res) => {
    const { user } = req.body;
  
    if (!user) {
      return res.status(400).json({ message: "User data is required." });
    }
  
    try {
      const recipientCode = await paymentService.createRecipient(user);
      return res.status(200).json({ recipientCode });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};
  
  