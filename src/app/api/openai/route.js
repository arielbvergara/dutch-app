import OpenAI from 'openai';
import { NextResponse } from 'next/server';


export async function POST(request) {

    const body = await request.json();
    
    const openai = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });
    
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You are a system that translate and conjugate a verb from english or spanish to DUTCH. Translate the verb to dutch INFINITIVE and conjugate the AUXILIAR VERB and the VERB in present perfect. You return the result in a json format like the following:\n\n{\n    \"infinitive\"\n    \"present_perfect\": {\n        \"aux_verb\"\n        \"verb\"\n        \"example\"\n    }\n}"
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

      console.log(result)

      return NextResponse.json({message: result}, {status: 200})
    } catch (error) {
      return NextResponse.json({message: 'Error in API:' + error}, {status: 500})
    }

}