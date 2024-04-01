"use client"

import Image from "next/image"
import * as React from "react"

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
    <article className="review-card">
      <header className="user-info">
        <Image
          width={32}
          height={32}
          src={userAvatar}
          alt="User Avatar"
          className="avatar"
        />
        <h3 className="username">{userName}</h3>
        <Image
          width={0}
          height={0}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e7420efde1aa3bfbcdc513894b272ff902c8f99d9a4af7a675e84ce641fb899?apiKey=69eab9a240d44e54a14cba756aca8c76&"
          alt="Ratings"
          className=" w-auto h-auto"
        />
      </header>
      <p className="review-text">{reviewText}</p>

      <style jsx>{`
        .review-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 16px;
          background-color: var(--white, #fff);
          border-radius: 6px;
          box-shadow:
            0px 2px 4px -2px rgba(0, 0, 0, 0.1),
            0px 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-size: 16px;
          color: #242851;
          font-weight: 400;
          line-height: 150%;
        }

        @media (max-width: 991px) {
          .review-card {
            margin-top: 40px;
          }
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .username {
          margin: 0;
          font-family: Inter, sans-serif;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .company-logo {
          width: 58px;
          height: auto;
          margin-left: auto;
          object-fit: contain;
        }

        .review-text {
          margin-top: 16px;
          font-family: Inter, sans-serif;
          line-height: 24px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}</style>
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

function TestimonialsSection() {
  return (
    <>
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-column">
            <h2 className="testimonials-title">What Our Users Say</h2>
          </div>
          <div className="testimonials-column">
            <div className="testimonials-wrapper">
              <div className="testimonials-list">
                {testimonials.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .testimonials-section {
          justify-content: center;
          align-self: stretch;
          padding: 60px 80px;
        }

        @media (max-width: 991px) {
          .testimonials-section {
            padding: 0 20px;
          }
        }

        .testimonials-container {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .testimonials-container {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .testimonials-column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 0px;
        }

        @media (max-width: 991px) {
          .testimonials-column {
            width: 100%;
          }
        }

        .testimonials-title {
          align-self: stretch;
          color: #242851;
          letter-spacing: -0.58px;
          margin: auto 0;
          font:
            800 48px/100% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        }

        @media (max-width: 991px) {
          .testimonials-title {
            max-width: 100%;
            margin-top: 40px;
            font-size: 40px;
          }
        }

        .testimonials-wrapper {
          justify-content: center;
          flex-grow: 1;
        }

        @media (max-width: 991px) {
          .testimonials-wrapper {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .testimonials-list {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .testimonials-list {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .testimonial-card {
          justify-content: center;
          border-radius: 6px;
          box-shadow:
            0px 2px 4px -2px rgba(0, 0, 0, 0.1),
            0px 4px 6px -1px rgba(0, 0, 0, 0.1);
          background-color: var(--white, #fff);
          display: flex;
          width: 100%;
          flex-grow: 1;
          flex-direction: column;
          font-size: 16px;
          color: #242851;
          font-weight: 400;
          line-height: 150%;
          margin: 0 auto;
          padding: 16px;
        }

        @media (max-width: 991px) {
          .testimonial-card {
            margin-top: 40px;
            white-space: initial;
          }
        }

        .user-info {
          display: flex;
          gap: 4px;
          font-weight: 500;
        }

        @media (max-width: 991px) {
          .user-info {
            white-space: initial;
          }
        }

        .user-avatar {
          border-radius: 32px;
          background-color: rgba(0, 0, 0, 0.1);
          width: 32px;
          height: 32px;
        }

        .user-name {
          text-overflow: ellipsis;
          font-family: Inter, sans-serif;
          margin: auto 0;
        }

        .user-image {
          aspect-ratio: 5.88;
          object-fit: contain;
          object-position: center;
          width: 58px;
          margin: auto 0;
        }

        .testimonial-text {
          text-overflow: ellipsis;
          font-family: Inter, sans-serif;
          line-height: 24px;
          margin-top: 16px;
        }

        @media (max-width: 991px) {
          .testimonial-text {
            white-space: initial;
          }
        }

        .testimonial-emoji {
          text-align: center;
          text-overflow: ellipsis;
          font-family: Inter, sans-serif;
          margin-top: 16px;
        }
      `}</style>
    </>
  )
}

export default TestimonialsSection
