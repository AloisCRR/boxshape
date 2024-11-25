import { pocketBaseService } from "@/data-access/pocketbase";
import type { Client } from "@/domain/entities/client";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useClients = () => {
	const { data: clients, isFetching: loadingClients } = useQuery<Client[]>({
		queryKey: ["clients"],
		queryFn: pocketBaseService.getClients,
	});

	const queryClient = useQueryClient();

	const { mutate: createClient, isPending: creatingClient } = useMutation({
		mutationFn: pocketBaseService.createClient,
		onSuccess: () => {
			notifications.show({
				title: "Client created",
				message: "Client created successfully",
			});
		},
		onError: (error) => {
			notifications.show({
				title: "Client creation failed",
				message: error.message,
			});
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["clients"] });
		},
	});

	return { clients, loadingClients, createClient, creatingClient };
};
