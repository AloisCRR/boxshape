import { pocketBaseService } from "@/data-access/pocketbase";
import { useLogin } from "@/hooks/useLogin";
import classes from "@/styles/AuthenticationTitle.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Container,
	Paper,
	PasswordInput,
	TextInput,
	Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
	redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
	component: RouteComponent,
	loader: () => {
		if (pocketBaseService.isAuthenticated()) {
			throw redirect({ to: "/app", replace: true });
		}
	},
	validateSearch: zodValidator(searchSchema),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(10, "Password must be at least 10 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function RouteComponent() {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate } = useLogin();

	const navigate = useNavigate();

	const { redirect } = Route.useSearch();

	const onSubmit = (data: LoginFormValues) => {
		mutate(data, {
			onSuccess: () => {
				notifications.show({
					title: "Login successful",
					message: "You are now logged in",
				});

				if (redirect) {
					navigate({ to: redirect });
				} else {
					navigate({ to: "/app" });
				}
			},
			onError: (error) => {
				console.log(error);

				notifications.show({
					title: "Login failed",
					message: error.message,
					color: "red",
				});
			},
		});
	};

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Onebox
			</Title>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<TextInput
						label="Email"
						placeholder="you@email.com"
						required
						{...form.register("email")}
						error={form.formState.errors.email?.message}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						mt="md"
						{...form.register("password")}
						error={form.formState.errors.password?.message}
					/>
					<Button fullWidth mt="xl" type="submit">
						Sign in
					</Button>
				</form>
			</Paper>
		</Container>
	);
}
