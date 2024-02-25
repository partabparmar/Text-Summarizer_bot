const express = require('express');

const OPENAI_API_KEY = "Your api"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const cors = require('cors')



const app = express();
app.use(cors());

app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({
        message: "pong",
    });

});

app.post('/chat', (req, res) => {
    const question = req.body.question;
    openai
.createCompletion({
 model: "text-davinci-003",
 prompt: question,
 temperature: 0,
 max_tokens: 4000,
})
.then((response) =>{
    console.log({response});

    return response?.data?.choices?.[0]?.text;
})
.then((answer) =>{
    console.log({ answer });
    const array =  answer?.split("\n").filter((value) => value).map(value => value.trim());
  return array;
})
.then((answer) =>{
  res.json({
    answer: answer,
    propt: question,
  });
});
    console.log({ question });
    
});

app.listen(3000, ()=>{
    console.log('listening on port 3000')
});
