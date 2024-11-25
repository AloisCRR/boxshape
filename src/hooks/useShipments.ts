import { pocketBaseService } from "@/data-access/pocketbase";
import type { Shipment } from "@/domain/entities/shipment";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useShipments(clientId?: string) {
	const { data: shipments, isFetching: loadingShipments } = useQuery<
		Shipment[]
	>({
		queryKey: ["shipments"],
		queryFn: pocketBaseService.getShipments,
	});

	const { data: shipmentsOfClient, isFetching: loadingShipmentsOfClient } =
		useQuery<Shipment[]>({
			queryKey: ["shipmentsOfClient", clientId],
			queryFn: () => pocketBaseService.getShipmentsOfClient(clientId ?? ""),
			enabled: !!clientId,
		});

	const queryClient = useQueryClient();

	const { mutate: createShipment, isPending: creatingShipment } = useMutation({
		mutationFn: pocketBaseService.createShipment,
		onSuccess: () => {
			notifications.show({
				title: "Shipment created",
				message: "Shipment created successfully",
				color: "green",
			});
		},
		onError: (error) => {
			notifications.show({
				title: "Shipment creation failed",
				message: error.message,
				color: "red",
			});
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["shipments"] });
		},
	});

	return {
		shipments,
		loadingShipments,
		createShipment,
		creatingShipment,
		shipmentsOfClient,
		loadingShipmentsOfClient,
	};
}
