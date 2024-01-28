import { Loader2 } from "lucide-react"

export const Spinner = () => {
  return (
    <div className="flex flex-col align-middle h-full">
      <Loader2 className="m-auto animate-spin" />
    </div>
  )
}
