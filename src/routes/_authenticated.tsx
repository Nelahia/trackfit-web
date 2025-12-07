import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") {
      return { user: null, session: null };
    }

    const response = await fetch("http://localhost:3005/api/auth/get-session", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }

    const data = await response.json();

    if (!data?.user) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }

    return {
      user: data.user,
      session: data.session,
    };
  },
  component: () => <Outlet />,
});
