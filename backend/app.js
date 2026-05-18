const express = require("express") //import express
const cors= require("cors")
const nodemailer= require("nodemailer")
const rateLimit = require("express-rate-limit")

require("dotenv").config()

const app = express() // create our server

app.set('trust proxy', 1) 

// lets server understand json data sent from forms
app.use(express.json())
app.use(cors()) //allow frontend to talk to backend

const contactLimiter = rateLimit({
    windowMs: 15*60*100,
    max: 5,
    message: "Too many messages sent. Please try again after 15 minutes."
})

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",      // gmail smtp server
    port: 587,                   // port 587 is allowed on Render
    secure: false,               // false for port 587
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
})

app.post("/contact",contactLimiter, (req,res) => {
    const name = req.body.name // get name from forms
    const email = req.body.email
    const message = req.body.message

    const mailOptions = {
    from: '"Portfolio Website" <kritikaneupane58@gmail.com>',  
    to: process.env.EMAIL,  
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` 
}


    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {   // if erroe has something in it = something went wrong
            console.log(error)
            res.send("Something went wrong!")
        }
        else{   // if error is empty = everything worked
            console.log("Email sent!")           // print in ubuntu terminal
            res.send("Message received!") 
        }
    })
})

// start server on port 3000
app.listen(3000,() => {
    console.log("Server running on port 3000")
})