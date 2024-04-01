"use client"

import Image from "next/image"
import * as React from "react"

import { Button } from "../ui/Button"

interface InputProps {
  label: string
  placeholder: string
}

const Input: React.FC<InputProps> = ({ label, placeholder }) => (
  <>
    <label className="input-label">{label}</label>
    <input
      type="text"
      className="input-field"
      placeholder={placeholder}
      aria-label={placeholder}
    />
    <style jsx>{`
      .input-label {
        color: #000;
        font-family: Inter, sans-serif;
        margin-top: 24px;
      }
      .input-field {
        font-family: Inter, sans-serif;
        border-radius: 6px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #fff;
        margin-top: 4px;
        color: rgba(0, 0, 0, 0.5);
        font-weight: 400;
        padding: 8px 12px;
      }
      @media (max-width: 991px) {
        .input-field {
          max-width: 100%;
        }
      }
    `}</style>
  </>
)

const LostAndFoundForm: React.FC = () => {
  const inputFields = [
    { label: "Full Name", placeholder: "Enter your full name" },
    { label: "Pet Name", placeholder: "Enter your pet's name" },
    { label: "Description", placeholder: "Enter description" },
  ]

  return (
    <>
      <main className="main-container">
        <div className="content-wrapper">
          <div className="image-column">
            <Image
              loading="lazy"
              width={590}
              height={520}
              src="/home/dog_luggage.svg"
              alt="Lost and found pet"
              className="pet-image"
            />
          </div>
          <div className="form-column">
            <h1 className="form-title">Lost &amp; Found Pet Form</h1>
          </div>
        </div>
      </main>
      <style jsx>{`
        .main-container {
          justify-content: center;
          align-self: stretch;
          padding: 60px 80px;
        }
        @media (max-width: 991px) {
          .main-container {
            padding: 0 20px;
          }
        }
        .content-wrapper {
          display: flex;
          gap: 20px;
        }
        @media (max-width: 991px) {
          .content-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }
        .image-column {
          width: 50%;
        }
        @media (max-width: 991px) {
          .image-column {
            width: 100%;
          }
        }
        .pet-image {
          aspect-ratio: 1.14;
          object-fit: cover;
          width: 100%;
          align-self: stretch;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .pet-image {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .form-column {
          width: 50%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .form-column {
            width: 100%;
          }
        }
        .form-container {
          display: flex;
          flex-direction: column;
          font-size: 16px;
          font-weight: 500;
          line-height: 150%;
        }
        @media (max-width: 991px) {
          .form-container {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .form-title {
          color: #242851;
          letter-spacing: -0.58px;
          font:
            800 48px/100% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .form-title {
            max-width: 100%;
            font-size: 40px;
          }
        }
        .upload-container {
          margin-top: 24px;
        }
        .upload-label {
          color: #000;
          font-family: Inter, sans-serif;
        }
        .upload-field {
          border-radius: 6px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: #fff;
          margin-top: 4px;
          height: 36px;
        }
        .button-group {
          align-self: start;
          display: flex;
          margin-top: 24px;
          gap: 12px;
        }
        .cancel-button {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid #242851;
          color: #242851;
          padding: 12px;
          background: none;
          cursor: pointer;
        }
        .submit-button {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 8px;
          background-color: #242851;
          color: #fff;
          padding: 12px;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .cancel-button,
          .submit-button {
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  )
}

export default LostAndFoundForm
