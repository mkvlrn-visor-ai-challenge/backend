# mkvlrn-visor-ai-challenge | backend

## running locally

### requirements

- node 18 (developed with 18.14)
- yarn (developed with 1.22.19)
- a valid [openai api key](https://platform.openai.com/docs/api-reference/authentication)
- port 4000 open and usable

### envs

Copy `.env.example` into a new `.env` file and fill the `OPENAI_KEY` entry with your valid key.

### install deps

```bash
yarn install
```

### start dev mode

```bash
yarn dev
```

### using postman

You can send requests to the endpoint `http://localhost:4000/chat` using postman by sending a valid body with the following format:

```json
{
  "msg": "tell me 5 reasons why typescript is better than javascript",
  "chatId": "chat-1"
}
```

In here, `msg` is the prompt for the ChatGPT model and `chatId` is just an arbitrary id to keep track of conversations using the current account.

## what was used

- typescript
- [esm](https://nodejs.org/api/esm.html) (that's why node 18 is required)
- express.js
- cors
- chatgpt-official, [a library](https://github.com/PawanOsman/chatgpt-official) to create and request ChatGPT prompts - it has "official" in it's name, but it's not really; just uses the official openai lib under the hood.

## the code

It's a single endpoint to receive prompts (the frontend application takes care of managing chatId, only the message is required in it) and a redirect from the base url to the frontend deploy.

Not really fancy or envolved, but very functional.
