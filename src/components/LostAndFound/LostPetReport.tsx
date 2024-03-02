"use client"

import { FormEvent, useState } from "react"

import { Button } from "../ui/Button"
import { Textarea } from "../ui/TextArea"

const LostPetReport = () => {
  const [name, setName] = useState("")
  const [sex, setSex] = useState("")
  const [message, setMessage] = useState("")
  const [description, setDescription] = useState("")
  const [lastSeenArea, setLastSeenArea] = useState("")
  const [lastSeenDate, setLastSeenDate] = useState("")
  const [contactDetails, setContactDetails] = useState("")
  const [petImage, setPetImage] = useState<File | null>(null)
  // const [petImageStr, setPetImageStr] = useState(null)
  //   const [image, setImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    const sign = await fetch("/api/cloudinary/cdn-sign?type=post"); 
    const data = await sign.json();
    const url =
      "https://api.cloudinary.com/v1_1/" + data.cloudname + "/auto/upload";  
    try {
      const formData = new FormData()

      formData.append("file", petImage);
      formData.append("api_key", data.apikey);
      formData.append("timestamp", data.timestamp.toString());2
      formData.append("signature", data.signature);
      formData.append("eager", data.eager);
      formData.append("folder", data.folder);

      const cdnResponse = await fetch(url, {
        method: "POST",
        body: formData,
        cache: "no-store",
      });
      const result = await cdnResponse.json();

      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          sex: sex,
          message: message,
          description: description,
          lastSeenArea: lastSeenArea,
          lastSeenDate: lastSeenDate,
          contactDetails: contactDetails,
          petImage: result.secure_url
        }),
      })

      if (!response.ok) {
        throw new Error(
          "Failed to create Missing Pet Report. Please try again.",
        )
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <main className="flex max-h-screen flex-col  divide-gray-100 w-full h-full ml-20">
      <h2 className="text-3xl font-semibold tracking-tight mt-20 ml-20 flex ">
        Report Missing Pet
      </h2>

      <form onSubmit={onSubmit}>
        <div className="flex mt-10 ml-20">
          <Textarea
            name="petName"
            className="mr-8 ml-20 w-1/4"
            placeholder="Name"
            required={true}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Textarea
            name="petSex"
            className="mr-8 ml-20 w-1/4"
            placeholder="Sex"
            required={true}
            onChange={(e) => setSex(e.currentTarget.value)}
          />
        </div>

        <div className="flex mt-10 ml-20">
          <Textarea
            name="reportMessage"
            className="mr-8 ml-20 w-1/4"
            placeholder="Message from Owner"
            required={true}
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
          <Textarea
            name="reportDescription"
            className="mr-8 ml-20 w-1/4"
            placeholder="Description"
            required={true}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>

        <div className="flex mt-10 ml-20">
          <Textarea
            name="lastSeenArea"
            className="mr-8 ml-20 w-1/4"
            placeholder="Area Last Seen"
            required={true}
            onChange={(e) => setLastSeenArea(e.currentTarget.value)}
          />
          <Textarea
            name="lastSeenDate"
            className="mr-8 ml-20 w-1/4"
            placeholder="Date Last Seen"
            required={true}
            onChange={(e) => setLastSeenDate(e.currentTarget.value)}
          />
        </div>

        <div className="flex mt-10 ml-20">
          <Textarea
            name="contactDetails"
            className="mr-8 ml-20 w-1/4"
            placeholder="Contact Details"
            required={true}
            onChange={(e) => setContactDetails(e.currentTarget.value)}
          />
          
          <input className="mr-8 ml-20 w-1/4" type="file" accept="image/*" required={true} onChange={(e) => setPetImage(e.target.files ? e.target.files[0] : null)} />
        </div>

        <div className="flex  ml-20 justify-center">
          <Button className="ml-20 w-1/6 mt-10 justify-center" type="submit">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </main>
    
  )
}

export default LostPetReport
