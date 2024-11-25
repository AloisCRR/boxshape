import { pocketBaseService } from "@/data-access/pocketbase";
import type { Login } from "@/domain/entities/login";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
	const { mutate } = useMutation({
		mutationFn: (data: Login) =>
			pocketBaseService.login(data.email, data.password),
	});

	return { mutate };
};
