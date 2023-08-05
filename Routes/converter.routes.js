const express=require('express');
const { Configuration, OpenAIApi } = require('openai');
require("dotenv").config()
const codeRouter=express.Router()
const config = new Configuration({
    apiKey: `${process.env.API_KEY}`,
});
const openai = new OpenAIApi(config);
codeRouter.post("/converter",async(req,res)=>{
    const payload=req.body.payload;
    const language=req.body.language;
    const conversion=`Convert the code to ${language} \n ${payload} without any comment or explaination`
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: conversion,
            max_tokens: 2048,
            temperature: 1,
        });
        const textResponse = response.data.choices[0].text;
        res.send({textResponse})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


codeRouter.post("/debugging",async(req,res)=>{
    const payload=req.body.payload;
    const conversion=`Debug this ${payload} code for error with proper explainantion`
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: conversion,
            max_tokens: 2048,
            temperature: 1,
        });
        const textResponse = response.data.choices[0].text;
        let text=textResponse;
        res.send({text})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

codeRouter.post("/quality_check",async(req,res)=>{
    const payload=req.body.payload;
    const conversion=`Check this ${payload} code for proper code quality, if the code is correct then say 'the code is perfect' as tell us how to correct the code and debug it`
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: conversion,
            max_tokens: 2048,
            temperature: 1,
        });
        const textResponse = response.data.choices[0].text;
        let text=textResponse;
        res.send({text})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports={
    codeRouter
}