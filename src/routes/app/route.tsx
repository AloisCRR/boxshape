import { pocketBaseService } from "@/data-access/pocketbase";
import classes from "@/styles/Navbar.module.css";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTruck, IconUsers } from "@tabler/icons-react";
import {
	Link,
	Outlet,
	createFileRoute,
	redirect,
} from "@tanstack/react-router";
export const Route = createFileRoute("/app")({
	beforeLoad: () => {
		const isAuthenticated = pocketBaseService.isAuthenticated();

		if (!isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.pathname + location.search + location.hash,
				},
			});
		}
	},
	component: RouteComponent,
});

const data = [
	{ link: "/app", label: "Clients", icon: IconUsers },
	{ link: "/app/shipments", label: "Shipments", icon: IconTruck },
];

function RouteComponent() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: { base: 60, md: 70, lg: 80 } }}
			navbar={{
				width: { base: 150, md: 170, lg: 200 },
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				{data.map(({ link, label, icon: Icon }) => (
					<Link
						to={link}
						activeProps={{ "data-active": true }}
						className={classes.link}
						key={label}
					>
						<Icon className={classes.linkIcon} stroke={1.5} />
						<span>{label}</span>
					</Link>
				))}
			</AppShell.Navbar>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
