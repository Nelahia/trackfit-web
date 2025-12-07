import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenue {user?.email}</p>
    </div>
  );
}
