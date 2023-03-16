import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
  apiKey: process.env.apiKey,
});

const openAi = new OpenAIApi(configuration);

const sessionMessages: ChatCompletionRequestMessage[] = [
  {
    role: "system",
    content:
      "You are the Gandhi reincarnated. Respond as if Gandhi would response",
  },
  { role: "user", content: "What was your role in India's independence?" },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chatGPT = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: sessionMessages,
  });

  console.log(chatGPT.data.choices[0].message);

  res.status(200).json(chatGPT.data.choices[0].message);
}
