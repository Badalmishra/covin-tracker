const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function Mailer(username,list) {

  
  return new Promise(async(resolve,reject)=>{
      try {
          
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "badalmishr7035@gmail.com", // generated ethereal user
              pass: "", // generated ethereal password
            },
          });
          let text = ''
          const dates = Object.keys(list)
          for (let index = 0; index < dates.length; index++) {
              const date = dates[index];
              text += `<h1><span style="color:red">${date}</span>:<small>${JSON.stringify(list[date])}</small></h1>`
          }
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: "otp@yot.com", // sender address
            to: username, // list of receivers
            subject: "Hello ✔", // Subject line
            text: text, // plain text body
            html: text, // html body
          });
        resolve(true)
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      } catch (error) {
          console.error("error in node mailer",error)
          reject(false)
      }
    })
}
module.exports = {
    Mailer:Mailer
}