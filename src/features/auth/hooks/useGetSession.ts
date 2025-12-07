import { useQuery } from "@tanstack/react-query";
import { setAuth, clearAuth, type User } from "../stores/authStore";

interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

interface SessionResponse {
  user: User;
  session: Session;
}

export const getSession = async (): Promise<SessionResponse | null> => {
  const response = await fetch(`http://localhost:3005/api/auth/get-session`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export const useGetSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await getSession();

      if (data?.user && data?.session) {
        setAuth(data.session.token, data.user);
        return data;
      }

      clearAuth();
      return null;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
