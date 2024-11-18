import OpenAI from "openai";
import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import type { QuestionType } from "../types/questionType";

// Zod Schema forces ChatGPT responses to conform to the structure
const questionTypeSchema = z
  .object({
    question: z.string(),
    options: z.object({
      a: z.string(),
      b: z.string(),
      c: z.string(),
      d: z.string(),
    }),
    answer: z.enum(["a", "b", "c", "d"]),
  })
  .required();

  export const openAiClient = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  export const fetchQuestionsData = async (client: OpenAI) => {
    try {
      const response = await client.beta.chat.completions.parse({
        model: "gpt-4o-mini-2024-07-18",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that generates JSON. You always return just the JSON with no additional description or context.",
          },
          {
            role: "user",
            content:
              "Give me 10 general knowledge quiz questions, each with 3 false options and one true. Format your response to JSON",
          },
        ],
        tools: [
          zodFunction({ name: "questions", parameters: questionTypeSchema }),
        ],
      });

      // index is added to track/animate question change with Motion
      const questions = response.choices[0].message.tool_calls.map(
        (call, index) => ({id: index, parsedArguments: call.function.parsed_arguments})
      ) as QuestionType[];

      return questions
    } catch (err) {
      console.error("Failed to load quiz questions. Please try again later.", err);
      throw err
    }
  };