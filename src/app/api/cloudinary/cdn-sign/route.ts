import getCurrentUser from "@/actions/getCurrentUser"
import { cdn } from "@/lib/cloudinary"
import cloudinary from "cloudinary"
import { NextResponse } from "next/server"

cdn
const signUploadForm = (type: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const eager = "e_blur:400,h_150,w_150|c_fill,h_150,w_150"
  const folder =
    type === "post"
      ? process.env.CLOUDINARY_POST_FOLDER
      : process.env.CLOUDINARY_AVATAR_FOLDER

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp,
      eager,
      folder,
    },
    process.env.CDN_API_SECRET as string,
  )

  return { timestamp, signature, eager, folder }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")
  if (!type)
    return NextResponse.json(
      {
        message: "Type is required",
      },
      { status: 400 },
    )
  const currentUser = await getCurrentUser()
  if (!currentUser)
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    )

  const cloudName = cloudinary.v2.config().cloud_name
  const apiKey = cloudinary.v2.config().api_key

  const sig = signUploadForm(type)
  return NextResponse.json(
    {
      folder: sig.folder,
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: cloudName,
      apikey: apiKey,
      eager: sig.eager,
      sig,
    },
    { status: 200 },
  )
}
