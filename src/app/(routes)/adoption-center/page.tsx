import Link from "next/link";
import React from "react";
import HeaderTitle from "../../../components/HeaderTitle";
import { Button, buttonVariants } from "../../../components/ui/Button";
import { cn } from "../../../lib/utils";

function AdoptionCenterPage() {
	return (
		<div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
			<div className="py-[60px]">
				<div className="mx-auto flex flex-col items-center">
					<HeaderTitle description="Browse through the profiles and find your new furry friend!">
						Manage your Pet Adoption listing here
					</HeaderTitle>
					<Link
						className={cn(buttonVariants({ variant: "default" }), "mt-4")}
						href="/adoption-center/post"
					>
						Post a Pet
					</Link>
				</div>
			</div>

			<div className="py-[60px]">
				<div className="mx-auto flex flex-col items-center">
					<HeaderTitle>Your Pet Postings</HeaderTitle>
				</div>
			</div>
		</div>
	);
}

export default AdoptionCenterPage;
