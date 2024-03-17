import Image from "next/image";

import HeaderTitle from "../../../components/shared/header-title";
import { Button } from "../../../components/ui/Button";

enum PetGender {
	male = "Male",
	female = "Female",
}

function FeaturedCard({
	imagePath,
	petName,
	petGender,
	petAge,
}: {
	imagePath: string;
	petName: string;
	petGender: PetGender;
	petAge: string;
}) {
	return (
		<div className="border rounded-lg overflow-hidden">
			<Image
				src={imagePath}
				className="h-full bg-cover bg-center border border-gray-200 object-cover max-h-[240px] w-[240px]"
				width={240}
				height={240}
				alt="featured1"
			/>

			<div className="p-3 space-y-1">
				<h4 className="">{petName}</h4>
				<p className="text-xl">
					{petGender}, {petAge} {parseInt(petAge) > 1 ? "years" : "year"} old
				</p>
			</div>
		</div>
	);
}

function HowtoCard({
	imagePath,
	title,
	description,
}: {
	imagePath: string;
	title: string;
	description: string;
}) {
	return (
		<div className="border rounded-lg bg-white shadow-md p-4 flex flex-row gap-4">
			<Image
				src={imagePath}
				className="h-full bg-cover bg-center border border-gray-200 object-cover max-h-[100px] w-[100px]"
				width={100}
				height={100}
				alt="featured1"
			/>

			<div className="space-y-2">
				<h4 className="text-lg">{title}</h4>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default async function Adopt() {
	return (
		<div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
			<div className="py-[60px]">
				<div className="mx-auto flex flex-col items-center">
					<HeaderTitle description="Browse through the profiles and find your new furry friend!">
						Welcome to the Adopotion Center
					</HeaderTitle>
				</div>
			</div>

			<div className="py-[60px]">
				<div className="grid grid-cols-2 items-center">
					<div>
						<HeaderTitle className="text-left">Featured Pets</HeaderTitle>
						<Button className="mt-4">View All Pets</Button>
					</div>

					<div className="flex flex-rows gap-4">
						<FeaturedCard
							imagePath="/static/images/featured-1.png"
							petName="Buddy"
							petAge="2"
							petGender={PetGender.male}
						/>
						<FeaturedCard
							imagePath="/static/images/featured-2.png"
							petName="Whiskers"
							petAge="1"
							petGender={PetGender.female}
						/>
					</div>
				</div>
			</div>

			<div className="py-[60px]">
				<div className="flex flex-col items-center">
					<HeaderTitle>How to Adopt</HeaderTitle>
					<Button className="mt-4">Learn More</Button>
				</div>

				<div className="gap-10 grid grid-cols-2 py-7 mt-6">
					<HowtoCard
						imagePath="/static/images/featured-1.png"
						title="Find a Pet"
						description="Browse through the profiles and find your new furry friend!"
					/>
					<HowtoCard
						imagePath="/static/images/featured-1.png"
						title="Find a Pet"
						description="Browse through the profiles and find your new furry friend!"
					/>
					<HowtoCard
						imagePath="/static/images/featured-1.png"
						title="Find a Pet"
						description="Browse through the profiles and find your new furry friend!"
					/>
					<HowtoCard
						imagePath="/static/images/featured-1.png"
						title="Find a Pet"
						description="Browse through the profiles and find your new furry friend!"
					/>
				</div>
			</div>
		</div>
	);
}
