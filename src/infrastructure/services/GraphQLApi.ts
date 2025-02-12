import type { Client } from "@/domain/entities/client";
import type { Invoice, InvoiceItem } from "@/domain/entities/invoice";
import type { Shipment } from "@/domain/entities/shipment";
import type { IDataService } from "@/domain/interfaces";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

export class GraphQLApi implements IDataService {
	getClientAndInvoices(clientId: string, invoiceId: string) {
		return Promise.resolve({} as { client: Client; invoice: Invoice });
	}

	getInvoiceItems(invoiceId: string) {
		return Promise.resolve([]);
	}

	getInvoiceItemsWithShipment(invoiceId: string) {
		return Promise.resolve([]);
	}

	async getClients() {
		const clientsQuery = graphql(`
			query Clients {
				clients {
					name
					email
					phone
					id
					created
					updated
				}
			}
		`);

		const data = await execute(clientsQuery);

		return data.clients;
	}

	async getClient(clientId: string) {
		const clientQuery = graphql(`
			query Client($id: String!) {
				client(id: $id) {
					id
					name
					email
					phone
					address
					created
					updated
				}
			}
		`);

		const data = await execute(clientQuery, { id: clientId });

		return data.client;
	}

	async createClient(client: Client) {
		const createClientQuery = graphql(`
			mutation CreateClient($input: CreateClientInput!) {
				createClient(input: $input) {
					id
					name
					email
					created
					updated
				}
			}
		`);

		const data = await execute(createClientQuery, { input: client });

		return data.createClient;
	}

	async getInvoices() {
		const invoicesQuery = graphql(`
			query Invoices {
				invoices {
					id
					created
					updated
					clientId
					status {
						name
					}
				}
			}
		`);

		const data = await execute(invoicesQuery);

		return data.invoices.map((invoice) => ({
			...invoice,
			client: invoice.clientId,
			status: invoice.status?.name || "No status",
		}));
	}

	async getInvoice(invoiceId: string): Promise<Invoice> {
		const invoiceQuery = graphql(`
			query Invoice($id: String!) {
				invoice(id: $id) {
					id
					created
					updated
					clientId
					status {
						name
					}
				}
			}
		`);

		const data = await execute(invoiceQuery, { id: invoiceId });

		return {
			...data.invoice,
			client: data.invoice.clientId,
			status: data.invoice.status?.name || "No status",
		};
	}

	async getInvoicesOfClient(clientId: string) {
		const invoicesQuery = graphql(`
			query InvoicesOfClient($clientId: String!) {
				invoicesByClient(clientId: $clientId) {
					id
					clientId
					status {
						name
					}
				}
			}
		`);

		const data = await execute(invoicesQuery, { clientId });

		return data.invoicesByClient.map((invoice) => ({
			...invoice,
			client: invoice.clientId,
			status: invoice.status?.name || "No status",
		}));
	}

	async createInvoice(invoice: Invoice) {
		const createInvoiceQuery = graphql(`
			mutation CreateInvoice($input: CreateInvoiceInput!) {
				createInvoice(input: $input) {
					id
					created
					updated
					clientId
					status {
						name
					}
				}
			}
		`);

		const data = await execute(createInvoiceQuery, {
			input: {
				clientId: invoice.client,
				statusId: invoice.status,
			},
		});

		return {
			...data.createInvoice,
			client: data.createInvoice.clientId,
			status: data.createInvoice.status?.name || "No status",
		};
	}

	async updateInvoice(invoiceId: string, invoice: Partial<Invoice>) {
		const updateInvoiceQuery = graphql(`
			mutation UpdateInvoice($id: String!, $input: UpdateInvoiceInput!) {
				updateInvoice(id: $id, input: $input) {
					id
					updated
					clientId
					status {
						name
					}
				}
			}
		`);

		const data = await execute(updateInvoiceQuery, {
			id: invoiceId,
			input: invoice,
		});

		return {
			...data.updateInvoice,
			client: data.updateInvoice.clientId,
			status: data.updateInvoice.status?.name || "No status",
		};
	}

	async createInvoiceItem(invoiceItem: InvoiceItem) {
		const createInvoiceItemQuery = graphql(`
			mutation CreateInvoiceItem($input: CreateInvoiceItemInput!) {
				createInvoiceItem(input: $input) {
					id
					invoiceNumber
					shipmentId
					trackingCode
					description
					amount
				}
			}
		`);

		const data = await execute(createInvoiceItemQuery, {
			input: {
				invoiceNumber: invoiceItem.invoiceNumber,
				shipmentId: invoiceItem.shipmentId,
				trackingCode: invoiceItem.trackingCode,
				description: invoiceItem.description,
				amount: invoiceItem.amount,
			},
		});

		return data.createInvoiceItem;
	}

	async updateInvoiceItem(
		invoiceItemId: string,
		invoiceItem: Partial<InvoiceItem>,
	) {
		const updateInvoiceItemQuery = graphql(`
			mutation UpdateInvoiceItem($id: ID!, $input: UpdateInvoiceItemInput!) {
				updateInvoiceItem(id: $id, input: $input) {
					id
					invoiceNumber
					amount
					trackingCode
					shipmentId
				}
			}
		`);

		const data = await execute(updateInvoiceItemQuery, {
			id: invoiceItemId,
			input: invoiceItem,
		});

		return data.updateInvoiceItem;
	}

	getShipments() {
		return Promise.resolve([]);
	}

	getShipmentsWithClient(shipmentId: string) {
		return Promise.resolve([]);
	}

	getShipmentsOfClient(clientId: string) {
		return Promise.resolve([]);
	}

	createShipment(shipment: Shipment) {
		return Promise.resolve(shipment);
	}

	login(email: string, password: string) {
		return Promise.resolve();
	}

	isAuthenticatedAsync() {
		return Promise.resolve(false);
	}

	isAuthenticated() {
		return false;
	}

	logoutAsync() {
		return Promise.resolve();
	}

	logout() {
		return Promise.resolve();
	}
}
