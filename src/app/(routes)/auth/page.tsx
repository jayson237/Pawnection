import AuthForm from "@/components/auth/AuthForm"

import HeaderTitle from "../../../components/HeaderTitle"

export default async function Auth() {
  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center">
          <HeaderTitle description="Connect with pet lovers around the world">
            Welcome to Pawnection
          </HeaderTitle>
        </div>
      </div>

      <AuthForm />
    </div>
  )
}
