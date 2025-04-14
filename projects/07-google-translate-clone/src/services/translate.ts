import OpenAI from 'openai';
import { SUPPORTED_LANGUAGES } from '../constant';
import { FromLanguage, Language } from "../types.d";
const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true 
})

export async function translate ({
    fromLanguage,
    toLanguage,
    text,
}:{
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}) {
    if (fromLanguage == toLanguage) return text

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
        {
                role: 'system',
                content: 'You are an AI that translate text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. The language you translate is surrounded by `[[`and`]]`.'
        },
        {
            role: 'user',
            content: `${text} {{${fromCode}}} [[${toCode}]]`
        }]
    })

    return completion.choices[0]?.message?.content;
}