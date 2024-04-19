"use client"

import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import React from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import HeaderTitle from "../HeaderTitle"

const PetHangoutMap = () => {
  const petHangouts = [
    { id: 1, name: "Katong Park", lat: 1.2967, lng: 103.8861 },
    { id: 2, name: "East Coast Park", lat: 1.3008, lng: 103.9122 },
    { id: 3, name: "Woodlands Waterfront Park", lat: 1.4531, lng: 103.7805 },
    { id: 4, name: "Punggol Waterway Park", lat: 1.4111, lng: 103.9045 },
    { id: 5, name: "Bedok Town Park", lat: 1.3354, lng: 103.9256 },
    { id: 6, name: "Tiong Bahru Park", lat: 1.287, lng: 103.8248 },
  ]

  return (
    <div className="space-y-6 flex flex-col items-center justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="space-y-6">
        <HeaderTitle className="max-w-full">
          See them on our mini map!
        </HeaderTitle>

        <MapContainer
          center={[1.2985, 103.8541]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-[312px] w-[1100px]"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {petHangouts.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={
                new Icon({
                  iconUrl: "/dog-lover.svg",
                  iconSize: [40, 40],
                  iconAnchor: [40, 40],
                })
              }
            >
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default PetHangoutMap
