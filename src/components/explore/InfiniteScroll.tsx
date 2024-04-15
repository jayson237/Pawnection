"use client"

import React from "react"
import { useInView } from "react-intersection-observer"

const InfiniteScroll = ({ loadMore }: { loadMore: () => void }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  React.useEffect(() => {
    if (inView) {
      loadMore()
    }
  }, [inView, loadMore])

  return <div ref={ref} style={{ height: "10px" }} />
}

export default InfiniteScroll
