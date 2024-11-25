import type { Client } from "@/domain/entities/client";
import { CreateClientForm } from "@/features/client/create-client/form";
import { CreateShipmentForm } from "@/features/shipment/create-client-shipment/form";
import { useClients } from "@/hooks/useClients";
import { useInvoices } from "@/hooks/useInvoices";
import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconReceipt, IconTruck } from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";

export const Route = createFileRoute("/app/")({
	component: RouteComponent,
});

// Default column configuration
const defaultColDef = {
	sortable: true,
	filter: true,
	resizable: true,
	flex: 1,
	minWidth: 200,
};

const columnDefs: ColDef<Client>[] = [
	{ field: "name", headerName: "Name" },
	{ field: "email", headerName: "Email" },
	{ field: "phone", headerName: "Phone" },
	{
		field: "created",
		headerName: "Created",
		valueFormatter: (params: { value: string }) => {
			return dayjs(params.value).format("MMM D, YYYY h:mm A");
		},
		filter: "agDateColumnFilter",
		filterParams: {
			comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
				// Strip time component by converting to start of day
				const filterDate = dayjs(filterLocalDateAtMidnight).startOf("day");
				const cellDate = dayjs(cellValue).startOf("day");

				if (cellDate.isBefore(filterDate)) return -1;
				if (cellDate.isAfter(filterDate)) return 1;
				return 0;
			},
		},
		flex: 1,
	},
	{
		headerName: "Actions",
		sortable: false,
		filter: false,
		cellRenderer: (params: { data: Client }) => {
			const { createInvoice } = useInvoices();

			const navigate = useNavigate();

			const openCreateShipmentModal = () => {
				modals.open({
					title: "Create Shipment",
					size: "md",
					children: (
						<CreateShipmentForm
							clientId={params.data.id}
							onClose={() => modals.closeAll()}
						/>
					),
					centered: true,
				});
			};

			const openCreateInvoiceModal = () => {
				modals.openConfirmModal({
					title: "Create Invoice",
					children: `Are you sure you want to create an invoice for ${params.data.name}?`,
					labels: { confirm: "Create", cancel: "Cancel" },
					onConfirm: () => {
						const clientId = params.data.id;

						if (!clientId) {
							notifications.show({
								title: "Client ID not found",
								message: "Client ID not found",
								color: "red",
							});

							return;
						}

						createInvoice(
							{
								client: clientId,
								status: "unpaid",
							},
							{
								onSuccess(data) {
									const newInvoiceId = data.id;

									if (!newInvoiceId) {
										notifications.show({
											title: "Invoice creation failed",
											message: "Invoice creation failed, no ID returned",
											color: "red",
										});

										return;
									}

									navigate({
										to: "/app/clients/$clientId/invoices/$invoiceId",
										params: { clientId, invoiceId: newInvoiceId },
									});
								},
							},
						);
					},
				});
			};

			return (
				<Group gap="xs" h="100%">
					<Tooltip label="Create Shipment">
						<ActionIcon
							variant="light"
							color="blue"
							onClick={openCreateShipmentModal}
						>
							<IconTruck size={16} />
						</ActionIcon>
					</Tooltip>
					<Tooltip label="Create Invoice">
						<ActionIcon
							variant="light"
							color="green"
							onClick={openCreateInvoiceModal}
						>
							<IconReceipt size={16} />
						</ActionIcon>
					</Tooltip>
					<Tooltip label="View Invoices">
						<ActionIcon
							variant="light"
							color="orange"
							onClick={() => {
								const clientId = params.data.id;

								if (!clientId) {
									notifications.show({
										title: "Client ID not found",
										message: "Client ID not found",
										color: "red",
									});

									return;
								}

								return navigate({
									to: "/app/clients/$clientId/invoices",
									params: { clientId },
								});
							}}
						>
							<IconReceipt size={16} />
						</ActionIcon>
					</Tooltip>
				</Group>
			);
		},
		width: 160,
		flex: 0,
	},
];

function RouteComponent() {
	const { clients } = useClients();

	const openCreateClientModal = () => {
		modals.open({
			title: "Create New Client",
			size: "md",
			children: <CreateClientForm onClose={() => modals.closeAll()} />,
			centered: true,
		});
	};

	return (
		<>
			<Group mb="md">
				<Button onClick={openCreateClientModal}>Create Client</Button>
			</Group>
			<div
				className="ag-theme-alpine-auto-dark"
				style={{ height: 500, width: "100%" }}
			>
				<AgGridReact
					rowData={clients}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					animateRows={true}
				/>
			</div>
		</>
	);
}
