import { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const UserCard = ({ user }: { user: User }) => {
  const router = useRouter()
  return (
    <Link href={`/profile/${user.username}`} target="_blank">
      <div className="flex rounded-xl border bg-white px-8 w-full py-8 items-center transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:bg-white/70">
        <Image
          src={
            !user?.image
              ? "/../icon.png"
              : user?.image.split("image/upload")[0].includes("cloudinary")
                ? `${
                    user?.image?.split("/image/upload/")[0]
                  }/image/upload/c_fill,h_160,w_160/${
                    user?.image?.split("/image/upload/")[1]
                  }`
                : user?.image
          }
          width={160}
          height={160}
          alt={user.username || "User image"}
          className="rounded-full h-10 w-10 mr-3"
        />
        <span className="font-bold">{user.username}</span>
      </div>
    </Link>
  )
}

export default UserCard
