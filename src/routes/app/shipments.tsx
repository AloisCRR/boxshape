import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/shipments")({
	component: RouteComponent,
});

function RouteComponent() {
	return "Hello /app/shipments!";
}
