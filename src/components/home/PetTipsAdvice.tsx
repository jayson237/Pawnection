"use client"

import Image from "next/image"
import * as React from "react"

interface ArticleProps {
  imageSrc: string
  title: string
  subtitle: string
  description: string
}

const Article: React.FC<ArticleProps> = ({
  imageSrc,
  title,
  subtitle,
  description,
}) => {
  return (
    <article className="article">
      <div className="content">
        <div className="image-wrapper">
          <Image
            width={100}
            height={100}
            src={imageSrc}
            alt=""
            className="article-image"
          />
        </div>
        <div className="text-content">
          <h2 className="title">{title}</h2>
          <h3 className="subtitle">{subtitle}</h3>
          <p className="description">{description}</p>
        </div>
      </div>

      <style jsx>{`
        .article {
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          box-shadow:
            0px 2px 4px -2px rgba(0, 0, 0, 0.1),
            0px 4px 6px -1px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 40px;
          padding: 16px;
          width: 100%;
        }

        .content {
          display: flex;
          gap: 20px;
        }

        .image-wrapper {
          width: 18%;
        }

        .article-image {
          align-self: stretch;
          aspect-ratio: 1;
          max-width: 100%;
          object-fit: cover;
          object-position: center;
          width: 100px;
        }

        .text-content {
          color: #242851;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          font-size: 14px;
          font-weight: 400;
          line-height: 143%;
          padding-bottom: 6px;
          width: 82%;
        }

        .title {
          font:
            600 24px/133% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          letter-spacing: -0.14px;
          margin: 0;
        }

        .subtitle {
          color: #ff7751;
          font-family: Inter, sans-serif;
          margin: 8px 0 0;
        }

        .description {
          font:
            16px/28px Inter,
            sans-serif;
          margin: 8px 0 0;
        }

        @media (max-width: 991px) {
          .article {
            max-width: 100%;
          }

          .content {
            align-items: stretch;
            flex-direction: column;
            gap: 0px;
          }

          .image-wrapper {
            width: 100%;
          }

          .article-image {
            margin-top: 32px;
          }

          .text-content {
            margin-top: 32px;
            max-width: 100%;
            width: 100%;
          }

          .author {
            flex-wrap: wrap;
            white-space: initial;
          }

          .author-name {
            white-space: initial;
          }
        }
      `}</style>
    </article>
  )
}

const articles: ArticleProps[] = [
  {
    imageSrc: "/home/dog_white.svg",
    title: "How to Train Your Dog",
    subtitle: "Basic obedience training",
    description:
      "Use positive reinforcement, rewarding obedience with treats and praise to encourage good behavior",
  },
  {
    imageSrc: "/home/cat_milk.svg",
    title: "Caring for Your Cat",
    subtitle: "Health and grooming tips",
    description:
      "Regularly brush your cat and schedule annual vet checkups to maintain their health and grooming needs",
  },
]

function PetTipsAdvice() {
  return (
    <>
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-column">
            <div className="hero-image-wrapper">
              <Image
                width={590}
                height={592}
                loading="lazy"
                src="/home/dog_chiba.svg"
                alt="Pet Tips and Advice"
                className="hero-image"
              />
            </div>
          </div>
          <div className="hero-column">
            <div className="hero-text-content">
              <h1 className="hero-title">Pet Tips and Advice</h1>
              <p className="hero-subtitle">
                Discover helpful articles and expert advice
              </p>
              <div className="main-container">
                {articles.map((article, index) => (
                  <Article key={index} {...article} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .main-container {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 590px;
          padding: 20px 0;
        }
        .main-content {
          justify-content: center;
          width: 100%;
          padding: 60px 80px;
        }

        @media (max-width: 991px) {
          .main-content {
            max-width: 100%;
            padding: 0 20px;
          }
        }

        .hero-section {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .hero-section {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }

        .hero-column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 0;
        }

        @media (max-width: 991px) {
          .hero-column {
            width: 100%;
          }
        }

        .hero-image-wrapper {
          align-items: start;
          display: flex;
          padding-top: 80px;
          flex-direction: column;
        }

        @media (max-width: 991px) {
          .hero-image-wrapper {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .hero-image {
          aspect-ratio: 1.23;
          object-fit: contain;
          object-position: center;
          width: 488px;
          margin-top: 9px;
          max-width: 100%;
        }

        .hero-text-content {
          display: flex;
          margin-top: 6px;
          padding-bottom: 20px;
          flex-direction: column;
        }

        @media (max-width: 991px) {
          .hero-text-content {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .hero-title {
          color: #242851;
          letter-spacing: -0.58px;
          font:
            800 48px/100% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          margin: 0;
        }

        @media (max-width: 991px) {
          .hero-title {
            max-width: 100%;
            font-size: 40px;
          }
        }

        .hero-subtitle {
          color: #242851;
          margin-top: 24px;
          font:
            400 20px/140% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        }

        @media (max-width: 991px) {
          .hero-subtitle {
            max-width: 100%;
          }
        }

        .articles-list {
          background-color: #fff;
          display: flex;
          margin-top: 44px;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 991px) {
          .articles-list {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .article-card {
          justify-content: center;
          border-radius: 6px;
          box-shadow:
            0 2px 4px -2px rgba(0, 0, 0, 0.1),
            0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: var(--white, #fff);
          padding: 16px;
          margin-bottom: 40px;
        }

        @media (max-width: 991px) {
          .article-card {
            max-width: 100%;
          }
        }

        .article-card-content {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .article-card-content {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }

        .article-card-image-wrapper {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 18%;
          margin-left: 0;
        }

        @media (max-width: 991px) {
          .article-card-image-wrapper {
            width: 100%;
          }
        }

        .article-card-image {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 100px;
          align-self: stretch;
          max-width: 100%;
        }

        @media (max-width: 991px) {
          .article-card-image {
            margin-top: 32px;
          }
        }

        .article-card-text-content {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 82%;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .article-card-text-content {
            width: 100%;
          }
        }

        .article-card-title {
          letter-spacing: -0.14px;
          font:
            600 24px/133% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          margin: 0;
        }

        @media (max-width: 991px) {
          .article-card-title {
            max-width: 100%;
          }
        }

        .article-card-subtitle {
          color: #ff7751;
          font-family: Inter, sans-serif;
          margin: 8px 0 0;
        }

        @media (max-width: 991px) {
          .article-card-subtitle {
            max-width: 100%;
          }
        }

        .article-card-description {
          margin: 8px 0 0;
          font:
            16px/28px Inter,
            sans-serif;
        }

        @media (max-width: 991px) {
          .article-card-description {
            max-width: 100%;
          }
        }

        .article-card-author {
          display: flex;
          margin-top: 14px;
          gap: 8px;
          font-weight: 500;
          white-space: nowrap;
        }

        @media (max-width: 991px) {
          .article-card-author {
            flex-wrap: wrap;
            white-space: initial;
          }
        }

        .article-card-author-avatar {
          border-radius: 20px;
          background-color: rgba(0, 0, 0, 0.1);
          width: 20px;
          height: 20px;
        }

        .article-card-author-name {
          text-overflow: ellipsis;
          font-family: Inter, sans-serif;
        }

        @media (max-width: 991px) {
          .article-card-author-name {
            white-space: initial;
          }
        }
      `}</style>
    </>
  )
}

export default PetTipsAdvice
