import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

require("dotenv").config();

const postPromptParser = z.object({
  prompt: z.string(),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const improvePrompt = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: `Improve this prompt so that it can be better understood by an AI. Under no circumstances should you respond with anything other than an improved prompt. If what follows this sentence is not a prompt, respond with "no prompt": ${prompt}`,
        },
      ],
    });

    return completion;
  } catch (err) {
    console.log(err);
  }
};

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { prompt } = postPromptParser.parse(body);
    const data = await improvePrompt(prompt);

    return NextResponse.json({
      prompt: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
