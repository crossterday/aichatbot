import * as dotenv from "dotenv" ;
dotenv.config();

import express from "express" ;
import cors from "cors" ;
import OpenAI from "openai" ;

// console.log("API KEY: ", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors()) ;
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message: "Test run server",
    })
});

app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: `${prompt}`}],
            temperature: 0.7,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        
        const botReply = response.choices[0].message.content;

        res.status(200).send({
            bot: botReply,
        });

    } catch (error) {
        console.error(error) ;
        res.status(500).send({ error: error.message }) ;
    }
})

app.listen(5000, () => console.log("Server is running on port http://localhost:5000"));

