"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import styles from "./FeaturedPets.module.css"

interface PetInfoProps {
  name: string
  breed: string
  age: string
  imageUrl: string
}

const pets: PetInfoProps[] = [
  {
    name: "Buddy",
    breed: "Dog",
    age: "2 years old",
    imageUrl: "/home/buddy.webp",
  },
  {
    name: "Whiskers",
    breed: "Cat",
    age: "1 year old",
    imageUrl: "/home/whiskers.webp",
  },
  {
    name: "Cotton",
    breed: "Rabbit",
    age: "6 months old",
    imageUrl: "/home/cotton.webp",
  },
]

const PetInfo: React.FC<PetInfoProps> = ({ name, breed, age, imageUrl }) => {
  const router = useRouter()
  return (
    <div
      className="flex items-center justify-center p-8 transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:scale-105 hover:z-10"
      onClick={() => router.push("/adopt")}
    >
      <Image
        src={imageUrl}
        alt={`${name} the ${breed}`}
        className="mr-4 rounded-full"
        width={60}
        height={60}
      />
      <div className="flex-1 flex flex-col">
        <h2 className="text-[20px]">{name}</h2>
        <p className="text-mainAccent">{breed}</p>
      </div>
      <p className="mr-10 md:mr-2">{age}</p>
    </div>
  )
}

const FeaturedPets: React.FC = () => {
  return (
    <div className="py-20 px-5">
      <section className={styles["featured-pets"]}>
        <div className={styles["pet-showcase"]}>
          <div className={styles["showcase-image"]}>
            <Image
              src="/home/dog_happy.webp"
              alt="Featured adoptable pets showcase"
              className={styles["showcase-img"]}
              width={507}
              height={388}
            />
          </div>
          <div className={styles["showcase-details"]}>
            <h2 className="pb-5 font-bold text-5xl text-left ml-9">
              Adoptable Pets
            </h2>
            <div className="py-5  ml-[-10px]">
              {pets.map((pet) => (
                // eslint-disable-next-line react/jsx-key
                <PetInfo key={pet.name} {...pet} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturedPets
