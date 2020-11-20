const nodemailer = require('nodemailer');

exports.mailService = (to,nama,token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:'465',
    auth: {
      user: 'aliwildan12@gmail.com',
      pass: '@intermilan' // naturally, replace both with your real credentials or an application-specific password
    },
    // debug: true, // show debug output
    // logger: true // log information in console
  });
  
  const mailOptions = {
    from: 'aliwildan12@gmail.com',
    to: to,
    subject: `Hello ${nama}`,
    text: `Your Email verification token ${token}`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.log(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.sendEmailNotification = async (to,name,text) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:'465',
    auth: {
      user: 'aliwildan12@gmail.com',
      pass: '@intermilan' // naturally, replace both with your real credentials or an application-specific password
    },
    // debug: true, // show debug output
    // logger: true // log information in console
  });
  const mailOptions = {
    from: 'aliwildan12@gmail.com',
    to: to,
    subject: `Hello ${name}`,
    text: text
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.log(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
