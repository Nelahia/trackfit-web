import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export interface AuthContext {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    image: string | null;
  } | null;
}

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      auth: undefined!, // Will be set by AuthProvider
    },
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
