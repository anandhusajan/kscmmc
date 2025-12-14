'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering user queries about KSCMMC.
 *
 * The flow uses a large language model to generate answers based on the provided query.
 * It exports the following:
 * - `answerUserQuery`: An async function that takes a user query and returns an AI-generated answer.
 * - `AnswerUserQueryInput`: The input type for the `answerUserQuery` function.
 * - `AnswerUserQueryOutput`: The output type for the `answerUserQuery` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerUserQueryInputSchema = z.object({
  query: z.string().describe('The user query to be answered.'),
});
export type AnswerUserQueryInput = z.infer<typeof AnswerUserQueryInputSchema>;

const AnswerUserQueryOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user query.'),
});
export type AnswerUserQueryOutput = z.infer<typeof AnswerUserQueryOutputSchema>;

export async function answerUserQuery(input: AnswerUserQueryInput): Promise<AnswerUserQueryOutput> {
  return answerUserQueryFlow(input);
}

const answerUserQueryPrompt = ai.definePrompt({
  name: 'answerUserQueryPrompt',
  input: {schema: AnswerUserQueryInputSchema},
  output: {schema: AnswerUserQueryOutputSchema},
  prompt: `You are a helpful AI assistant providing information about Kerala State Coir Machinery Manufacturing Company Limited (KSCMMC). Use your knowledge to answer the following user query: {{{query}}}`,
});

const answerUserQueryFlow = ai.defineFlow(
  {
    name: 'answerUserQueryFlow',
    inputSchema: AnswerUserQueryInputSchema,
    outputSchema: AnswerUserQueryOutputSchema,
  },
  async input => {
    const {output} = await answerUserQueryPrompt(input);
    return output!;
  }
);
