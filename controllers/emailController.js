const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/adminModel.js');
const studentRequirements = require('../models/checklistModel.js');
const { request } = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')




async function main(recipient, body) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'flightcoordinator.yoke@gmail.com',
        pass: 'wnamljtnjzuulvva'
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <adilsaju@gmail.com>', // sender address
      to: `${recipient}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `${body}`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  
  // ******** admin decline ********
  const sentEmail = () => {
    return async (req, res, next) => {
      // const requestInfo = await Request.requestModel.findById(
      //   req.params.id
      // );
      let body1 = req.body.finalList
      body1 = {}
      body1=JSON.stringify(body1)
      //TODO: get final list

      const email = "flightcoordinator.yoke@gmail.com"
      try {
  
        main(email, body1).catch(console.error);
        res.json("sent successfull");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  
      next();
    }; //end of middleware
  }; //end of declineRequest
  
  
  const sentEmailStudentApproved = () => {
    return async (req, res, next) => {
      let studentId = req.body.studentId
      // let studentId = req.body.studentEmail

      const studentEmail = Student.studentModel.findById(studentId).select(email);

      try {
        body=`<b>Hello world?</b>`
        main(studentEmail, body).catch(console.error);
        res.json("sent successfull");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      next();
    }; //end of middleware
  }; //end of declineRequest


  const sentEmailStudentDeclined = () => {
    return async (req, res, next) => {

    }; //end of middleware
  }; //end of declineRequest



  module.exports = {

    sentEmail,
    sentEmailStudentApproved,
    sentEmailStudentDeclined,

  };
  