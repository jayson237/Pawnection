import React from "react"

const TimeStamp = ({ datetimeISO }: { datetimeISO: string }) => {
  const calculateTimeDiff = (datetimeISO: string) => {
    const eventDate = new Date(datetimeISO)
    const now = new Date()

    const diffInSeconds = Math.floor(
      (now.getTime() - eventDate.getTime()) / 1000,
    )

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInWeeks = Math.floor(diffInDays / 7)
    const diffInMonths = Math.floor(diffInDays / 30.44)
    const diffInYears = Math.floor(diffInDays / 365.25)

    if (diffInYears > 0)
      return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`
    if (diffInMonths > 0)
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`
    if (diffInWeeks > 0)
      return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`
    if (diffInDays > 0)
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
    if (diffInHours > 0)
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
    if (diffInMinutes > 0)
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`

    return "Just now"
  }

  return (
    <div>
      <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
        {calculateTimeDiff(datetimeISO)}
      </p>
    </div>
  )
}

export default TimeStamp
