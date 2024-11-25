import { useShipments } from "@/hooks/useShipments";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	Group,
	NumberInput,
	Select,
	TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const createShipmentSchema = z.object({
	shipmentType: z.enum(["air", "sea"]),
	price: z.number().min(1, "Price must be greater than 0"),
	unit: z.string().min(1, "Unit is required"),
});

export type ICreateShipmentForm = z.infer<typeof createShipmentSchema>;

export function CreateShipmentForm({
	clientId,
	onClose,
}: { clientId?: string; onClose: () => void }) {
	const { createShipment, creatingShipment } = useShipments();

	const form = useForm<ICreateShipmentForm>({
		resolver: zodResolver(createShipmentSchema),
	});

	const onSubmit = (data: ICreateShipmentForm) => {
		if (!clientId) {
			notifications.show({
				title: "Error",
				message: "Client ID is required",
				color: "red",
			});

			return;
		}

		createShipment({ ...data, clientId }, { onSuccess: onClose });
	};

	return (
		<Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
			<Controller
				control={form.control}
				name="shipmentType"
				render={({ field, fieldState }) => (
					<Select
						label="Shipment type"
						placeholder="Select shipment type"
						data={[
							{ value: "air", label: "Air" },
							{ value: "sea", label: "Sea" },
						]}
						error={fieldState.error?.message}
						mb="md"
						{...field}
					/>
				)}
			/>

			<Controller
				control={form.control}
				name="price"
				render={({ field: { onChange, ...rest }, fieldState }) => (
					<NumberInput
						label="Price"
						placeholder="Price per unit. Example: 2$/lb"
						min={1}
						error={fieldState.error?.message}
						mb="md"
						onChange={(value) => onChange(value)}
						{...rest}
					/>
				)}
			/>

			<TextInput
				label="Unit"
				placeholder="Unit used for the price. Example: lb or lb/ft"
				{...form.register("unit")}
				error={form.formState.errors.unit?.message}
				mb="md"
			/>

			<Group justify="flex-end" mt="xl">
				<Button variant="light" onClick={onClose}>
					Cancel
				</Button>
				<Button type="submit" loading={creatingShipment}>
					Create Shipment
				</Button>
			</Group>
		</Box>
	);
}
