"use client"

import { useState } from "react"

export default function Cupboard({ clothes }: any) {

const [open,setOpen] = useState(false)

return(

<div className="flex justify-center mb-12">

<div
className="relative w-[500px] h-[360px]"
style={{ perspective:"1200px" }}
>

{/* INSIDE CLOSET */}

<div
className="absolute w-full h-full rounded-xl shadow-inner p-6 transition-all duration-500"
style={{
background: open
? "linear-gradient(to bottom,#f7e6c9,#d9c4a3)"
: "#d9c4a3",
boxShadow: open
? "inset 0 0 60px rgba(255,220,150,0.6)"
: "inset 0 0 20px rgba(0,0,0,0.2)"
}}
>

{/* hanger rod */}

<div className="h-2 bg-[#7a5230] rounded mb-6"></div>
{open && (
<div
style={{
position:"absolute",
top:"15px",
left:"50%",
transform:"translateX(-50%)",
fontSize:"22px"
}}
>
💡
</div>
)}
{/* SCROLLABLE CLOTHES AREA */}

<div className="h-[260px] overflow-y-auto pr-2">

<div className="grid grid-cols-4 gap-6 justify-items-center">

{clothes.map((item:any,index:number)=>(
<div
key={index}
className="flex flex-col items-center animate-clothSwing"
>
<span className="text-xl">🪝</span>

<img
src={item.image}
className={`w-20 h-24 object-contain bg-white p-1 rounded shadow ${
item.used ? "opacity-40" : ""
}`}
/>

</div>
))}

</div>

</div>

</div>

{/* LEFT DOOR */}

<div
onClick={()=>setOpen(!open)}
className="absolute w-1/2 h-full bg-[#a66a3f] left-0 top-0 rounded-l-xl cursor-pointer"
style={{
transformOrigin:"left",
transition:"transform 0.7s",
transform: open ? "rotateY(-120deg)" : "rotateY(0deg)"
}}
></div>

{/* RIGHT DOOR */}

<div
onClick={()=>setOpen(!open)}
className="absolute w-1/2 h-full bg-[#8b5a2b] right-0 top-0 rounded-r-xl cursor-pointer"
style={{
transformOrigin:"right",
transition:"transform 0.7s",
transform: open ? "rotateY(120deg)" : "rotateY(0deg)"
}}
></div>

</div>

</div>

)

}