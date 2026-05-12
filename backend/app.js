const express = require("express") //import express
const cors= require("cors")
const nodemailer= require("nodemailer")

const app = express() // create our server

// lets server understand json data sent from forms
app.use(express.json())
app.use(cors()) //allow frontend to talk to backend

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kritikaneupane58@gmail.com",
        pass: "egin svfc blxj nxep"
    }
})

app.post("/contact",(req,res) => {
    const name = req.body.name // get name from forms
    const email = req.body.email
    const message = req.body.message

    const mailOptions = {
    from: '"Portfolio Website" <kritikaneupane58@gmail.com>',  
    to: "kritikaneupane58@gmail.com",  
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