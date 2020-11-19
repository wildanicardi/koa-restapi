const mailgun = require("mailgun-js");
const DOMAIN = "sandboxbd0e64e4d9d04af7986b5fd854c387fa.mailgun.org";
const api_key = "3bc40d79cbb8f9e2b4a4ac7ef56f80e4-2af183ba-a40b1ab5";

exports.mailService = (to,nama,token) => {
  const mg = mailgun({apiKey: api_key, domain: DOMAIN});
  const data = {
    from: 'aliwildan99@gmail.com',
    to: to,
    subject: `Hello ${nama}`,
    text: `Your Email verification token ${token}`
  };
  mg.messages().send(data).then((result) => {
    console.log("mail",result);
  }).catch((err) => {
     console.log("error",err.message); 
  });
}
