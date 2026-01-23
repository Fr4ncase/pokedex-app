// Node modules
import { createFileRoute, Navigate } from '@tanstack/react-router';

// Constants
export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return <Navigate to='/pokemon' />;
}
