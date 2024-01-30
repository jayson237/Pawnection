import AuthForm from "@/components/auth/AuthForm"
import Image from "next/image"

export default async function Auth() {
  return (
    <div className="h-full w-full flex flex-col place-content-center place-items-center bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="48"
          width="48"
          className="mx-auto"
          src=""
          alt="Pawnection"
        />
      </div>
      <AuthForm />
    </div>
  )
}
