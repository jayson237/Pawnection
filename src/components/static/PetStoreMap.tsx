"use client"

import "leaflet/dist/leaflet.css"
import React from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

const PetStoreMap = () => {
  const petStores = [
    { id: 1, name: "Pet Store A", lat: 10.776889, lng: 106.700806 }, // Replace with actual locations
    { id: 2, name: "Pet Store B", lat: 10.778113, lng: 106.698279 }, // Replace with actual locations
    // Add more pet store locations here
  ]

  return (
    <div>
      <h1 className="text-center mb-4">See them on our mini map!</h1>
      <MapContainer
        center={[10.776889, 106.700806]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
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
  )
}

export default PetStoreMap
