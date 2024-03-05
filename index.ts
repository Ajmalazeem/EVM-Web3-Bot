import dotenv from 'dotenv';
// import TelegramBot from 'node-telegram-bot-api';
dotenv.config();
import express from "express";
import { startBot, handleGetEthereumPrice, handleConvertEthToUsd }  from "./bot";



const app = express();
app.use(express.json({limit: '50mb'}));   

const port = process.env.PORT || 3000;

app.get("/",(req,res) =>{
    res.status(200).json({
        status:true,
        msg:"EVM Trading Bot server is working...",
    })
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    startBot();
    handleGetEthereumPrice();
    handleConvertEthToUsd();
  } catch (error) {
    console.error('Error starting bot or handling operations:', error);
  }
});
