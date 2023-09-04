export const processPayment = async (paymentData) => {
  try {
    // Simulate CALL API
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return { success: true, message: "Pago exitoso" };
  } catch (error) {
    return { success: false, message: "Error en el pago" };
  }
};
