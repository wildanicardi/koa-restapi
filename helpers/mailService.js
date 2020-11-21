const nodemailer = require('nodemailer');

exports.mailService = (to,nama,token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:'465',
    auth: {
      type: 'OAuth2',
      user: 'farhanahgatneh29@gmail.com',
      accessToken: 'ya29.a0AfH6SMD_pLZATkSnTgJIrvZfylrqHOvlkspf-vRNLWW4877tQ2Hv_7L-8OUfMBDk1yfokrNniHoeZz3Eade40NPCmQKeLNEoRY0B_vpL4IZ5Kq1DQ5wTBjRZozWPC_lA6OvLOl8hfvUq_-EN6L0egYMOyL36Mn0TJSinqHDwODs'
    },
    // debug: true, // show debug output
    // logger: true // log information in console
  });
  
  const mailOptions = {
    from: 'farhanahgatneh29@gmail.com',
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
      type: 'OAuth2',
      user: 'farhanahgatneh29@gmail.com',
      accessToken: 'ya29.a0AfH6SMD_pLZATkSnTgJIrvZfylrqHOvlkspf-vRNLWW4877tQ2Hv_7L-8OUfMBDk1yfokrNniHoeZz3Eade40NPCmQKeLNEoRY0B_vpL4IZ5Kq1DQ5wTBjRZozWPC_lA6OvLOl8hfvUq_-EN6L0egYMOyL36Mn0TJSinqHDwODs'
    },
    // debug: true, // show debug output
    // logger: true // log information in console
  });
  const mailOptions = {
    from: 'farhanahgatneh29@gmail.com',
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
