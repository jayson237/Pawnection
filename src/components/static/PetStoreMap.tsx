"use client"

import "leaflet/dist/leaflet.css"
import React, { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import HeaderTitle from "../HeaderTitle"

const PetStoreMap = () => {
  const petStores = [
    { id: 1, name: "Pet Store A", lat: 10.776889, lng: 106.700806 }, // Replace with actual locations
    { id: 2, name: "Pet Store B", lat: 10.778113, lng: 106.698279 }, // Replace with actual locations
    // Add more pet store locations here
  ]

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  console.log(windowDimensions)

  const mapWidth = windowDimensions.width > 768 ? "1100px" : "75%"
  console.log(mapWidth)

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="space-y-6 flex flex-col items-center justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px] space-y-6">
        <HeaderTitle className="max-w-full">
          See them on our mini map!
        </HeaderTitle>

        <div className="flex justify-center w-full">
          <MapContainer
            center={[10.776889, 106.700806]}
            zoom={13}
            scrollWheelZoom={false}
            // style={{ height: "312px", width: "1100px" }}
            style={{ height: windowDimensions.height * 0.5, width: mapWidth }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {petStores.map((store) => (
              <Marker key={store.id} position={[store.lat, store.lng]}>
                <Popup>{store.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default PetStoreMap
