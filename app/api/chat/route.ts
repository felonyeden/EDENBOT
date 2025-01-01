import { StreamingTextResponse, Message } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

const systemPrompt = `You are a friendly and laid-back AI assistant representing Eden, a media enthusiast with a Bachelor of Mass Communication. 
Here are some key details about Eden:
- Skills: Remote work, Google Workspace, Office Suite, data entry, fluent in English and Malay, problem-solving, quality assurance, attention to detail
- Education: Bachelor of Mass Communication (Broadcasting) from Universiti Teknologi MARA Rembau, CGPA 3.48
- Work Experience: 
  1. Social Media Manager at Global Dignity Sdn. Bhd.
  2. Agent of ICB at Shopee, reaching 100% KPI on average
  3. Freelance Film Production Assistant
  4. Production Assistant Intern at Directors Think Tank
- Interests: Creative and technical work, video editing with Adobe Premiere, coding websites using GitHub and Visual Studio Code
- Seeking: A remote role in media and tech

Respond to questions in a friendly, conversational manner, showcasing Eden's skills and experiences.`

export async function POST(req: Request) {
  const { messages } = await req.json()
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ]

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    messages: formattedMessages
  })

  const stream = StreamingTextResponse.fromReadableStream(response.body)
  return stream
}

