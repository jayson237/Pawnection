"use client"

import Image from "next/image"
import * as React from "react"

import { Button } from "../ui/Button"

interface ButtonProps {
  children: React.ReactNode
  className: string
}

const WelcomeSection: React.FC = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Pawnection!</h1>
            <p className="hero-description">Join our pet-loving community</p>
            <div className="hero-actions">
              <Button className="login-button">Log In</Button>
              <Button className="signup-button">Sign Up</Button>
            </div>
          </div>
          <div className="hero-image-container">
            <Image
              width={604}
              height={400}
              src="/home/shiba_1.svg"
              alt="Pawnection hero image"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-section {
          justify-content: center;
          width: 100%;
          padding: 60px 80px;
        }

        @media (max-width: 991px) {
          .hero-section {
            max-width: 100%;
            padding: 0 20px;
          }
        }

        .hero-container {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .hero-container {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 0;
          color: var(--BlueText, #242851);
          margin: auto 0;
        }

        @media (max-width: 991px) {
          .hero-content {
            width: 100%;
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .hero-title {
          letter-spacing: -0.58px;
          font:
            800 48px/100% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        }

        @media (max-width: 991px) {
          .hero-title {
            max-width: 100%;
            font-size: 40px;
          }
        }

        .hero-description {
          margin-top: 24px;
          font:
            400 20px/140% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        }

        @media (max-width: 991px) {
          .hero-description {
            max-width: 100%;
          }
        }

        .hero-actions {
          align-self: start;
          display: flex;
          margin-top: 24px;
          gap: 12px;
          font-size: 16px;
          color: #fff;
          font-weight: 500;
          line-height: 150%;
        }

        .login-button {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 6px;
          background-color: var(
            --GreenButt,
            linear-gradient(180deg, #c3e48f 0%, #8ec637 65%)
          );
          padding: 12px;
        }

        @media (max-width: 991px) {
          .login-button {
            padding: 0 20px;
          }
        }

        .signup-button {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 6px;
          background-color: var(
            --OrangeButt,
            linear-gradient(180deg, #ffa992 0%, #ff7852 65%)
          );
          padding: 12px;
        }

        @media (max-width: 991px) {
          .signup-button {
            padding: 0 20px;
          }
        }

        .hero-image-container {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .hero-image-container {
            width: 100%;
          }
        }

        .hero-image {
          aspect-ratio: 1.54;
          object-fit: auto;
          object-position: center;
          width: 100%;
          flex-grow: 1;
        }

        @media (max-width: 991px) {
          .hero-image {
            max-width: 100%;
            margin-top: 40px;
          }
        }
      `}</style>
    </>
  )
}

export default WelcomeSection
