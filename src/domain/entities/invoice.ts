export interface Invoice {
	id?: string;
	number?: string;
	client: string; // client ID
	status: "paid" | "unpaid";
	created?: string;
	updated?: string;
}

export interface InvoiceItem {
	id?: string;
	invoiceNumber: string; // invoice ID
	amount: number;
	trackingCode: string;
	description?: string;
	shipmentType: string; // shipment type ID
}
