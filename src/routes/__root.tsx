import { ClerkProvider } from "@clerk/clerk-react";
import {
	type MantineColorsTuple,
	MantineProvider,
	createTheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";

const boxshapeColor: MantineColorsTuple = [
	"#fff4e1",
	"#ffe8cc",
	"#fed09b",
	"#fdb766",
	"#fca13a",
	"#fc931d",
	"#fc8c0c",
	"#e17800",
	"#c86a00",
	"#af5a00",
];

const theme = createTheme({
	colors: {
		boxshapeColor: boxshapeColor,
	},
});

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

export const Route = createRootRoute({
	component: () => {
		return (
			<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
				<QueryClientProvider client={queryClient}>
					<MantineProvider theme={theme} defaultColorScheme="dark">
						<Notifications />
						<ModalsProvider>
							<Outlet />
						</ModalsProvider>
					</MantineProvider>
				</QueryClientProvider>
			</ClerkProvider>
		);
	},
});
