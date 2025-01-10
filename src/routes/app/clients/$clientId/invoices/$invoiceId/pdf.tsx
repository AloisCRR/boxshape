import type { Client } from "@/domain/entities/client";
import type { Invoice, InvoiceItem } from "@/domain/entities/invoice";
import type { Shipment } from "@/domain/entities/shipment";
import { useClients } from "@/hooks/useClients";
import { useInvoiceItems } from "@/hooks/useInvoiceItems";
import { useInvoices } from "@/hooks/useInvoices";
import { Button } from "@mantine/core";
import {
	Document,
	PDFViewer,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/app/clients/$clientId/invoices/$invoiceId/pdf",
)({
	component: RouteComponent,
});

const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontSize: 11,
	},
	header: {
		marginBottom: 30,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		fontWeight: "bold",
	},
	clientInfo: {
		marginBottom: 30,
		marginTop: 20,
	},
	invoiceItems: {
		marginTop: 10,
	},
	item: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#000",
		borderBottomStyle: "solid",
		padding: 8,
		minHeight: 35,
		alignItems: "center",
	},
	itemHeader: {
		backgroundColor: "#f5f5f5",
		fontWeight: "bold",
	},
	col: {
		flex: 1,
		paddingHorizontal: 5,
	},
	total: {
		flexDirection: "row",
		padding: 8,
		// borderTopWidth: 2,
		// borderTopColor: "#000",
		// borderTopStyle: "solid",
	},
	label: {
		fontWeight: "bold",
		marginBottom: 5,
	},
});

function InvoicePDF({
	client,
	invoice,
	itemsWithShipment,
}: {
	client: Client;
	invoice: Invoice;
	itemsWithShipment: (InvoiceItem & { shipment: Shipment })[];
}) {
	if (!client || !invoice || !itemsWithShipment) {
		return null;
	}

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text>Boxshape</Text>
					<Text style={styles.title}>Invoice #{invoice.number}</Text>
					<Text>
						Date: {new Date(invoice.created ?? "").toLocaleDateString()}
					</Text>
					<Text>Status: {invoice.status}</Text>
				</View>

				<View style={styles.clientInfo}>
					<Text style={styles.label}>Client Information:</Text>
					<Text>{client.name}</Text>
					<Text>{client.email}</Text>
					<Text>{client.phone}</Text>
				</View>

				<View style={styles.total}>
					<Text style={[styles.col, { flex: 3 }]} />
					<Text style={[styles.col, styles.label, { textAlign: "right" }]}>
						Total:
					</Text>
					<Text style={styles.col}>
						$
						{itemsWithShipment
							.reduce((sum, item) => sum + item.amount * item.shipment.price, 0)
							.toFixed(2)}
					</Text>
				</View>

				<View style={styles.invoiceItems}>
					<View style={[styles.item, styles.itemHeader]}>
						<Text style={styles.col}>Tracking Code</Text>
						<Text style={styles.col}>PO BOX</Text>
						<Text style={styles.col}>Rate</Text>
						<Text style={styles.col}>Amount</Text>
						<Text style={styles.col}>Total</Text>
					</View>

					{itemsWithShipment.map((item) => (
						<View key={item.id} style={styles.item}>
							<Text style={styles.col}>{item.trackingCode}</Text>
							<Text style={styles.col}>
								{item.shipment.poBoxNumber} / {item.shipmentType.toUpperCase()}
							</Text>
							<Text style={styles.col}>
								$ {item.shipment.price} {item.shipment.unit}
							</Text>
							<Text style={styles.col}>{item.amount.toFixed(2)}</Text>
							<Text style={styles.col}>
								$ {item.amount * item.shipment.price}
							</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	);
}

function RouteComponent() {
	const { clientId, invoiceId } = Route.useParams();
	const { client, loadingClient } = useClients(clientId);
	const { invoice, loadingInvoice } = useInvoices(clientId, invoiceId);
	const { itemsWithShipment, loadingItemsWithShipment } =
		useInvoiceItems(invoiceId);

	if (loadingClient || loadingInvoice || loadingItemsWithShipment) {
		return <div>Loading...</div>;
	}

	if (!client || !invoice || !itemsWithShipment) {
		return <div>No data available</div>;
	}

	if (!client || !invoice) {
		return <div>Invoice or client not found</div>;
	}

	return (
		<>
			<Link
				to="/app/clients/$clientId/invoices/$invoiceId"
				params={{ clientId, invoiceId }}
			>
				<Button leftSection={<IconArrowLeft />} mb="md">
					Back
				</Button>
			</Link>
			<PDFViewer style={{ width: "100%", height: "calc(100vh - 170px)" }}>
				<InvoicePDF
					client={client}
					invoice={invoice}
					itemsWithShipment={itemsWithShipment}
				/>
			</PDFViewer>
		</>
	);
}
