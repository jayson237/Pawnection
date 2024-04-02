"use client"

import Image from "next/image"

import cardStyles from "./ReviewCard.module.css"
import styles from "./Testimonials.module.css"

interface ReviewCardProps {
  userName: string
  userAvatar: string
  reviewText: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  userAvatar,
  reviewText,
}) => {
  return (
    <article className={cardStyles["review-card"]}>
      <header className={cardStyles["user-info"]}>
        <Image
          width={32}
          height={32}
          src={userAvatar}
          alt="User Avatar"
          className={cardStyles["avatar"]}
        />
        <h3 className={cardStyles["username"]}>{userName}</h3>
        <Image
          width={0}
          height={0}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e7420efde1aa3bfbcdc513894b272ff902c8f99d9a4af7a675e84ce641fb899?apiKey=69eab9a240d44e54a14cba756aca8c76&"
          alt="Ratings"
          className="w-auto h-auto"
        />
      </header>
      <p className={cardStyles["review-text"]}>{reviewText}</p>
    </article>
  )
}

const testimonials = [
  {
    userAvatar: "/icon_2.svg",
    userName: "jinjays",
    reviewText: "Great platform for pet owners!",
  },
  {
    userAvatar: "/icon_2.svg",
    userName: "epanash",
    reviewText: "Pawnection helped me find my lost cat.",
  },
]

function Testimonials() {
  return (
    <section className={styles["testimonials-section"]}>
      <div className={styles["testimonials-container"]}>
        <div className={styles["testimonials-column"]}>
          <h2 className={styles["testimonials-title"]}>What Our Users Say</h2>
        </div>
        <div className={styles["testimonials-column"]}>
          <div className={styles["testimonials-wrapper"]}>
            <div className={styles["testimonials-list"]}>
              {testimonials.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
