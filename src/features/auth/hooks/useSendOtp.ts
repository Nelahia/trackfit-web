import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const sendOtp = async (email: string) => {
  const response = await fetch(
    `http://localhost:3005/api/auth/email-otp/send-verification-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, type: "sign-in" }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send OTP");
  }

  return response.json();
};

export const useSendOtp = (
  options?: Omit<UseMutationOptions<any, Error, string>, "mutationFn">
) => {
  return useMutation({
    mutationFn: (email: string) => sendOtp(email),
    ...options,
  });
};
