export const processPayment = async (paymentData) => {
  try {
    // Simula una respuesta exitosa al 80% y una respuesta de error al 20%
    const random = Math.random();
    if (random <= 0.8) {
      return { success: true, message: "Pago exitoso" };
    } else {
      throw new Error("Error de pago");
    }
  } catch (error) {
    throw new Error("Error de pago");
  }
};
