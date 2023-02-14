import ChatGPT from 'chatgpt-official';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';

// load env variables
const { parsed } = config();

const app = express();
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost', parsed!.ALLOWED_CLIENT] }));

const bot = new ChatGPT(parsed!.OPENAI_KEY, {
  model: 'text-davinci-003',
  max_tokens: 1024,
  temperature: 1,
  top_p: 1.0,
  frequency_penalty: 0.5,
  presence_penalty: 0.0,
});

app.post('/chat', async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const response = await bot.ask(body.msg, body.conversationId);
    return res.status(200).json({ success: true, message: response });
  } catch (err) {
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
});

const port = process.env.PORT || parsed!.APP_PORT;
app.listen(port, () => console.log(`bot up @${port}`));
