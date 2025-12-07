import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    // Vérifier si l'utilisateur est connecté
    const response = await fetch("http://localhost:3005/api/auth/get-session", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.user) {
        // Utilisateur connecté -> dashboard
        throw redirect({ to: "/dashboard" });
      }
    }

    // Non connecté -> login
    throw redirect({ to: "/auth/login" });
  },
});
