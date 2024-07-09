const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})

const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{text: ""}]
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

async function run(prompt) {
    const result = await chat.sendMessageStream(prompt);

    let text = '';
    for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    // console.log(chunkText);
    text += chunkText;
    }
    // console.log(text);
    return await text

  }

  module.exports = run