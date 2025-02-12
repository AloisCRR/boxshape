import type { Client } from "@/domain/entities/client";
import type { Invoice, InvoiceItem } from "@/domain/entities/invoice";
import type { Shipment } from "@/domain/entities/shipment";
import type { IDataService } from "@/domain/interfaces";
import PocketBase from "pocketbase";

export class PocketBaseService implements IDataService {
	private pb: PocketBase;

	constructor(url: string) {
		this.pb = new PocketBase(url);
	}

	getShipmentsWithClient = async (): Promise<
		(Shipment & { client: Client })[]
	> => {
		const items = await this.pb.collection("shipments").getList<{
			id: string;
			client: string;
			shipment_type: "air" | "sea";
			price: number;
			unit: string;
			po_box_number: string;
			expand: {
				client: {
					id: string;
					name: string;
					email: string;
					phone: string;
					created: string;
					updated: string;
				};
			};
		}>(1, 30, {
			expand: "client",
		});

		return items.items.map((item) => ({
			id: item.id,
			clientId: item.expand.client.id,
			shipmentType: item.shipment_type,
			price: item.price,
			unit: item.unit,
			poBoxNumber: item.po_box_number,
			client: {
				id: item.expand.client.id,
				name: item.expand.client.name,
				email: item.expand.client.email,
				phone: item.expand.client.phone,
			},
		}));
	};

	getInvoice = async (invoiceId: string): Promise<Invoice> => {
		const invoice = await this.pb
			.collection<{
				id: string;
				client: string;
				number: string;
				status: "paid" | "unpaid";
				created: string;
				updated: string;
			}>("invoice")
			.getOne(invoiceId);

		return invoice;
	};

	getClient = async (clientId: string): Promise<Client> => {
		const client = await this.pb
			.collection<{
				id: string;
				name: string;
				email: string;
				phone: string;
				created: string;
				updated: string;
			}>("clients")
			.getOne(clientId);

		return client;
	};

	getClientAndInvoices = async (
		clientId: string,
		invoiceId: string,
	): Promise<{ client: Client; invoice: Invoice }> => {
		const client = await this.pb
			.collection<{
				id: string;
				name: string;
				email: string;
				phone: string;
				created: string;
				updated: string;
			}>("clients")
			.getOne(clientId);
		const invoice = await this.pb
			.collection<Invoice>("invoice")
			.getOne(invoiceId);

		return { client, invoice };
	};

	updateInvoiceItem = async (
		invoiceItemId: string,
		invoiceItem: Partial<InvoiceItem>,
	): Promise<InvoiceItem> => {
		const updatedItem = await this.pb
			.collection<{
				amount: number;
				tracking_code: string;
				description: string;
				invoice: string;
				shipment: string;
			}>("invoice_items")
			.update(invoiceItemId, invoiceItem);

		return {
			id: invoiceItemId,
			invoiceNumber: updatedItem.invoice,
			amount: updatedItem.amount,
			trackingCode: updatedItem.tracking_code,
			shipmentId: updatedItem.shipment,
		};
	};

	updateInvoice = async (
		invoiceId: string,
		invoice: Partial<Invoice>,
	): Promise<Invoice> => {
		const updatedInvoice = await this.pb
			.collection<{
				id: string;
				client: string;
				number: string;
				status: "paid" | "unpaid";
				created: string;
				updated: string;
			}>("invoice")
			.update(invoiceId, invoice);

		return updatedInvoice;
	};

	getInvoicesOfClient = async (clientId: string) => {
		const invoices = await this.pb
			.collection<{
				id: string;
				client: string;
				number: string;
				status: "paid" | "unpaid";
				created: string;
				updated: string;
			}>("invoice")
			.getFullList({
				filter: `client = "${clientId}"`,
			});

		return invoices;
	};

	getInvoiceItemsWithShipment = async (
		invoiceId: string,
	): Promise<(InvoiceItem & { shipment: Shipment })[]> => {
		const items = await this.pb.collection("invoice_items").getList<{
			id: string;
			amount: number;
			tracking_code: string;
			description: string;
			invoice: string;
			expand: {
				shipment: {
					id: string;
					client: string;
					shipment_type: "air" | "sea";
					price: number;
					unit: string;
					po_box_number: string;
				};
			};
		}>(1, 30, {
			expand: "shipment",
			filter: `invoice = "${invoiceId}"`,
		});

		return items.items.map((item) => ({
			id: item.id,
			invoiceNumber: item.invoice,
			amount: item.amount,
			trackingCode: item.tracking_code,
			shipmentType: item.expand.shipment.shipment_type,
			shipment: {
				id: item.expand.shipment.id,
				clientId: item.expand.shipment.client,
				shipmentType: item.expand.shipment.shipment_type,
				price: item.expand.shipment.price,
				unit: item.expand.shipment.unit,
				poBoxNumber: item.expand.shipment.po_box_number,
			},
		}));
	};

