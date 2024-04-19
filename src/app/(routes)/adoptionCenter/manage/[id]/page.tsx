import AdoptionCenterManager from "@/components/adoptionCenter/AdoptionCenterManager"
import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { UserType } from "@prisma/client"
import { notFound } from "next/navigation"
import { redirect } from "next/navigation"

export default async function AdoptionCenterManagePage({
  params,
}: {
  params: { id: string }
}) {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/auth")
  if (currentUser.type !== UserType.PetAdoptionCentre) redirect("/adopt")

  const getAllOwnAdoptablePet = await prisma.adoptablePet.findFirst({
    where: {
      id: params.id,
    },
    include: {
      adoptionRequests: true,
    },
  })

  if (getAllOwnAdoptablePet) {
    return (
      <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
        <div className="py-[60px]">
          <AdoptionCenterManager data={getAllOwnAdoptablePet} />
        </div>
      </div>
    )
  }
}
