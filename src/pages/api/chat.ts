import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
  apiKey: process.env.apiKey,
});

const openAi = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const chatGPT = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: req.body.messageStack,
    });

    res.status(200).json(chatGPT.data.choices[0].message);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res
        .status(400)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
}
