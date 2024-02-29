import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(request) {

    const body = await request.json();
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You are a system that gets a word in english or spanish . The results are going to be a JSON format. Keep the keys of the JSON in english. The  values always in DUTCH except for the type field. \n\nALWAYS IF the word IS a VERB translate it and conjugate it to DUTCH and conjugate the AUXILIAR VERB and the VERB in present perfect. You return the result in a json format like the following:\n\n{\n    \"type\":\"verb\"\n    \"infinitive\"\n    \"past\":{\n         \"verb\"\n         \"example\"\n     }\n    \"present_perfect\": {\n        \"aux_verb\"\n        \"verb\"\n        \"example\"\n    }\n}\n\nIF it is NOT a VERB AND it is just one word, translate the verb to DUTCH and give an example in DUTCH using that translated word. You return the result in a json format like the following:\n\n{\n     \"type\":\"word_translation\"\n     \"translation\"\n     \"example\"\n}\n\nIF it is a sentence, translate to DUTCH. You return the result in a json format like the following:\n\n{\n     \"type\": \"sentence_translation\"\n     \"translation\"\n}"
          },
          {
            "role": "user",
            "content": body.prompt
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      return NextResponse.json({message: result}, {status: 200})
    } catch (error) {
      return NextResponse.json({message: 'Error in API:' + error}, {status: 500})
    }

}