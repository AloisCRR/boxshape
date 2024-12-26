import type { Client } from "@/domain/entities/client";
import type { Shipment } from "@/domain/entities/shipment";
import { useShipments } from "@/hooks/useShipments";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";

export const Route = createFileRoute("/app/shipments")({
	component: RouteComponent,
});

const columnDefs: ColDef<Shipment & { client: Client }>[] = [
	{
		headerName: "Actions",
		sortable: false,
		filter: false,
		width: 100,
		flex: 0,
		cellRenderer: (_: { data: Shipment & { client: Client } }) => {
			return (
				<Group gap="xs" h="100%">
					<Tooltip label="Edit">
						<ActionIcon variant="light" color="blue">
							<IconEdit size={16} />
						</ActionIcon>
					</Tooltip>
				</Group>
			);
		},
	},
	{ field: "client.name", headerName: "Client" },
	{ field: "client.email", headerName: "Email" },
	{ field: "client.phone", headerName: "Phone" },
	{ field: "shipmentType", headerName: "Type" },
	{ field: "poBoxNumber", headerName: "PO Box Number" },
	{ field: "price", headerName: "Price" },
	{ field: "unit", headerName: "Unit" },
	{
		field: "created",
		headerName: "Created Date",
		valueFormatter: (params: { value: string }) => {
			return dayjs(params.value).format("MMM D, YYYY h:mm A");
		},
		filter: "agDateColumnFilter",
		sort: "desc",
		sortIndex: 0,
	},
];

const defaultColDef = {
	sortable: true,
	filter: true,
	resizable: true,
	flex: 1,
	minWidth: 100,
};

function RouteComponent() {
	const { shipmentsWithClient, loadingShipmentsWithClient } = useShipments();

	if (loadingShipmentsWithClient) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div
				className="ag-theme-alpine-auto-dark"
				style={{ height: 500, width: "100%" }}
			>
				<AgGridReact
					rowData={shipmentsWithClient}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					animateRows={true}
				/>
			</div>
		</>
	);
}
