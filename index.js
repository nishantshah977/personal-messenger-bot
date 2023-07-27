import pkg from "messenger-api.js";
const { Client, Events } = pkg;
import { Bard } from "googlebard";
import express from 'express';
import axios from 'axios';

const cookies = "__Secure-1PSID=Your_Bard_Cookie";
const bot = new Bard(cookies);

const credentials = your_facebook_fbState_credentials;

const client = new Client({online:true});

// Event handlers and bot logic
client.on(Events.Ready, bot => {
  console.log(`Logged as ${bot.user.username}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.isClientUser) return;

const lowercasedMessage = message.content.toLowerCase();

  
  // Bard
const checkfor = ["what", "how", "explain", "why", "define", "tell", "when", "where", "find"];
  
if (checkfor.some(keyword => lowercasedMessage.includes(keyword))){ 
    try {
      const response = await bot.ask(message.content);
      message.thread.send("𝘽𝙤𝙩 𝘼𝙣𝙨𝙬𝙚𝙧 🤖🤖 : \n\n"+ response);
    } catch (error) {
      console.error("Error while asking the bot:", error);
      message.thread.send("𝘽𝙤𝙩 𝘼𝙣𝙨𝙬𝙚𝙧 🤖🤖 : \n\n Oops, something went wrong while processing your request.");
    }
    return 0;
  }

// Custom message
const greetings = ["hi", "hey", "hello", "oi", "oe", "oii", "hlo", "suna na", ""];
  
  if (greetings.includes(lowercasedMessage)) {
    message.thread.send("𝘽𝙤𝙩 𝘼𝙣𝙨𝙬𝙚𝙧 🤖🤖 : \n\n Hey there, Nishant will get back to you soon. Currently busy in exam. This is auto-reply from bot made by 𝐧𝐢𝐬_𝐡𝐚𝐧𝐭𝐬𝐡𝐚𝐡. \n___________________________________\n\n Ask me questions starting with 'What' ,'Explain','Why','How','Where','Tell', and 'When'");

    return 0;
  }

  //Joke
  if(message.content.toLowerCase() === "/joke"){
   async function sendJoke(){
    const jokeFunc = await getRandomJoke();
    const joke = `Joke: \n\n\n => ${jokeFunc.setup} \n \n =>  ${jokeFunc.punchline} `;
    message.thread.send(joke);
    }
    sendJoke();
    return 0;
  }

      // Emoji
/*
  const emojiRegex = /[\p{Emoji_Modifier_Base}\p{Emoji_Presentation}\uFE0F]/gu;

  if(message.content.match(emojiRegex)){
    const emojisFound = message.content.match(emojiRegex);

   message.thread.send("𝘽𝙤𝙩 𝘼𝙣𝙨𝙬𝙚𝙧 🤖🤖 : \n\n"+emojisFound);
    
  }
  */
  
});

async function startBot() {
  try {
    await client.login(credentials);
    console.log("Bot logged in successfully!");

    const app = express();

    app.listen(443, () => {
      console.log("Server is running on port 3000");
    });

    app.get('/', (req, res) => {
      res.send("Okay it works");
    });
  } catch (err) {
    console.error("Error occurred during login:", err);
  }
}

// Function for joke
async function getRandomJoke() {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch a random joke");
  }
}


// Function to restart the bot in case of error
function restartBot() {
  console.log("Restarting bot...");
  startBot().catch(restartBot);
}

// Start the bot initially
startBot().catch(restartBot);                 
