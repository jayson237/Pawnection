"use client"

import { useState } from "react"

import { Button } from "../ui/Button"

const LostAndFound = () => {
  const [allSelected, setAllSeleceted] = useState(false)
  const [dogsSelected, setDogsSeleceted] = useState(false)
  const [catsSelected, setCatsSeleceted] = useState(false)
  const [birdsSelected, setBirdsSeleceted] = useState(false)
  const [othersSelected, setOthersSeleceted] = useState(false)
  return (
    <main className="flex min-h-screen flex-col items-center divide-gray-100 w-full h-full">

      <div className="flex flex-col pb-4 w-full h-1/4 px-4 items-center mt-10">

        <h2 className="text-3xl font-semibold tracking-tight mb-4 flex">Lost & Found Pets</h2>

        <div className="flex mt-2 mb-2 ">
          <Button onClick = {() => {
            setAllSeleceted(true) 
            setDogsSeleceted(false)
            setCatsSeleceted(false)
            setBirdsSeleceted(false)
            setOthersSeleceted(false)}
          }
            variant="outline" 
            className = {allSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               All 
          </Button>     

          <Button onClick = {() => {
            setDogsSeleceted(true)
            setAllSeleceted(false)
            setCatsSeleceted(false)
            setBirdsSeleceted(false)
            setOthersSeleceted(false)}
          }
            variant="outline" 
            className = {dogsSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               Dogs 
          </Button>     

          <Button onClick = {() => {
            setCatsSeleceted(true)
            setDogsSeleceted(false)
            setAllSeleceted(false)
            setBirdsSeleceted(false)
            setOthersSeleceted(false)}}
            variant="outline" 
            className = {catsSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               Cats 
          </Button>   

          <Button onClick = {() => {
            setBirdsSeleceted(true)
            setDogsSeleceted(false)
            setCatsSeleceted(false)
            setAllSeleceted(false)
            setOthersSeleceted(false)}}
            variant="outline" 
            className = {birdsSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               Birds 
          </Button>     

          <Button onClick = {() => {
            setOthersSeleceted(true)
            setDogsSeleceted(false)
            setCatsSeleceted(false)
            setBirdsSeleceted(false)
            setAllSeleceted(false)}}
            variant="outline" 
            className = {othersSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               Others 
          </Button>     
        </div>

        <div className = "flex mt-4">
        <Button variant="outline" className="mr-8 w-60 mb-5 bg-black text-white">Report A Missing Pet</Button>
        <Button className="mr-8 w-60 mb-5 bg-black text-white"> Found A Pet</Button>
        </div>

      </div>

      <div className="flex border-t-2 border-black flex-col pb-4 w-full h-full px-4 items-center">

        <h2 className="text-3xl font-semibold tracking-tight mb-4 flex">Lost Pets</h2>

        <div className="flex mt-2 mb-2 ">
          <Button className = "mr-20 w-40" >
               Test 
          </Button>     

          <Button className = "mr-20 w-40">
               Test 
          </Button>     

          <Button className = "mr-20 w-40" >
               Test 
          </Button>     

        </div>
      </div>


      <div className="flex border-t-2 border-black my-4 flex-col items-center border-b-5 pb-4 w-full h-full">

        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">Found Pets</h2>
        <div className="flex mt-2 mb-2 ">
          <Button className = "mr-20 w-40" >
               Test 
          </Button>     

          <Button className = "mr-20 w-40">
               Test 
          </Button>     

          <Button className = "mr-20 w-40" >
               Test 
          </Button>     

        </div>
      </div>
      
    </main>
  )
}

export default LostAndFound