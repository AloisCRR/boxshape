export interface Client {
	id: string;
	name: string;
	email: string;
	phone?: string | null;
	address?: string | null;
	created: Date;
	updated: Date;
}
