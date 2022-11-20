import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const fs = require("fs");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb'
    }
  }
}


export default async (req, res) => {

 
  const { email, subject, html, name, 
    attachmentNameOne, attachmentBlobOne,
    attachmentNameTwo, attachmentBlobTwo,
    attachmentNameThree, attachmentBlobThree
    } = req.body


  // let msg = {
  //   to: [{email: email, name: name}],
  //   from: {email: 'incansuk@gmail.com', name:'Incans UK'},
  //   // cc: [{email: 'incansuk@gmail.com', name: 'Incans UK'}],
  //   content: [{type:'text/plain', value: message}],
  //   subject: subject,
  // };

    // contact@performanceartaward.ch
    let toEmail = 'contact@performanceartaward.ch'


  let msg = {
    // contact@performanceartaward.ch
    to: [{email: toEmail, name: 'Swiss Perfomance Art Award'}],
    from: {email: 'swisspaa@gmail.com', name:'Swiss Perfomance Art Award'},
    // content: [{type:'text/plain', value: message !== undefined ? message : " "}],
    html: html,
    subject: subject,
  };



  if(attachmentNameOne !== null && attachmentBlobOne !== null) {

    msg = {
      to: [{email: toEmail, name: 'Swiss Perfomance Art Award'}],
      from: {email: 'swisspaa@gmail.com', name:'Swiss Perfomance Art Award'},
      // content: [{type:'text/plain', value: message !== undefined ? message : " "}],
      html: html,
      subject: subject,
        attachments: [
          {
            // content: attachment,
            content: attachmentBlobOne,
            filename: attachmentNameOne,
            // type: "application/pdf",
            disposition: "attachment"
          }
        ]    
    };
  }

  if(
    attachmentNameOne !== null && 
    attachmentBlobOne !== null &&
    attachmentNameTwo !== null && 
    attachmentBlobTwo !== null
    ) {

    msg = {
      to: [{email: toEmail, name: 'Swiss Perfomance Art Award'}],
      from: {email: 'swisspaa@gmail.com', name:'Swiss Perfomance Art Award'},
      // content: [{type:'text/plain', value: message !== undefined ? message : " "}],
      html: html,
      subject: subject,
        attachments: [
          {
            // content: attachment,
            content: attachmentBlobOne,
            filename: attachmentNameOne,
            // type: "application/pdf",
            disposition: "attachment"
          },
          {
            // content: attachment,
            content: attachmentBlobTwo,
            filename: attachmentNameTwo,
            // type: "application/pdf",
            disposition: "attachment"
          }
        ]    
    };
  }

  if(
    attachmentNameOne !== null && 
    attachmentBlobOne !== null &&
    attachmentNameTwo !== null && 
    attachmentBlobTwo !== null &&
    attachmentNameThree !== null && 
    attachmentBlobThree !== null
    ) {

    msg = {
      to: [{email: toEmail, name: 'Swiss Perfomance Art Award'}],
      from: {email: 'swisspaa@gmail.com', name:'Swiss Perfomance Art Award'},
      // content: [{type:'text/plain', value: message !== undefined ? message : " "}],
      html: html,
      subject: subject,
        attachments: [
          {
            // content: attachment,
            content: attachmentBlobOne,
            filename: attachmentNameOne,
            // type: "application/pdf",
            disposition: "attachment"
          },
          {
            // content: attachment,
            content: attachmentBlobTwo,
            filename: attachmentNameTwo,
            // type: "application/pdf",
            disposition: "attachment"
          },
          {
            // content: attachment,
            content: attachmentBlobThree,
            filename: attachmentNameThree,
            // type: "application/pdf",
            disposition: "attachment"
          }
        ]    
    };
  }

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    // console.log(error.response.body.errors)
    res.status(500).json({ error: 'Error sending email' })
  }
}