import getCurrentUser from "@/lib/actions/getCurrentUser"
import { cdn } from "@/lib/cloudinary"
import cloudinary from "cloudinary"
import { NextResponse } from "next/server"

enum FolderType {
  adoptable = "adoptable",
  post = "post",
  avatar = "avatar",
}

cdn
const signUploadForm = (type: FolderType) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const eager = "c_auto"
  const folder = FolderType[type]
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
  const type = searchParams.get("type") as FolderType

  if (!type) {
    return NextResponse.json(
      {
        message: "Type is required",
      },
      { status: 400 },
    )
  }

  if (!(type in FolderType)) {
    return NextResponse.json(
      {
        message: "Invalid type",
      },
      { status: 400 },
    )
  }
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    )
  }
  if (currentUser.type === "PetLover" && type === FolderType.adoptable) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    )
  }

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
