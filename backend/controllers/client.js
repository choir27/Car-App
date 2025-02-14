const {google} = require("googleapis");
const nodemailer = require("nodemailer");

module.exports = {
    sendEmail: async (req, res) =>{
        try{
            const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
            oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

            const accessToken = await oAuth2Client.getAccessToken();

            const transport = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type: "OAuth2",
                    user: "richardchoi54@gmail.com",
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            const mailOptions = {
                from: "Richard Choi <richardchoi54@gmail.com>",
                to: req.body.email,
                subject: `${req.body.service} on your ${req.body.carYear} ${req.body.carMake} ${req.body.carModel} is ready for pick up!`,
                text:  `${req.body.service} on your ${req.body.carYear} ${req.body.carMake} ${req.body.carModel} is ready for pick up!`,
                html: `<h1>${req.body.service} on your ${req.body.carYear} ${req.body.carMake} ${req.body.carModel} is ready for pick up!</h1><br><br><h4>FAK-ENU-9999</h4><br><h4>fake_email@fakeEmailDomain.com</h4><br><h3>-AutoAligners</h3>`
            }
            
            const result = await transport.sendMail(mailOptions)

            res.status(500).send("Message sent: " + result);

        }catch(err){
            console.error(err);
            res.status(500).send(err);
        }
    },
}