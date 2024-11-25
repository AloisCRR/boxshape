import { useInvoiceItems } from "@/hooks/useInvoiceItems";
import { useShipments } from "@/hooks/useShipments";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	CloseButton,
	Combobox,
	Group,
	NumberInput,
	TextInput,
	useCombobox,
} from "@mantine/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Add client schema for validation
const createInvoiceItemSchema = z.object({
	amount: z.number().min(1, "Amount is required"),
	tracking_code: z.string().min(1, "Tracking code is required"),
	description: z.string(),
	shipment: z.string().min(1, "Shipment is required"),
});

export type ICreateInvoiceItemForm = z.infer<typeof createInvoiceItemSchema>;

// Add the form component
export function CreateInvoiceItemForm({
	onClose,
	clientId,
	invoiceId,
	defaultValues,
	onSubmit,
	mode = "create",
}:
	| {
			onClose?: () => void;
			clientId: string;
			invoiceId: string;
			mode: "create";
			defaultValues?: undefined;
			onSubmit?: undefined;
	  }
	| {
			mode: "edit";
			onClose?: () => void;
			clientId: string;
			invoiceId: string;
			defaultValues: Partial<ICreateInvoiceItemForm>;
			onSubmit: (data: ICreateInvoiceItemForm) => void;
	  }) {
	const form = useForm<ICreateInvoiceItemForm>({
		resolver: zodResolver(createInvoiceItemSchema),
		defaultValues: {
			...defaultValues,
			shipment: defaultValues?.shipment?.split("-")[0],
		},
	});

	const { createItem, creatingItem } = useInvoiceItems(invoiceId);

	const { shipmentsOfClient } = useShipments(clientId);

	const onSubmitForm = (data: ICreateInvoiceItemForm) => {
		createItem(
			{
				amount: data.amount,
				trackingCode: data.tracking_code,
				description: data.description,
				invoiceNumber: invoiceId,
				shipmentType: data.shipment,
			},
			{
				onSuccess: () => {
					onClose?.();
				},
			},
		);
	};

	const combobox = useCombobox();

	const [shipmentTypeValue, setShipmentTypeValue] = useState(
		defaultValues?.shipment?.split("-")[1] ?? "",
	);

	const shouldFilterOptions = !shipmentsOfClient?.some(
		(item) => item.shipmentType === shipmentTypeValue,
	);

	const filteredOptions = shouldFilterOptions
		? shipmentsOfClient?.filter((item) =>
				item.shipmentType
					.toLowerCase()
					.includes(shipmentTypeValue.toLowerCase().trim()),
			)
		: shipmentsOfClient;

	const options = filteredOptions?.map((item) => (
		<Combobox.Option value={`${item.id}-${item.poBoxNumber}`} key={item.id}>
			{item.shipmentType} / {item.poBoxNumber} / {item.price} / {item.unit}
		</Combobox.Option>
	));

	return (
		<form onSubmit={form.handleSubmit(onSubmit || onSubmitForm)}>
			<Controller
				control={form.control}
				name="amount"
				render={({ field: { onChange, ...rest }, fieldState }) => (
					<NumberInput
						label="Amount"
						placeholder="Amount of billable units. Example: 2 * 2.90 / lb = 5.80"
						min={1}
						error={fieldState.error?.message}
						mb="md"
						onChange={(value) => onChange(value)}
						{...rest}
					/>
				)}
			/>
			<TextInput
				label="Tracking code"
				placeholder="Enter tracking code"
				{...form.register("tracking_code")}
				error={form.formState.errors.tracking_code?.message}
				mb="md"
			/>
			<TextInput
				label="Description"
				placeholder="Optional description of the item"
				{...form.register("description")}
				error={form.formState.errors.description?.message}
				mb="md"
			/>
			<Controller
				control={form.control}
				name="shipment"
				render={({ field, fieldState }) => (
					<Combobox
						position="bottom"
						onOptionSubmit={(optionValue) => {
							const [shipmentId, poBoxNumber] = optionValue.split("-");

							setShipmentTypeValue(poBoxNumber);

							field.onChange(shipmentId);

							combobox.closeDropdown();
						}}
						store={combobox}
						withinPortal={false}
					>
						<Combobox.Target>
							<TextInput
								label="Shipment type"
								placeholder="Select the shipment type used for this item"
								value={shipmentTypeValue}
								onChange={(event) => {
									setShipmentTypeValue(event.currentTarget.value);
									combobox.openDropdown();
									combobox.updateSelectedOptionIndex();
								}}
								onClick={() => combobox.openDropdown()}
								onFocus={() => combobox.openDropdown()}
								onBlur={() => {
									field.onBlur();

									return combobox.closeDropdown();
								}}
								name={field.name}
								disabled={field.disabled}
								ref={field.ref}
								error={fieldState.error?.message}
								rightSection={
									shipmentTypeValue !== "" && (
										<CloseButton
											size="sm"
											onMouseDown={(event) => event.preventDefault()}
											onClick={() => {
												setShipmentTypeValue("");
												field.onChange("");
											}}
											aria-label="Clear value"
										/>
									)
								}
							/>
						</Combobox.Target>

						<Combobox.Dropdown>
							<Combobox.Options>
								{!options || options.length === 0 ? (
									<Combobox.Empty>Nothing found</Combobox.Empty>
								) : (
									options
								)}
							</Combobox.Options>
						</Combobox.Dropdown>
					</Combobox>
				)}
			/>
			<Group justify="flex-end" mt="xl">
				<Button variant="outline" onClick={onClose} loading={creatingItem}>
					Cancel
				</Button>
				<Button type="submit">
					{mode === "create" ? "Create Item" : "Update Item"}
				</Button>
			</Group>
		</form>
	);
}
