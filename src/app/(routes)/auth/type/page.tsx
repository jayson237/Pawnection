import getCurrentUser from "@/actions/getCurrentUser";
import TypeForm from "@/components/auth/TypeForm";
import { redirect } from "next/navigation";

export default async function AuthType() {
	const currentUser = await getCurrentUser();
	if (!currentUser) redirect("/auth");
	if (currentUser.type) redirect("/");

	return (
		<div className="h-full w-full flex flex-col place-content-center place-items-center">
			<TypeForm />
		</div>
	);
}
