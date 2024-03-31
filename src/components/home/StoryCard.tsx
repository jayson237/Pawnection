"use client"

import Image from "next/image"
import * as React from "react"
import { useState } from "react"

interface UserInfoProps {
  avatarUrl: string
  username: string
  timestamp: string
}

function UserInfo({ avatarUrl, username, timestamp }: UserInfoProps) {
  return (
    <div className="flex gap-2 max-md:flex-wrap">
      <Image
        width={0}
        height={0}
        src={avatarUrl}
        alt={username}
        className="shrink-0 my-auto w-8 h-8 bg-black bg-opacity-10 rounded-[32px]"
      />
      <div className="flex flex-col flex-1 max-md:max-w-full">
        <div className="text-sm font-medium leading-5 text-black text-ellipsis max-md:max-w-full">
          {username}
        </div>
        <div className="text-xs leading-4 text-black text-opacity-50 text-ellipsis max-md:max-w-full">
          {timestamp}
        </div>
      </div>
    </div>
  )
}

interface PostImageProps {
  src: string
  alt: string
}

function PostImage({ src, alt }: PostImageProps) {
  return (
    <Image
      loading="lazy"
      src={src}
      alt={alt}
      width={0}
      height={0}
      className="w-full aspect-[2] max-md:max-w-full"
    />
  )
}

interface PostTagProps {
  tag: string
}

function PostTag({ tag }: PostTagProps) {
  return (
    <div className="justify-center self-start px-1 py-0.5 mt-2 text-xs leading-4 text-black whitespace-nowrap rounded-sm border border-solid bg-zinc-300 bg-opacity-50 border-black border-opacity-10">
      {tag}
    </div>
  )
}

interface PostProps {
  user: UserInfoProps
  imageSrc: string
  imageAlt: string
  text: string
  tag: string
}

function Post({ user, imageSrc, imageAlt, text, tag }: PostProps) {
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <article className="story-card flex flex-col bg-white rounded-md border border-solid shadow-md border-black border-opacity-10 max-w-[600px] mb-10">
      <header className="flex gap-2 p-3 whitespace-nowrap max-md:flex-wrap">
        <div className="flex flex-1 gap-2 max-md:flex-wrap">
          <UserInfo
            avatarUrl={user.avatarUrl}
            username={user.username}
            timestamp={user.timestamp}
          />
        </div>
        <div className="my-auto text-base leading-6 text-center text-black text-ellipsis">
          •••
        </div>
      </header>
      <PostImage src={imageSrc} alt={imageAlt} />
      <div className="flex flex-col p-3 w-full text-base leading-6 max-md:max-w-full">
        <p className="text-black max-md:max-w-full">{text}</p>
        <PostTag tag={tag} />
        <div className="post-actions mt-3">
          <button onClick={toggleLike}>{isLiked ? "❤️" : "🤍"} </button>
        </div>
      </div>
    </article>
  )
}

const postDatas = [
  {
    user: {
      avatarUrl:
        "/home/avatar.svg",
      username: "User1",
      timestamp: "1 hour ago",
    },
    imageSrc:
      "/home/dog_glass.svg",
    imageAlt: "My dog enjoying the beach!",
    text: "My dog enjoying the beach!",
    tag: "Vacation",
  },
  {
    user: {
      avatarUrl:
        "/home/avatar.svg",
      username: "User2",
      timestamp: "2 days ago",
    },
    imageSrc:
      "/home/cat_shark.svg",
    imageAlt: "Adopted cat",
    text: "Adopted this adorable cat today!",
    tag: "Adoption",
  },
]

const LatestPetStories: React.FC = () => {
  return (
    <section className="latest-stories">
      <h2 className="section-title">Latest Pet Stories</h2>
      <p className="section-description">
        Share your pets`&apos;` adventure with the community
      </p>
      <div className="stories-container">
        {postDatas.map((post) => (
          // eslint-disable-next-line react/jsx-key
          <Post {...post} />
        ))}
      </div>
      <style jsx>{`
        .latest-stories {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 60px 80px;
        }
        .like-button {
          padding: 0;
          margin-top: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #000;
          font-size: 1.5rem;
          transition: color 0.2s ease-in-out;
        }

        .liked {
          color: #e0245e; /* Twitter-like heart color, change as needed */
        }

        @media (max-width: 991px) {
          .latest-stories {
            padding: 0 20px;
          }
        }

        .section-title {
          color: #242851;
          font:
            800 48px/100% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          text-align: center;
          letter-spacing: -0.58px;
        }

        @media (max-width: 991px) {
          .section-title {
            font-size: 40px;
          }
        }

        .section-description {
          color: #242851;
          font:
            400 20px/140% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          text-align: center;
          margin-top: 24px;
        }

        .stories-container {
          display: flex;
          justify-content: center;
          //align-items: center;
          flex-wrap: wrap;
          width: 100%;
          max-width: 1240px;
          padding: 0 60px;
          margin-top: 24px;
        }

        @media (max-width: 991px) {
          .stories-container {
            padding: 0 20px;
          }
        }

        .story-card {
          display: flex;
          flex-direction: column;
          width: 600px;
          max-width: 100%;
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          box-shadow:
            0px 2px 4px -2px rgba(0, 0, 0, 0.1),
            0px 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-top: 40px;
        }

        .story-header {
          display: flex;
          gap: 8px;
          padding: 12px;
          white-space: nowrap;
        }

        @media (max-width: 991px) {
          .story-header {
            flex-wrap: wrap;
            white-space: initial;
          }
        }

        .user-info {
          display: flex;
          gap: 8px;
          flex: 1;
        }

        @media (max-width: 991px) {
          .user-info {
            flex-wrap: wrap;
            white-space: initial;
          }
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 32px;
          background-color: rgba(0, 0, 0, 0.1);
          margin: auto 0;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        @media (max-width: 991px) {
          .user-details {
            white-space: initial;
          }
        }

        .user-name {
          color: #000;
          font:
            500 14px/143% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          text-overflow: ellipsis;
        }

        .time-ago {
          color: rgba(0, 0, 0, 0.5);
          font:
            400 12px/133% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          text-overflow: ellipsis;
        }

        @media (max-width: 991px) {
          .time-ago {
            white-space: initial;
          }
        }

        .more-button {
          color: #000;
          font:
            400 16px/150% Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          text-align: center;
          text-overflow: ellipsis;
          margin: auto 0;
          background: none;
          border: none;
          cursor: pointer;
        }

        .story-image {
          width: 100%;
          aspect-ratio: 2;
          object-fit: cover;
          object-position: center;
        }

        .story-content {
          display: flex;
          flex-direction: column;
          padding: 12px;
          font:
            400 16px/150% Inter,
            sans-serif;
        }

        .story-title {
          color: #000;
        }

        .story-category {
          color: #000;
          font:
            12px/133% Inter,
            sans-serif;
          padding: 2px 4px;
          background-color: rgba(217, 217, 217, 0.5);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 2px;
          white-space: nowrap;
          align-self: start;
          margin-top: 8px;
          justify-content: center;
        }

        @media (max-width: 991px) {
          .story-category {
            white-space: initial;
          }
        }

        .like-icon {
          margin-top: 8px;
          text-align: center;
          text-overflow: ellipsis;
          font-family: Inter, sans-serif;
          background: linear-gradient(180deg, #ffa992 0%, #ff7852 65%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  )
}

export default LatestPetStories
