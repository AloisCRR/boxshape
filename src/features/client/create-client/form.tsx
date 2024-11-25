import { useClients } from "@/hooks/useClients";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Add client schema for validation
const createClientSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().length(8, "Phone must be exactly 8 characters"),
});

export type ICreateClientForm = z.infer<typeof createClientSchema>;

// Add the form component
export function CreateClientForm({ onClose }: { onClose: () => void }) {
	const form = useForm<ICreateClientForm>({
		resolver: zodResolver(createClientSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	});

	const { createClient, creatingClient } = useClients();

	const onSubmit = (data: ICreateClientForm) => {
		createClient(data);

		onClose();
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<TextInput
				label="Name"
				placeholder="Enter client name"
				{...form.register("name")}
				error={form.formState.errors.name?.message}
				mb="md"
			/>
			<TextInput
				label="Email"
				placeholder="Enter client email"
				{...form.register("email")}
				error={form.formState.errors.email?.message}
				mb="md"
			/>
			<TextInput
				label="Phone"
				placeholder="Enter client phone"
				{...form.register("phone")}
				error={form.formState.errors.phone?.message}
				mb="md"
			/>
			<Group justify="flex-end" mt="xl">
				<Button variant="outline" onClick={onClose} loading={creatingClient}>
					Cancel
				</Button>
				<Button type="submit">Create Client</Button>
			</Group>
		</form>
	);
}
