import type { Client } from "@/domain/entities/client";
import type { Invoice, InvoiceItem } from "@/domain/entities/invoice";
import type { Shipment } from "@/domain/entities/shipment";

export interface IDataService {
	getClients: () => Promise<Client[]>;
	getClient: (clientId: string) => Promise<Client>;
	createClient: (client: Client) => Promise<Client>;
	getInvoices: () => Promise<Invoice[]>;
	getInvoice: (invoiceId: string) => Promise<Invoice>;
	getInvoicesOfClient: (clientId: string) => Promise<Invoice[]>;
	createInvoice: (invoice: Invoice) => Promise<Invoice>;
	updateInvoice: (
		invoiceId: string,
		invoice: Partial<Invoice>,
	) => Promise<Invoice>;
	getClientAndInvoices: (
		clientId: string,
		invoiceId: string,
	) => Promise<{
		client: Client;
		invoice: Invoice;
	}>;
	getInvoiceItems: (invoiceId: string) => Promise<InvoiceItem[]>;
	updateInvoiceItem: (
		invoiceItemId: string,
		invoiceItem: Partial<InvoiceItem>,
	) => Promise<InvoiceItem>;
	getInvoiceItemsWithShipment: (
		invoiceId: string,
	) => Promise<(InvoiceItem & { shipment: Shipment })[]>;
	createInvoiceItem: (invoiceItem: InvoiceItem) => Promise<InvoiceItem>;
	getShipments: () => Promise<Shipment[]>;
	getShipmentsOfClient: (clientId: string) => Promise<Shipment[]>;
	createShipment: (shipment: Shipment) => Promise<Shipment>;
	login: (email: string, password: string) => Promise<void>;
	isAuthenticatedAsync: () => Promise<boolean>;
	isAuthenticated: () => boolean;
	logoutAsync: () => Promise<void>;
	logout: () => void;
}
