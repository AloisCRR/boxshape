import classes from "@/styles/AuthenticationTitle.module.css";
import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
} from "@clerk/clerk-react";
import {
	Button,
	Container,
	Divider,
	Paper,
	Stack,
	Text,
	Title,
	rem,
} from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const searchSchema = z.object({
	redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
	component: RouteComponent,
	validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Welcome to Boxshape
			</Title>
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Sign in to access your dashboard
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<SignedOut>
					<Stack>
						<SignInButton mode="modal">
							<Button
								leftSection={<IconBrandGoogle style={{ width: rem(18) }} />}
								variant="default"
								size="md"
								fullWidth
							>
								Continue with Google
							</Button>
						</SignInButton>

						<Divider
							label="or continue with email"
							labelPosition="center"
							my="lg"
						/>

						<SignInButton mode="modal">
							<Button size="md" fullWidth>
								Sign in with Email
							</Button>
						</SignInButton>
					</Stack>
				</SignedOut>

				<SignedIn>
					<Stack>
						<Text size="sm" ta="center" mb="md">
							You are currently signed in
						</Text>
						<SignOutButton>
							<Button variant="light" color="red" fullWidth>
								Sign Out
							</Button>
						</SignOutButton>
					</Stack>
				</SignedIn>
			</Paper>
		</Container>
	);
}
