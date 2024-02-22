"use client"
import { Textarea } from "../ui/TextArea"
import { Button } from "../ui/Button"
import { useState, FormEvent } from "react"
import { ToastContainer, toast } from 'react-toastify';
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
    const [isLoading, setIsLoading] = useState(false)
    
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("1")
        try {
            console.log("2")
            
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/create/missingPetReport', {
              method: 'POST',
              body: formData,
            })
            
            console.log("3")

            if (!response.ok) {
                throw new Error('Failed to create Missing Pet Report. Please try again.')
            } else {
                console.log("4")
            }
            
            
        }  catch (error) {
            console.error(error)
        }
    }

    return (
        <main className="flex max-h-screen flex-col  divide-gray-100 w-full h-full ml-20">
  
          <h2 className="text-3xl font-semibold tracking-tight mt-20 ml-20 flex "> Report Missing Pet</h2>

            <form onSubmit={onSubmit}> 
                <div className = "flex mt-10 ml-20">
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Name" required={true} onInput ={(e) => setName(e.currentTarget.value) } />
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Sex" required={true} onInput = {(e) => setSex(e.currentTarget.value)} />
                </div>

                <div className = "flex mt-10 ml-20">
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Message from Owner" required={true} onInput = {(e) => setMessage(e.currentTarget.value)} />
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Description" required={true} onInput = {(e) => setDescription(e.currentTarget.value)}/>
                </div>

                <div className = "flex mt-10 ml-20">
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Area Last Seen" required={true} onInput = {(e) => setLastSeenArea(e.currentTarget.value)}/> 
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Date Last Seen" required={true} onInput = {(e) => setLastSeenDate(e.currentTarget.value)}/>
                </div>
                
                <div className = "flex mt-10 ml-20">
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Contact Details" required={true} onInput = {(e) => setContactDetails(e.currentTarget.value)}/>
                    <Textarea className = "mr-8 ml-20 w-1/4" placeholder="Image of missing pet" required={true} onInput = {(e) => setImage(e.currentTarget.value)}/>
                </div>
                
                <div className = "flex  ml-20 justify-center"> 
                    <Button className = "ml-20 w-1/6 mt-10 justify-center" type="submit">
                        {isLoading ? 'Loading...' : 'Submit'}
                    </Button>
                    
                </div>
            </form>
        </main>
    )
}

export default LostPetReport