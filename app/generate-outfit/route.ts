import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request){

  const { clothes, vibe } = await req.json()

  const wardrobe = clothes.map((c:any, i:number)=>({
    index: i,
    color: c.color
  }))

  const prompt = `
You are a fashion stylist.

Wardrobe items:
${JSON.stringify(wardrobe)}

Vibe: ${vibe}

Choose the best 2 items that match well together.
Return ONLY their indexes as JSON like this:

{ "items": [0,2] }
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  })

  const text = completion.choices[0].message.content || "{}"

  const parsed = JSON.parse(text)

  return Response.json(parsed)
}