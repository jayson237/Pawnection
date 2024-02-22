"use client"
import { Textarea } from "../ui/TextArea"
import { Button } from "../ui/Button"
import { useState, FormEvent } from "react"
import CreateMissingPetReport
 from "@/app/api/create/missingPetReport"
const LostPetReport = () => {

    const [name, setName] = useState("")
    const [sex, setSex] = useState("")
    const [message, setMessage] = useState("")
    const [description, setDescription] = useState("")
    const [lastSeenArea, setLastSeenArea] = useState("")
    const [lastSeenDate, setLastSeenDate] = useState("")
    const [contactDetails, setContactDetails] = useState("")
    const [image, setImage] = useState("")
    
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/create/missingPetReport', {
              method: 'POST',
              body: formData,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main className="flex max-h-screen flex-col  divide-gray-100 w-full h-full ml-20">
  
          <h2 className="text-3xl font-semibold tracking-tight mt-20 ml-20 flex "> Report Missing Pets</h2>

            <form onSubmit={onSubmit}> 
                <main className = "flex mt-10 ml-20">
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Name" onInput ={(e) => setName(e.currentTarget.value) } />
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Sex" onInput = {(e) => setSex(e.currentTarget.value)} />
                </main>

                <main className = "flex mt-10 ml-20">
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Message from Owner" onInput = {(e) => setMessage(e.currentTarget.value)} />
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Description" onInput = {(e) => setDescription(e.currentTarget.value)}/>
                </main>

                <main className = "flex mt-10 ml-20">
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Area Last Seen" onInput = {(e) => setLastSeenArea(e.currentTarget.value)}/> 
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Date Last Seen" onInput = {(e) => setLastSeenDate(e.currentTarget.value)}/>
                </main>
                
                <main className = "flex mt-10 ml-20">
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Contact Details" onInput = {(e) => setContactDetails(e.currentTarget.value)}/>
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Image of missing pet" onInput = {(e) => setImage(e.currentTarget.value)}/>
                </main>
                
                <main className = "flex  ml-20 justify-center"> 
                    <Button className = "ml-20 w-1/6 mt-10 justify-center" type="submit">
                        Submit
                    </Button>
                </main>
            </form>
        </main>
    )
}

export default LostPetReport