import { pocketBaseService } from "@/data-access/pocketbase";
import type { Invoice } from "@/domain/entities/invoice";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useInvoices = (clientId?: string, invoiceId?: string) => {
	const { data: invoices, isFetching: loadingInvoices } = useQuery<Invoice[]>({
		queryKey: ["invoices"],
		queryFn: pocketBaseService.getInvoices,
	});

	const { data: invoice, isFetching: loadingInvoice } = useQuery<Invoice>({
		queryKey: ["invoice", invoiceId],
		queryFn: () => pocketBaseService.getInvoice(invoiceId ?? ""),
		enabled: !!invoiceId,
	});

	const { data: invoicesOfClient, isFetching: loadingInvoicesOfClient } =
		useQuery<Invoice[]>({
			queryKey: ["invoices", clientId],
			queryFn: () => pocketBaseService.getInvoicesOfClient(clientId ?? ""),
			enabled: !!clientId,
		});

	const queryClient = useQueryClient();

	const { mutate: createInvoice, isPending: creatingInvoice } = useMutation({
		mutationFn: pocketBaseService.createInvoice,
		onSuccess: () => {
			notifications.show({
				title: "Invoice created",
				message: "Invoice created successfully",
				color: "green",
			});
		},
		onError: (error) => {
			notifications.show({
				title: "Invoice creation failed",
				message: error.message,
				color: "red",
			});
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["invoices"] });
			await queryClient.invalidateQueries({ queryKey: ["invoices", clientId] });
		},
	});

	const { mutate: updateInvoice, isPending: updatingInvoice } = useMutation({
		mutationFn: ({
			invoiceId,
			invoice,
		}: { invoiceId: string; invoice: Partial<Invoice> }) =>
			pocketBaseService.updateInvoice(invoiceId, invoice),
		onSuccess: () => {
			notifications.show({
				title: "Invoice updated",
				message: "Invoice updated successfully",
				color: "green",
			});
		},
		onError: (error) => {
			notifications.show({
				title: "Invoice update failed",
				message: error.message,
				color: "red",
			});
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["invoices"] });
			await queryClient.invalidateQueries({ queryKey: ["invoices", clientId] });
		},
	});

	return {
		invoices,
		loadingInvoices,
		createInvoice,
		creatingInvoice,
		invoicesOfClient,
		loadingInvoicesOfClient,
		updateInvoice,
		updatingInvoice,
		invoice,
		loadingInvoice,
	};
};
