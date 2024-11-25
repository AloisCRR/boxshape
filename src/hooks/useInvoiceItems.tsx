import { pocketBaseService } from "@/data-access/pocketbase";
import type { InvoiceItem } from "@/domain/entities/invoice";
import type { Shipment } from "@/domain/entities/shipment";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useInvoiceItems = (invoiceId: string) => {
	const { data: items, isFetching: loadingItems } = useQuery<InvoiceItem[]>({
		queryKey: ["invoice-items", invoiceId],
		queryFn: () => pocketBaseService.getInvoiceItems(invoiceId),
	});

	const { data: itemsWithShipment, isFetching: loadingItemsWithShipment } =
		useQuery<(InvoiceItem & { shipment: Shipment })[]>({
			queryKey: ["invoice-items-with-shipment", invoiceId],
			queryFn: () => pocketBaseService.getInvoiceItemsWithShipment(invoiceId),
		});

	const queryClient = useQueryClient();

	const { mutate: createItem, isPending: creatingItem } = useMutation({
		mutationFn: pocketBaseService.createInvoiceItem,
		onSuccess: () => {
			notifications.show({
				title: "Item added",
				message: "Invoice item added successfully",
				color: "green",
			});
		},
		onError: (error) => {
			notifications.show({
				title: "Failed to add item",
				message: error.message,
				color: "red",
			});
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["invoice-items", invoiceId],
			});

			await queryClient.invalidateQueries({
				queryKey: ["invoice-items-with-shipment", invoiceId],
			});
		},
	});

	const { mutate: updateItem, isPending: updatingItem } = useMutation({
		mutationFn: ({
			invoiceItemId,
			invoiceItem,
		}: {
			invoiceItemId: string;
			invoiceItem: Partial<InvoiceItem>;
		}) => pocketBaseService.updateInvoiceItem(invoiceItemId, invoiceItem),
		onSuccess: () => {
			notifications.show({
				title: "Item updated",
				message: "Invoice item updated successfully",
				color: "green",
			});
		},
		onError: (error) => {
			notifications.show({
				title: "Failed to update item",
				message: error.message,
				color: "red",
			});
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["invoice-items", invoiceId],
			});

			await queryClient.invalidateQueries({
				queryKey: ["invoice-items-with-shipment", invoiceId],
			});
		},
	});

	return {
		items,
		loadingItems,
		createItem,
		creatingItem,
		itemsWithShipment,
		loadingItemsWithShipment,
		updateItem,
		updatingItem,
	};
};
