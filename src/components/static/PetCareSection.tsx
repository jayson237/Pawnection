
import Image from "next/image"
import React from "react"

const PetCareTips = () => {
  const tips = [
    {
      id: "bonding",
      title: "Bonding",
      description:
        "You can build a good relationship with your pets by rewarding them and walking them regularly!",
      icon: "/bonding.svg", // Replace with your icon path
    },
    {
      id: "dog-training",
      title: "Dog Training",
      description:
        "Can be counter-effective if done wrongly. Don't hit your pets if you can't catch them on spot!",
      icon: "/dog_training.svg", // Replace with your icon path
    },
    {
      id: "pet-health",
      title: "Pet Health",
      description:
        "Remember to get your pets vax-ed cyclically. 70% of pet mortality is because of illness!",
      icon: "pet_health.svg", // Replace with your icon path
    },
  ]

  // @ts-ignore
  // @ts-ignore
  return (
    <div
      className="bg-pink-100 rounded-lg"
      style={{ width: "1340px", padding: "60px 100px" }}
    >
      <h2 className="text-center text-3xl font-semibold mb-4">Pet care tips</h2>
      <div className="flex justify-around">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white p-4 rounded-xl shadow-lg"
            style={{ maxWidth: "200px" }}
          >
            <div className="flex flex-col items-center">
              <Image
                src={tip.icon}
                alt={`${tip.title} icon`}
                width={60}
                height={60}
                className="mb-4"
                style={{ width: "60px", height: "60px" }}
              />
              <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
              <p className="text-sm text-center">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PetCareTips
