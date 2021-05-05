const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const Mailer = require("./lib/Mailer");
const { findForNDays } = require("./lib/Helpers");
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

app.get("/:mailId/:pincode", async function (req, res) {
  const { mailId, pincode } = req.params;
  setInterval(async()=>{
      console.log("pincode: ", pincode);
      console.log("mailId: ", mailId);
      const {response, shouldSendMail} = await findForNDays({numberOfDays:10,pincode})
      if (shouldSendMail) {
          Mailer.Mailer(mailId,response)
      }
      console.log('response: ', response);
  },30000)
  res.send({ pincode });
});
const PORT = 5500;
app.timeout = 864000000;
app.listen(PORT, () => console.log(`Port listening at: ${PORT}`));