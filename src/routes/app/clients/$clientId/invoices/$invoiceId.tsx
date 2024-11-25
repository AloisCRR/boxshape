import type { InvoiceItem } from "@/domain/entities/invoice";
import type { Shipment } from "@/domain/entities/shipment";
import { CreateInvoiceItemForm } from "@/features/invoice/create-invoice-item/form";
import { useInvoiceItems } from "@/hooks/useInvoiceItems";
import { ActionIcon, Button, Group, Paper, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

export const Route = createFileRoute(
	"/app/clients/$clientId/invoices/$invoiceId",
)({
	component: RouteComponent,
});

const columnDefs: ColDef<InvoiceItem & { shipment: Shipment }>[] = [
	{
		headerName: "Actions",
		sortable: false,
		filter: false,
		flex: 0,
		width: 100,
		cellRenderer: (params: { data: InvoiceItem & { shipment: Shipment } }) => {
			const { clientId, invoiceId } = Route.useParams();

			const { updateItem } = useInvoiceItems(invoiceId);

			const openEditInvoiceItemModal = () => {
				modals.open({
					title: "Edit Invoice Item",
					size: "md",
					children: (
						<CreateInvoiceItemForm
							mode="edit"
							clientId={clientId}
							invoiceId={invoiceId}
							defaultValues={{
								amount: params.data.amount,
								description: params.data.description,
								tracking_code: params.data.trackingCode,
								shipment: `${params.data.shipment.id}-${params.data.shipment.poBoxNumber}`,
							}}
							onClose={() => modals.closeAll()}
							onSubmit={(data) => {
								updateItem(
									{
										invoiceItemId: params.data.id ?? "",
										invoiceItem: data,
									},
									{
										onSuccess: () => {
											modals.closeAll();
										},
									},
								);
							}}
						/>
					),
					centered: true,
				});
			};

			return (
				<Group gap="xs" h="100%">
					<Tooltip label="Edit">
						<ActionIcon
							variant="light"
							color="blue"
							onClick={openEditInvoiceItemModal}
						>
							<IconEdit size={16} />
						</ActionIcon>
					</Tooltip>
				</Group>
			);
		},
	},
	{ field: "amount", headerName: "Amount" },
	{ field: "trackingCode", headerName: "Tracking Code" },
	{ field: "shipment.shipmentType", headerName: "Shipment Type" },
	{ field: "description", headerName: "Description" },
	{ field: "shipment.poBoxNumber", headerName: "Shipment PO Box Number" },
	{ field: "shipment.price", headerName: "Shipment Price" },
	{ field: "shipment.unit", headerName: "Shipment Unit" },
	{
		headerName: "Total",
		valueGetter: (params) => {
			const amount = params.data?.amount || 0;
			const price = params.data?.shipment?.price || 0;
			return amount * price;
		},
		valueFormatter: (params) => {
			// Format as currency
			return params.value?.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			});
		},
	},
];

// Default column configuration
const defaultColDef = {
	sortable: true,
	filter: true,
	resizable: true,
	flex: 1,
	minWidth: 100,
};

function RouteComponent() {
	const { invoiceId, clientId } = Route.useParams();
	const { itemsWithShipment } = useInvoiceItems(invoiceId);

	const grandTotal =
		itemsWithShipment?.reduce((sum, item) => {
			const lineTotal = (item.amount || 0) * (item.shipment?.price || 0);
			return sum + lineTotal;
		}, 0) ?? 0;

	const openCreateInvoiceItemModal = () => {
		modals.open({
			title: "Create New Invoice Item",
			size: "md",
			children: (
				<CreateInvoiceItemForm
					onClose={() => modals.closeAll()}
					invoiceId={invoiceId}
					clientId={clientId}
					mode="create"
				/>
			),
			centered: true,
		});
	};

	return (
		<>
			<Group mb="md">
				<Button onClick={openCreateInvoiceItemModal}>
					Create Invoice Item
				</Button>
				<Paper p="md" ml="auto" withBorder>
					<Group justify="flex-end">
						<Text fw={500}>
							Grand Total:{" "}
							{grandTotal.toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
							})}
						</Text>
					</Group>
				</Paper>
			</Group>
			<div
				className="ag-theme-alpine-auto-dark"
				style={{ height: 500, width: "100%" }}
			>
				<AgGridReact
					rowData={itemsWithShipment}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					animateRows={true}
				/>
			</div>
		</>
	);
}
