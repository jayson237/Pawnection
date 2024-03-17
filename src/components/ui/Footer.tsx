import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/NavMenu";
import { Button } from "@/components/ui/Button";

function Footer() {
	return (
		<footer
			className="text-black flex items-center justify-center"
			style={{
				paddingTop: "60px",
				paddingBottom: "60px",
				paddingLeft: "324.5px",
				paddingRight: "324.5px",
			}}
		>
			<div className="flex items-center max-w-l mx-auto">
				<p className="max-w-sm break-words">
					© 2023 Pawnection. All rights reserved.
				</p>
				<p className="ml-20 max-w-sm break-words">
					<a href="#" className="text-black">
						Terms and Conditions
					</a>
				</p>
				<p className="ml-20 max-w-sm break-words">
					<a href="#" className="text-black">
						Privacy Policy
					</a>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
