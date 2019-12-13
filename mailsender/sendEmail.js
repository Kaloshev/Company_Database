const nodemailer = require("nodemailer");

const sendEmail = () => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "testzamailgjorgji@gmail.com",
            pass: "123qwe!@#QWE"
        }
    });

    const mailOptions = {
        from: '"Gjorgji kaloshev" <testzamailgjorgji@gmail.com>',
        to: '"Gjorgji" <testzamailgjorgji@gmail.com>',
        subject: "Test Subject" + Date.now(),
        text: "Ova e proba za da vidime dali raboti mail senderot !!"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error Occurred");
            console.log(error.message);

        }
        console.log("Msg send successfully ");
        console.log(info);

    })
}

module.exports = {
    sendEmail
}