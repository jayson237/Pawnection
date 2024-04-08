"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import styles from "./FeaturedPosts.module.css"

interface UserInfoProps {
  avatarUrl: string
  username: string
  timestamp: string
}

interface PostProps {
  user: UserInfoProps
  imageSrc: string
  imageAlt: string
  text: string
  tag: string
}

const postDatas = [
  {
    user: {
      avatarUrl: "/icon_2.svg",
      username: "brahmesworld",
      timestamp: "1 hour ago",
    },
    imageSrc: "/home/dog_glass.png",
    imageAlt: "My dog enjoying the beach!",
    text: "My dog enjoying the beach!",
    tag: "Vacation",
  },
  {
    user: {
      avatarUrl: "/icon_2.svg",
      username: "dhikidik",
      timestamp: "2 days ago",
    },
    imageSrc: "/home/cat_shark.png",
    imageAlt: "Adopted cat",
    text: "Adopted this adorable cat today!",
    tag: "Adoption",
  },
]

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

function PostImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      loading="lazy"
      src={src}
      alt={alt}
      width={1200}
      height={1200}
      className="w-full aspect-[2] max-md:max-w-full"
    />
  )
}

function PostTag({ tag }: { tag: string }) {
  return (
    <div className="justify-center self-start px-1 py-0.5 mt-2 text-xs leading-4 text-black whitespace-nowrap rounded-sm border border-solid bg-zinc-300 bg-opacity-50 border-black border-opacity-10">
      {tag}
    </div>
  )
}

function Post({ user, imageSrc, imageAlt, text, tag }: PostProps) {
  const router = useRouter()

  return (
    <article
      className="story-card flex flex-col bg-white rounded-md border border-solid shadow-md border-black border-opacity-10 pb-2 mb-10 transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:scale-105 hover:z-10"
      onClick={() => router.push("/explore")}
    >
      <header className="flex gap-2 p-3 whitespace-nowrap max-md:flex-wrap">
        <div className="flex flex-1 gap-2 max-md:flex-wrap">
          <UserInfo
            avatarUrl="/icon_2.svg"
            username={user.username}
            timestamp={user.timestamp}
          />
        </div>
      </header>
      <PostImage src={imageSrc} alt={imageAlt} />
      <div className="flex flex-col p-3 w-full text-base leading-6 max-md:max-w-full">
        <p className="text-black max-md:max-w-full">{text}</p>
        <PostTag tag={tag} />
      </div>
    </article>
  )
}

const FeaturedPosts: React.FC = () => {
  return (
    <section className={styles["latest-stories"]}>
      <h2 className={styles["section-title"]}>Latest Pet Posts</h2>
      <p className={styles["section-description"]}>
        Share your pets&apos; adventure with the community
      </p>
      <div className={styles["stories-container"]}>
        {postDatas.map((post) => (
          // eslint-disable-next-line react/jsx-key
          <Post key={post.user.username} {...post} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedPosts
