export interface Shipment {
	id?: string;
	clientId: string;
	shipmentType: "air" | "sea";
	price: number;
	unit: string;
	poBoxNumber?: string;
	created?: string;
	updated?: string;
}
