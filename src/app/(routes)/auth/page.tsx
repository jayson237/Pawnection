import AuthForm from "@/components/auth/AuthForm"

export default async function Auth() {
  return (
    <div className="h-full w-full flex flex-col place-content-center place-items-center bg-gray-100">
      <AuthForm />
    </div>
  )
}
