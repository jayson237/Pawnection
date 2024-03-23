"use client"

import React, { useState } from "react"

type TabType = "posts" | "about" // Define a union type for tab

const PublicProfile = () => {
  const [activeTab, setActiveTab] = useState("posts")

  const profile = {
    name: "John Doe",
    profilePic: "/profile.jpg",
    followers: 1000,
    following: 500,
    about: "blablabla",
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-center w-full h-56 bg-gray-50">
        <img
          src={profile.profilePic}
          alt="Profile Pic"
          className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold text-gray-700">{profile.name}</h2>
        <div className="mt-1 text-sm text-gray-600 flex items-center justify-between">
          <span>{profile.followers} Followers</span>
          <span>{profile.following} Following</span>
        </div>
      </div>
      <div className="border-t">
        <div className="flex">
          <button
            onClick={() => handleTabChange("posts")}
            className={`py-2 px-4 w-1/2 text-center ${activeTab === "posts" ? "bg-gray-200 text-gray-700" : "text-gray-500"}`}
          >
            Posts
          </button>
          <button
            onClick={() => handleTabChange("about")}
            className={`py-2 px-4 w-1/2 text-center ${activeTab === "about" ? "bg-gray-200 text-gray-700" : "text-gray-500"}`}
          >
            About
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        {activeTab === "posts" && (
          <div className="text-gray-700">
            {/* Render user's posts here */}
            <p>User's posts go here</p>
          </div>
        )}
        {activeTab === "about" && (
          <div className="text-gray-700">
            <p>{profile.about}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PublicProfile
