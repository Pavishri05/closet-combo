"use client"

import { useState } from "react"

export default function Home(){

  const [clothes,setClothes] = useState<any[]>([])
  const [outfit,setOutfit] = useState<any[]>([])
  const [vibe,setVibe] = useState("casual")

  function getDominantColor(imageFile:any){

    return new Promise((resolve)=>{

      const img = new Image()
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      img.onload = () => {

        canvas.width = img.width
        canvas.height = img.height

        ctx?.drawImage(img,0,0)

        const data = ctx?.getImageData(0,0,canvas.width,canvas.height).data

        let r=0,g=0,b=0,count=0

        for(let i=0;i<data!.length;i+=40){

          r += data![i]
          g += data![i+1]
          b += data![i+2]
          count++

        }

        r=Math.floor(r/count)
        g=Math.floor(g/count)
        b=Math.floor(b/count)

        resolve(`rgb(${r},${g},${b})`)
      }

      img.src = URL.createObjectURL(imageFile)

    })

  }

  async function uploadClothes(e:any){

    const files = e.target.files
    if(!files) return

    const newItems:any=[]

    for(const file of files){

      const imageURL = URL.createObjectURL(file)

      const color = await getDominantColor(file)

      newItems.push({
        image:imageURL,
        color:color
      })

    }

    setClothes(prev => [...prev,...newItems])

  }

  async function generateOutfit(){

    if(clothes.length < 2){
      alert("Upload more clothes first")
      return
    }

    const response = await fetch("/api/generate-outfit",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        clothes,
        vibe
      })
    })

    const data = await response.json()

    if(!data.items){
      alert("AI could not generate outfit")
      return
    }

    const selected = data.items.map((i:number)=>clothes[i])

    setOutfit(selected)

  }

  return(

    <main className="min-h-screen bg-gray-100 text-black p-10">

      <h1 className="text-3xl font-bold mb-6">
        Closet Combo Genius 👗
      </h1>

      <input
      type="file"
      multiple
      onChange={uploadClothes}
      className="mb-6"
      />

      <h2 className="text-xl font-semibold mb-3">
        My Virtual Closet
      </h2>

      <div className="bg-[#d9c4a3] p-6 rounded-lg shadow">

        <div className="h-3 bg-[#7a5230] mb-6 rounded"></div>

        <div className="flex flex-wrap gap-6">

          {clothes.map((item,index)=>(
            <div key={index} className="flex flex-col items-center">

              <span className="text-xl">🪝</span>

              <img
              src={item.image}
              className="w-24 h-32 object-contain bg-white p-2 rounded shadow"
              />

              <div
              className="w-6 h-6 rounded mt-1"
              style={{background:item.color}}
              />

            </div>
          ))}

        </div>

      </div>

      <div className="mt-8">

        <label className="mr-3 font-semibold">
          Choose vibe:
        </label>

        <select
        value={vibe}
        onChange={(e)=>setVibe(e.target.value)}
        className="border p-2 rounded">

          <option value="casual">Casual</option>
          <option value="office">Office</option>
          <option value="date">Date</option>
          <option value="party">Party</option>

        </select>

      </div>

      <button
      onClick={generateOutfit}
      className="mt-6 bg-purple-600 text-white px-6 py-2 rounded">
        Generate Outfit
      </button>

      <h2 className="text-xl font-semibold mt-8">
        Suggested Outfit
      </h2>

      <div className="flex gap-6 mt-4">

        {outfit.map((item,index)=>(
          <img
          key={index}
          src={item.image}
          className="w-24 h-32 object-contain bg-white p-2 rounded shadow"
          />
        ))}

      </div>

    </main>

  )
}