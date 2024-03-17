import prisma from "@/lib/prismadb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, username, password, password2 } = body;

		if (!email || !username || !password || !password2) {
			return NextResponse.json(
				{
					msg: "Missing info",
				},
				{ status: 400 },
			);
		}
		if (password !== password2) {
			return NextResponse.json(
				{
					msg: "Password didn't match",
				},
				{
					status: 400,
				},
			);
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email,
				username,
				hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error: unknown) {
		console.log("Registration error", error);

		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === "P2002" && error.meta?.target === "User_email_key") {
				return NextResponse.json(
					{
						msg: "Email has been registered",
					},
					{ status: 400 },
				);
			}
		}

		return NextResponse.json(
			{
				msg: "Internal Error",
			},
			{ status: 500 },
		);
	}
}
