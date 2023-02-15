import ChatGPT from 'chatgpt-official';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';

// load env variables
config();

const app = express();
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: [process.env.ALLOWED_CLIENT!] }));

const bot = new ChatGPT(process.env.OPENAI_KEY!, {
  model: 'text-davinci-003',
  max_tokens: 512,
  temperature: 1,
  top_p: 1.0,
  frequency_penalty: 0.5,
  presence_penalty: 0.0,
});

app.post('/chat', async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const response = await bot.ask(body.msg, body.chatId);
    return res.status(200).json({ success: true, message: response });
  } catch (err) {
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
});

const port = process.env.PORT || process.env.APP_PORT;
app.listen(port, () => console.log(`bot up @${port}`));
