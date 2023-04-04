import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// openAI configration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 2000,
    temperature: 0,
    prompt,
  });

  const splitedText = response.data.choices[0].text.split("ください");
  const replacedText =
    splitedText.length === 1
      ? splitedText[0]
      : splitedText[1].replace(/\\n/gm, "");
  console.log(replacedText.trim());

  res.json({ message: replacedText });
});

app.listen(PORT, () => console.log(`${PORT}番で起動中`));