	getShipmentsOfClient = async (clientId: string) => {
		const shipments = await this.pb
			.collection<{
				id: string;
				client: string;
				shipment_type: "air" | "sea";
				price: number;
				unit: string;
				po_box_number: string;
				created: string;
				updated: string;
			}>("shipments")
			.getFullList({ filter: `client = "${clientId}"` });

		return shipments.map((shipment) => ({
			id: shipment.id,
			clientId: shipment.client,
			shipmentType: shipment.shipment_type,
			price: shipment.price,
			unit: shipment.unit,
			poBoxNumber: shipment.po_box_number,
		}));
	};

	getInvoices = async () => {
		const invoices = await this.pb
			.collection<{
				id: string;
				client: string;
				number: string;
				status: "paid" | "unpaid";
				created: string;
				updated: string;
			}>("invoice")
			.getFullList();

		return invoices;
	};

	createInvoice = async (invoice: Invoice) => {
		const createdInvoice = await this.pb
			.collection<{
				id: string;
				client: string;
				number: string;
				status: "paid" | "unpaid";
				created: string;
				updated: string;
			}>("invoice")
			.create(invoice);

		return createdInvoice;
	};

	createShipment = async (shipment: Shipment) => {
		const createdShipment = await this.pb
			.collection<{
				id: string;
				client: string;
				shipment_type: "air" | "sea";
				price: number;
				unit: string;
				po_box_number: string;
			}>("shipments")
			.create({
				client: shipment.clientId,
				shipment_type: shipment.shipmentType,
				price: shipment.price,
				unit: shipment.unit,
				po_box_number: shipment.poBoxNumber,
			});

		return {
			id: createdShipment.id,
			clientId: createdShipment.client,
			shipmentType: createdShipment.shipment_type,
			price: createdShipment.price,
			unit: createdShipment.unit,
			poBoxNumber: createdShipment.po_box_number,
		};
	};

	getShipments = async () => {
		const shipments = await this.pb
			.collection<{
				id: string;
				client: string;
				shipment_type: "air" | "sea";
				price: number;
				unit: string;
				po_box_number: string;
			}>("shipments")
			.getFullList();

		return shipments.map((shipment) => ({
			id: shipment.id,
			clientId: shipment.client,
			shipmentType: shipment.shipment_type,
			price: shipment.price,
			unit: shipment.unit,
			poBoxNumber: shipment.po_box_number,
		}));
	};

	createClient = async (client: Client) => {
		const createdClient = await this.pb
			.collection<{
				id: string;
				name: string;
				email: string;
				phone: string;
			}>("clients")
			.create(client);

		return createdClient;
	};

	getClients = async () => {
		const clients = await this.pb
			.collection<{
				id: string;
				name: string;
				email: string;
				phone: string;
			}>("clients")
			.getFullList();

		return clients;
	};

	login = async (email: string, password: string) => {
		await this.pb.collection("_superusers").authWithPassword(email, password);
	};

	isAuthenticated = () => {
		return this.pb.authStore.isValid;
	};

	isAuthenticatedAsync = async () => {
		return this.pb.authStore.isValid;
	};

	logout = () => {
		this.pb.authStore.clear();
	};

	logoutAsync = async () => {
		this.pb.authStore.clear();
	};

	createInvoiceItem = async (
		invoiceItem: InvoiceItem,
	): Promise<InvoiceItem> => {
		const createdItem = await this.pb
			.collection<{
				id: string;
				amount: number;
				tracking_code: string;
				description: string;
				invoice: string;
				shipment: string;
			}>("invoice_items")
			.create({
				amount: invoiceItem.amount,
				tracking_code: invoiceItem.trackingCode,
				description: invoiceItem.description,
				invoice: invoiceItem.invoiceNumber,
				shipment: invoiceItem.shipmentId,
			});

		return {
			id: createdItem.id,
			invoiceNumber: createdItem.invoice,
			amount: createdItem.amount,
			trackingCode: createdItem.tracking_code,
			shipmentId: createdItem.shipment,
		};
	};

	getInvoiceItems = async (invoiceId: string) => {
		const items = await this.pb
			.collection<{
				id: string;
				amount: number;
				tracking_code: string;
				description: string;
				invoice: string;
				shipment: string;
				created: string;
				updated: string;
			}>("invoice_items")
			.getFullList({
				filter: `invoice = "${invoiceId}"`,
			});

		return items.map((item) => ({
			id: item.id,
			invoiceNumber: item.invoice,
			amount: item.amount,
			trackingCode: item.tracking_code,
			shipmentType: item.shipment,
		}));
	};
}
