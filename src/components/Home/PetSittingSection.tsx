"use client"
import * as React from "react"

type PetCardProps = { emoji: string; name: string; description: string; };
const PetCard: React.FC<PetCardProps> = ({ emoji, name, description }) => (<div className="pet-card">
  <div className="pet-emoji">{emoji}</div>
  <div className="pet-details">
    <div className="pet-name">{name}</div>
    <div className="pet-description">{description}</div>
  </div>
</div>)
const pets = [{ emoji: "🐶", name: "Golden Retriever", description: "In need of weekend sitter" }, {
  emoji: "🐱",
  name: "British Shorthair",
  description: "Looking for a loving sitter"
}, { emoji: "🦜", name: "Parrot", description: "Seeking caring sitter" }]

function PetSittingSection() {
  return (<>
    <section className="pet-sitting-section">
      <div className="container">
        <div className="content">
          <div className="text-content"><h2 className="title">Pet Sitting</h2> <p className="description"> Browse
            through the list of pets looking for a sitter </p>
            <div className="view-more">View more &gt;&gt;</div>
            <div className="pet-list"> {pets.map((pet, index) => (
              <PetCard key={index} emoji={pet.emoji} name={pet.name} description={pet.description} />))} </div>
          </div>
          <div className="image-content"><img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f907908505e27a650c5af37681c071f8b8ea6a8dea4482207f96835cc664bb4?apiKey=69eab9a240d44e54a14cba756aca8c76&"
            alt="Pet sitting illustration" className="illustration" /></div>
        </div>
      </div>
    </section>
    <style jsx>{` .pet-sitting-section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 60px;
    }

    @media (max-width: 991px) {
        .pet-sitting-section {
            padding: 0 20px;
        }
    }

    .container {
        width: 100%;
        max-width: 1100px;
    }

    .content {
        display: flex;
        gap: 20px;
    }

    @media (max-width: 991px) {
        .content {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
        }
    }

    .text-content {
        display: flex;
        flex-direction: column;
        line-height: normal;
        width: 50%;
        margin-left: 0px;
    }

    @media (max-width: 991px) {
        .text-content {
            width: 100%;
        }
    }

    .title {
        color:  #242851;
        letter-spacing: -0.58px;
        font: 800 48px/100% Inter, -apple-system, Roboto, Helvetica, sans-serif;
    }

    @media (max-width: 991px) {
        .title {
            font-size: 40px;
        }
    }

    .description {
        color: #242851;
        margin-top: 24px;
        font: 20px/140% Inter, sans-serif;
    }

    .view-more {
        color: #808080;
        text-align: right;
        margin-top: 24px;
        font: 16px/28px Inter, sans-serif;
    }

    .pet-list {
        display: flex;
        flex-direction: column;
        margin-top: 44px;
        gap: 16px;
    }

    @media (max-width: 991px) {
        .pet-list {
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

    .pet-emoji {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        background-color: rgba(0, 0, 0, 0.05);
        color: #000;
        text-align: center;
        width: 60px;
        height: 60px;
        padding: 0 11px;
        font: 38px/160% Roboto, sans-serif;
    }

    .pet-details {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: auto 0;
    }

    .pet-name {
        color:  #242851;
        font: 20px/140% Inter, sans-serif;
    }

    .pet-description {
        color:  #ff7751;
        font: 14px/143% Inter, sans-serif;
    }

    .image-content {
        display: flex;
        flex-direction: column;
        line-height: normal;
        width: 50%;
        margin-left: 20px;
    }

    @media (max-width: 991px) {
        .image-content {
            width: 100%;
        }
    }

    .illustration {
        aspect-ratio: 1.32;
        object-fit: contain;
        object-position: center;
        width: 100%;
        align-self: stretch;
        margin: auto 0;
    }

    @media (max-width: 991px) {
        .illustration {
            margin-top: 40px;
        }
    } `}</style>
  </>)
}

export default PetSittingSection