import Paystack from "@paystack/paystack-sdk";

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

export const initialize = async (email, amount, courseId) => {
  const response = await paystack.transaction.initialize({
    email,
    amount,
    callback_url: `${process.env.BASE_URL}/enrollments/verify/${courseId}`
  });

  console.log(response);
  return response;
};

export const verify = async (reference) => {
  const response = await paystack.transaction.verify({ reference });

  console.log(response);
  return response;
};
