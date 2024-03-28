"use client"

import Image from "next/image"
import * as React from "react"

const pets: PetInfoProps[] = [
  {
    name: "Buddy",
    breed: "Dog",
    age: "2 years old",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0292282df58077bf53368a2fdd74e79d071c9b1cc4c9c2cc4c1558eed0e66c1b?apiKey=69eab9a240d44e54a14cba756aca8c76&",
  },
  {
    name: "Whiskers",
    breed: "Cat",
    age: "1 year old",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/49e2273168bb442da11737bb61fe04a53f53520909c0fb65ce21aa36d84374d8?apiKey=69eab9a240d44e54a14cba756aca8c76&",
  },
  {
    name: "Cotton",
    breed: "Rabbit",
    age: "6 months old",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1b6571216772c4affbe2cdb0d8e27e9cc5a6961fcf85486a8968f1d699055582?apiKey=69eab9a240d44e54a14cba756aca8c76&",
  },
]
interface PetInfoProps {
  name: string
  breed: string
  age: string
  imageUrl: string
}

const PetInfo: React.FC<PetInfoProps> = ({ name, breed, age, imageUrl }) => {
  return (
    <div className="pet-info">
      <Image
        src={imageUrl}
        alt={`${name} the ${breed}`}
        className="pet-image"
      />
      <div className="pet-details">
        <h2 className="pet-name">{name}</h2>
        <p className="pet-breed">{breed}</p>
      </div>
      <p className="pet-age">{age}</p>
      <style jsx>{`
        .pet-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 16px 0;
          margin-top: 44px;
        }

        @media (max-width: 991px) {
          .pet-info {
            flex-wrap: wrap;
            margin-top: 40px;
          }
        }

        .pet-image {
          width: 60px;
          aspect-ratio: 1;
          object-fit: cover;
          object-position: center;
        }

        .pet-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin: auto 0;
        }

        @media (max-width: 991px) {
          .pet-details {
            white-space: initial;
          }
        }

        .pet-name {
          color: var(--BlueText, #242851);
          font:
            20px/140% Inter,
            sans-serif;
        }

        .pet-breed {
          color: var(--subOrange, #ff7751);
          font:
            14px/143% Inter,
            sans-serif;
        }

        .pet-age {
          margin: auto 0;
          color: var(--BlueText, #242851);
          font:
            600 18px/156% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          text-align: right;
        }
      `}</style>
    </div>
  )
}

const FeaturedPets: React.FC = () => {
  return (
    <>
      <section className="featured-pets">
        <div className="pet-showcase">
          <div className="showcase-image">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/af471c2a4699aaa14512ca1ec7d9e2a6fd3a70cd16a6a251ed1de63dd5234320?apiKey=69eab9a240d44e54a14cba756aca8c76&"
              alt="Featured adoptable pets showcase"
              className="showcase-img"
            />
          </div>
          <div className="showcase-details">
            <h2 className="section-title">Featured Adoptable Pets</h2>
            {pets.map((pet) => (
              // eslint-disable-next-line react/jsx-key
              <PetInfo {...pet} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .featured-pets {
          border-radius: 50px;
          background-color: #ffece4;
          padding: 60px 80px 0;
        }

        @media (max-width: 991px) {
          .featured-pets {
            padding: 0 20px;
          }
        }

        .pet-showcase {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 991px) {
          .pet-showcase {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }

        .showcase-image {
          width: 45%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-top: 20px;
          flex-grow: 1;
          padding: 0 17px 80px;
        }

        @media (max-width: 991px) {
          .showcase-image {
            width: 100%;
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .showcase-img {
          width: 100%;
          aspect-ratio: 1.28;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 991px) {
          .showcase-img {
            max-width: 100%;
          }
        }

        .showcase-details {
          width: 55%;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .showcase-details {
            width: 100%;
          }
        }

        .section-title {
          color: #242851;
          letter-spacing: -0.58px;
          font:
            800 48px/100% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          padding-bottom: 20px;
        }

        @media (max-width: 991px) {
          .section-title {
            max-width: 100%;
            font-size: 40px;
            margin-top: 40px;
          }
        }

        .pet-card {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
        }

        @media (max-width: 991px) {
          .pet-card {
            flex-wrap: wrap;
            margin-top: 40px;
          }
        }

        .pet-image {
          width: 60px;
          aspect-ratio: 1;
          object-fit: cover;
          object-position: center;
          align-self: stretch;
        }

        .pet-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-self: stretch;
          margin: auto 0;
          font-weight: 400;
          white-space: nowrap;
        }

        @media (max-width: 991px) {
          .pet-details {
            white-space: initial;
          }
        }

        .pet-name {
          color: #242851;
          font:
            20px/140% Inter,
            sans-serif;
        }

        .pet-type {
          color: #ff7751;
          font:
            14px/143% Inter,
            sans-serif;
        }

        .pet-age {
          color: #242851;
          text-align: right;
          align-self: stretch;
          margin: auto 0;
          font:
            600 18px/156% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        }
      `}</style>
    </>
  )
}

export default FeaturedPets
