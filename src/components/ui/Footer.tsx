import Link from "next/link"
import React from "react"

function Footer() {
  return (
    <div className="py-[60px]">
      <div className="container mx-auto flex flex-row gap-[60px] justify-center text-center">
        <p className="text-lg">© 2023 Pawnection. All rights reserved.</p>
        <Link href="/terms-and-contitions" className="text-lg">
          Terms and Conditions
        </Link>
        <Link href="/privacy-policy" className="text-lg">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}

export default Footer
