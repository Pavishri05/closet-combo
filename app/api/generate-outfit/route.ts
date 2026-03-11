import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request){

try{

const { clothes, vibe } = await req.json()

const items = clothes.map((c:any)=>c.type).join(", ")

const prompt = `
You are a fashion stylist AI.

The user has these clothes:
${items}

The user wants a ${vibe} outfit.

Give a short styling suggestion using their clothes.
`

const response = await openai.chat.completions.create({
model: "gpt-4o-mini",
messages: [
{ role: "system", content: "You are a helpful fashion stylist." },
{ role: "user", content: prompt }
]
})

const reply = response.choices[0].message.content

return NextResponse.json({ reply })

}catch(error){

console.error(error)

return NextResponse.json({
reply:"AI stylist failed. Check API key."
})

}

}