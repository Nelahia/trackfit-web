import { Store } from "@tanstack/store";

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export const authStore = new Store<AuthState>({
  token: null,
  user: null,
  isAuthenticated: false,
});

export const setAuth = (token: string, user: User) => {
  authStore.setState(() => ({
    token,
    user,
    isAuthenticated: true,
  }));
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  authStore.setState(() => ({
    token: null,
    user: null,
    isAuthenticated: false,
  }));
  localStorage.removeItem("user");
};

export const initAuth = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser) as User;
    authStore.setState((state) => ({
      ...state,
      user,
    }));
  }
};
