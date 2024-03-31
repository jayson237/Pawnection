"use client"

import "leaflet/dist/leaflet.css"
import React from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import HeaderTitle from "../HeaderTitle"

const PetStoreMap = () => {
  const petStores = [
    { id: 1, name: "Pet Store A", lat: 1.352083, lng: 103.819836 }, // Example location in Singapore
    { id: 2, name: "Pet Store B", lat: 1.303969, lng: 103.833160 }, // Example location in Singapore
    // You can add more pet store locations here with accurate lat and lng values for Singapore
  ]


  return (
    <div className="space-y-6 flex flex-col items-center justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px] space-y-6">
        <HeaderTitle className="max-w-full">
          See them on our mini map!
        </HeaderTitle>

        <MapContainer
          center={[1.3521, 103.8198]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "312px", width: "1100px" }}
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
  )
}

export default PetStoreMap
