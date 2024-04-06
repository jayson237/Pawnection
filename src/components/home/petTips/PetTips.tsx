"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import articleStyles from "./Article.module.css"
import tipStyles from "./PetTips.module.css"

interface ArticleProps {
  imageSrc: string
  title: string
  subtitle: string
  description: string
}

const articles: ArticleProps[] = [
  {
    imageSrc: "/home/dog_white.webp",
    title: "How to Train Your Dog",
    subtitle: "Basic obedience training",
    description:
      "Use positive reinforcement, rewarding obedience with treats and praise to encourage good behavior",
  },
  {
    imageSrc: "/home/cat_milk.webp",
    title: "Caring for Your Cat",
    subtitle: "Health and grooming tips",
    description:
      "Regularly brush your cat and schedule annual vet checkups to maintain their health and grooming needs",
  },
]

const Article: React.FC<ArticleProps> = ({
  imageSrc,
  title,
  subtitle,
  description,
}) => {
  const router = useRouter()
  return (
    <div className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-105 hover:z-10">
      <article
        className={articleStyles["article"]}
        onClick={() => router.push("/recommendations")}
      >
        <div className={articleStyles["content"]}>
          <div className={articleStyles["image-wrapper"]}>
            <Image
              width={100}
              height={100}
              src={imageSrc}
              alt=""
              className={articleStyles["article-image"]}
            />
          </div>
          <div className={articleStyles["text-content"]}>
            <h2 className={articleStyles["title"]}>{title}</h2>
            <h3 className={articleStyles["subtitle"]}>{subtitle}</h3>
            <p className={articleStyles["description"]}>{description}</p>
          </div>
        </div>
      </article>
    </div>
  )
}

function PetTips() {
  return (
    <main className={tipStyles["main-content"]}>
      <div className={tipStyles["hero-section"]}>
        <div className={tipStyles["hero-column"]}>
          <div>
            <Image
              width={590}
              height={592}
              loading="lazy"
              src="/static/images/dog_front.webp"
              alt="Pet Tips and Advice"
              className="w-3/4"
            />
          </div>
        </div>
        <div className={tipStyles["hero-column"]}>
          <div className={tipStyles["hero-text-content"]}>
            <h1 className={tipStyles["hero-title"]}>Pet Tips and Advice</h1>
            <p className={tipStyles["hero-subtitle"]}>
              Discover helpful articles and expert advice
            </p>
            <div className={tipStyles["main-container"]}>
              {articles.map((article, index) => (
                <Article key={index} {...article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PetTips
