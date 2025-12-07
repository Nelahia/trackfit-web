import { LoginForm } from "@/features/login/login-form";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Suspense } from "react";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const isAuthenticated = true;

  return (
    <Activity mode={isAuthenticated ? "visible" : "hidden"}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </Activity>
  );
}
