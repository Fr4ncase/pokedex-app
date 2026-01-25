// Node modules
import { createRootRoute, Outlet } from '@tanstack/react-router';

// Constants
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
