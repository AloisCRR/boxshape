import { pocketBaseService } from "@/data-access/pocketbase";
import type { Client } from "@/domain/entities/client";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useClients = (clientId?: string) => {
	const { data: clients, isFetching: loadingClients } = useQuery<Client[]>({
		queryKey: ["clients"],
		queryFn: pocketBaseService.getClients,
	});

	const { data: client, isFetching: loadingClient } = useQuery<Client>({
		queryKey: ["client", clientId],
		queryFn: () => pocketBaseService.getClient(clientId ?? ""),
		enabled: !!clientId,
	});

	const queryClient = useQueryClient();

	const { mutate: createClient, isPending: creatingClient } = useMutation({
		mutationFn: pocketBaseService.createClient,
		onSuccess: () => {
			notifications.show({
				title: "Client created",
				message: "Client created successfully",
				color: "green",
			});
		},
		onError: (error) => {
			notifications.show({
				title: "Client creation failed",
				message: error.message,
				color: "red",
			});
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["clients"] });
		},
	});

	return {
		clients,
		loadingClients,
		client,
		loadingClient,
		createClient,
		creatingClient,
	};
};
