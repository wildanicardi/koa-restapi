const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  "957486160821-pcgfioc073ki871ij12e2o3gtkpjgpn4.apps.googleusercontent.com", // ClientID
  "8a5DmMMQ2slvbF140DEpPNE6", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

exports.mailService = (to,nama,token) => {
  oauth2Client.setCredentials({
    refresh_token: "1//04hH3l2SUrl_qCgYIARAAGAQSNgF-L9IrY85Iafc8uuaZjqwgTzoriyg5sxbxMHdR_r9MtugsTUG3K9PGhvxyPxeEwVncDyitAQ"
  });
  const accessToken = oauth2Client.getAccessToken()
  const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
      type: 'OAuth2',
      user: 'farhanahgatneh29@gmail.com',
      accessToken: 'ya29.a0AfH6SMD_pLZATkSnTgJIrvZfylrqHOvlkspf-vRNLWW4877tQ2Hv_7L-8OUfMBDk1yfokrNniHoeZz3Eade40NPCmQKeLNEoRY0B_vpL4IZ5Kq1DQ5wTBjRZozWPC_lA6OvLOl8hfvUq_-EN6L0egYMOyL36Mn0TJSinqHDwODs',
      clientId: "957486160821-pcgfioc073ki871ij12e2o3gtkpjgpn4.apps.googleusercontent.com",
      clientSecret: "8a5DmMMQ2slvbF140DEpPNE6",
      refreshToken: "1//04hH3l2SUrl_qCgYIARAAGAQSNgF-L9IrY85Iafc8uuaZjqwgTzoriyg5sxbxMHdR_r9MtugsTUG3K9PGhvxyPxeEwVncDyitAQ",
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
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
