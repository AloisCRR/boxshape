import type { Invoice } from "@/domain/entities/invoice";
import { useInvoices } from "@/hooks/useInvoices";
import { ActionIcon, Badge, Group, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconReceipt } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";

export const Route = createFileRoute("/app/clients/$clientId/invoices/")({
	component: RouteComponent,
});

const columnDefs: ColDef<Invoice>[] = [
	{ field: "number", headerName: "Invoice Number" },
	{
		field: "created",
		headerName: "Invoice Date",
		valueFormatter: (params: { value: string }) => {
			return dayjs(params.value).format("MMM D, YYYY h:mm A");
		},
		filter: "agDateColumnFilter",
		sort: "desc",
		sortIndex: 0,
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
	},
	{
		field: "status",
		cellRenderer: (params: { data: Invoice }) => {
			const { updateInvoice, updatingInvoice } = useInvoices();

			return updatingInvoice ? (
				<Badge>Updating...</Badge>
			) : (
				<Tooltip label="Click to toggle invoice status">
					<Badge
						onClick={() =>
							updateInvoice({
								invoiceId: params.data.id ?? "",
								invoice: {
									status: params.data.status === "paid" ? "unpaid" : "paid",
								},
							})
						}
						color={params.data.status === "paid" ? "green" : "red"}
					>
						{params.data.status}
					</Badge>
				</Tooltip>
			);
		},
	},
	{
		headerName: "Actions",
		sortable: false,
		filter: false,
		cellRenderer: (params: { data: Invoice }) => {
			const { clientId } = Route.useParams();

			const navigate = Route.useNavigate();

			return (
				<Group gap="xs" h="100%">
					<Tooltip label="View Invoice Items">
						<ActionIcon
							variant="light"
							color="orange"
							onClick={() => {
								const invoiceId = params.data.id;

								if (!invoiceId) {
									notifications.show({
										title: "Invoice ID not found",
										message: "Invoice ID not found",
										color: "red",
									});

									return;
								}

								return navigate({
									to: "/app/clients/$clientId/invoices/$invoiceId",
									params: { clientId, invoiceId },
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

// Default column configuration
const defaultColDef = {
	sortable: true,
	filter: true,
	resizable: true,
	flex: 1,
	minWidth: 200,
};

function RouteComponent() {
	const { clientId } = Route.useParams();

	const { invoicesOfClient } = useInvoices(clientId);

	return (
		<>
			<div
				className="ag-theme-alpine-auto-dark"
				style={{ height: 500, width: "100%" }}
			>
				<AgGridReact
					rowData={invoicesOfClient}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					animateRows={true}
				/>
			</div>
		</>
	);
}
