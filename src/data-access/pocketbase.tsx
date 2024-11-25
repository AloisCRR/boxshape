import { PocketBaseService } from "@/infrastructure/services/PocketBaseService";

export const pocketBaseService = new PocketBaseService(
	import.meta.env.VITE_POCKETBASE_URL,
);
