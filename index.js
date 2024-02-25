const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const OPENAI_API_KEY =;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

app.post('/chat', (req, res) => {
  const question = req.body.question;
  openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo-16k-0613',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question },
      ],
    })
    .then((response) => {
      const answer = response?.data?.choices?.[0]?.message?.content;
      console.log({ answer });

      const array = answer?.split('\n').filter((value) => value).map((value) => value.trim());
      res.json({
        answer: array,
        prompt: question,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
