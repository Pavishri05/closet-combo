"use client"

import { useState } from "react"

export default function Home(){

const [clothes,setClothes] = useState<any[]>([])
const [outfit,setOutfit] = useState<any[]>([])
const [history,setHistory] = useState<any[]>([])
const [vibe,setVibe] = useState("casual")

/* ---------------- COLOR DETECTION ---------------- */

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

/* ---------------- UPLOAD CLOTHES ---------------- */

async function uploadClothes(e:any){

const files = e.target.files
if(!files) return

const newItems:any=[]

for(const file of files){

const imageURL = URL.createObjectURL(file)

const color = await getDominantColor(file)

const name = file.name.toLowerCase()

let type="unknown"

if(name.includes("dress")) type="dress"

else if(
name.includes("pant") ||
name.includes("jean") ||
name.includes("trouser") ||
name.includes("skirt")
){
type="bottom"
}

else if(
name.includes("top") ||
name.includes("shirt") ||
name.includes("tee") ||
name.includes("tshirt")
){
type="top"
}

newItems.push({
image:imageURL,
color:color,
type:type,
used:false
})

}

setClothes(prev => [...prev,...newItems])

}

/* ---------------- OUTFIT GENERATOR ---------------- */

function generateOutfit(){

const available = clothes.filter(c=>!c.used)

const tops = available.filter(c => c.type==="top")
const bottoms = available.filter(c => c.type==="bottom")
const dresses = available.filter(c => c.type==="dress")

if(vibe==="date" && dresses.length>0){

const randomDress =
dresses[Math.floor(Math.random()*dresses.length)]

setOutfit([randomDress])
return
}

if(tops.length>0 && bottoms.length>0){

const randomTop =
tops[Math.floor(Math.random()*tops.length)]

const randomBottom =
bottoms[Math.floor(Math.random()*bottoms.length)]

setOutfit([randomTop,randomBottom])
return
}

if(dresses.length>0){

const randomDress =
dresses[Math.floor(Math.random()*dresses.length)]

setOutfit([randomDress])
return
}

alert("Not enough clothing items")

}

/* ---------------- WEAR OUTFIT ---------------- */

function wearOutfit(){

if(outfit.length===0){
alert("Generate outfit first")
return
}

const today = new Date().toLocaleDateString()

setHistory(prev => [
{ date: today, items: outfit },
...prev
])

setClothes(prev =>
prev.map(item =>
outfit.includes(item)
? { ...item, used:true }
: item
)
)

setOutfit([])

}

/* ---------------- RESET LAUNDRY ---------------- */

function resetLaundry(){

setClothes(prev =>
prev.map(item => ({
...item,
used:false
}))
)

}

/* ---------------- STATS ---------------- */

const topsCount = clothes.filter(c=>c.type==="top").length
const bottomsCount = clothes.filter(c=>c.type==="bottom").length
const dressesCount = clothes.filter(c=>c.type==="dress").length

/* ---------------- UI ---------------- */

return(

<main className="min-h-screen bg-gray-100 text-black p-10">

<h1 className="text-4xl font-bold mb-10">
Closet Combo Genius 👗
</h1>

<div className="grid grid-cols-2 gap-12">

{/* LEFT SIDE : WARDROBE */}

<div>

<h2 className="text-xl font-semibold mb-4">
My Virtual Closet
</h2>

<input
type="file"
multiple
onChange={uploadClothes}
className="mb-6"
/>

<div className="mb-6 bg-white p-4 rounded shadow">

<h3 className="font-semibold mb-2">
Wardrobe Stats
</h3>

<p>Tops: {topsCount}</p>
<p>Bottoms: {bottomsCount}</p>
<p>Dresses: {dressesCount}</p>

</div>

<button
onClick={resetLaundry}
className="mb-6 bg-blue-600 text-white px-4 py-2 rounded">
Reset Laundry </button>

<div className="bg-[#d9c4a3] p-6 rounded-lg shadow">

<div className="h-3 bg-[#7a5230] mb-6 rounded"></div>

<h3 className="font-semibold mb-3">Tops</h3>

<div className="flex flex-wrap gap-6 mb-6">

{clothes.filter(c=>c.type==="top").map((item,index)=>(

<div key={index} className="flex flex-col items-center">

<span>🪝</span>

<img
src={item.image}
className={`w-24 h-32 object-contain bg-white p-2 rounded shadow ${item.used ? "opacity-40":""}`}
/>

</div>

))}

</div>

<h3 className="font-semibold mb-3">Bottoms</h3>

<div className="flex flex-wrap gap-6 mb-6">

{clothes.filter(c=>c.type==="bottom").map((item,index)=>(

<div key={index} className="flex flex-col items-center">

<span>🪝</span>

<img
src={item.image}
className={`w-24 h-32 object-contain bg-white p-2 rounded shadow ${item.used ? "opacity-40":""}`}
/>

</div>

))}

</div>

<h3 className="font-semibold mb-3">Dresses</h3>

<div className="flex flex-wrap gap-6">

{clothes.filter(c=>c.type==="dress").map((item,index)=>(

<div key={index} className="flex flex-col items-center">

<span>🪝</span>

<img
src={item.image}
className={`w-24 h-32 object-contain bg-white p-2 rounded shadow ${item.used ? "opacity-40":""}`}
/>

</div>

))}

</div>

</div>

</div>

{/* RIGHT SIDE : GENERATOR */}

<div>

<h2 className="text-xl font-semibold mb-6">
Outfit Generator
</h2>

<div className="mb-6">

<label className="mr-3 font-semibold">
Choose vibe:
</label>

<select
value={vibe}
onChange={(e)=>setVibe(e.target.value)}
className="border p-2 rounded"

>

<option value="casual">Casual</option>
<option value="office">Office</option>
<option value="date">Date</option>
<option value="party">Party</option>

</select>

</div>

<button
onClick={generateOutfit}
className="bg-purple-600 text-white px-6 py-2 rounded mb-8">
Generate Outfit </button>

<h3 className="text-lg font-semibold mb-4">
Suggested Outfit
</h3>

<div className="flex gap-6">

{outfit.map((item,index)=>(

<img
key={index}
src={item.image}
className="w-28 h-36 object-contain bg-white p-2 rounded shadow"
/>

))}

</div>

<button
onClick={wearOutfit}
className="mt-6 bg-green-600 text-white px-6 py-2 rounded">
I'm Wearing This </button>

<h3 className="text-lg font-semibold mt-10 mb-4">
Outfit History
</h3>

<div className="space-y-4">

{history.map((entry,index)=>(

<div key={index} className="bg-white p-4 rounded shadow">

<p className="text-sm mb-2">{entry.date}</p>

<div className="flex gap-4">

{entry.items.map((item:any,i:number)=>( <img
key={i}
src={item.image}
className="w-16 h-20 object-contain"
/>
))}

</div>

</div>

))}

</div>

</div>

</div>

</main>

)

}
