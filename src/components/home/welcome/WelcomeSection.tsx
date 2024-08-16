"use client"

import { Button } from "@/components/ui/Button"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import styles from "./WelcomeSection.module.css"

const WelcomeSection: React.FC = () => {
  return (
    <section className="flex justify-center w-full p-15 px-20 sm:p-6 sm:px-12">
      <div className={styles["hero-container"]}>
        <div className={styles["hero-content"]}>
          <h1 className={styles["hero-title"]}>Welcome to Pawnection!</h1>
          <p className={styles["hero-description"]}>
            Join our pet-loving community
          </p>
          <div className={styles["hero-actions"]}>
            <Button>
              <Link href="/explore">
                <div className="space-x-2 items-center flex flex-row">
                  <p>Get Started</p>
                  <MoveRight className="w-4" />
                </div>
              </Link>
            </Button>
          </div>
        </div>
        <div className={styles["hero-image-container"]}>
          <Image
            priority
            width={604}
            height={400}
            src="/static/images/dog_left.webp"
            alt="Pawnection hero image"
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
