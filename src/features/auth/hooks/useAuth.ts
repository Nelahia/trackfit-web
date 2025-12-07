import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const sendAuthentication = async (email: string, otp: string) => {
  const response = await fetch(
    `http://localhost:3005/api/auth/sign-in/email-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send OTP");
  }

  return response.json();
};

export const useAuth = (
  options?: Omit<
    UseMutationOptions<any, Error, { email: string; otp: string }>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      sendAuthentication(email, otp),
    ...options,
  });
};
