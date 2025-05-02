const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = (otpvalue, email) => {
  return {
    to: email,
    subject: "Password Reset Verification Code",
    html: ` <html>
   <head>
  <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
      }
      .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .header {
          background-color: #007BFF;
          color: #fff;
          text-align: center;
          padding: 20px;
      }

      .header h1 {
          font-size: 24px;
      }

      .content {
          padding: 20px;
      }

      .content p {
          font-size: 16px;
      }

      .otp-code {
          font-size: 28px;
          text-align: center;
          padding: 10px;
          background-color: #007BFF;
          color: #fff;
          border-radius: 5px;
      }

      .footer {
          text-align: center;
          margin-top: 20px;
      }

      .footer p {
          font-size: 14px;
      }
  </style>
</head>
<body>
  <div class="container">
      <div class="header">
          <h1>OTP Verification</h1>
      </div>
      <div class="content">
          <p>Dear User,</p>
          <p>Your OTP code for verification is:</p>
          <div class="otp-code">${otpvalue}</div>
      </div>
      <div class="footer">
          <p>This is an automated message, please do not reply.</p>
      </div>
  </div>
</body>
</html>
`,
  };
};

const createAdmin = (email, uniqueUrl) => {
  return {
    to: email,
    subject: "Complete Your Root Admin Registration",
    html: `
            <p>Please use the link below to complete your registration.</p>
            <p><a href="${uniqueUrl}">Click this link to complete your registration</a></p>
            <p>The link will expire after 24 hours.</p>
        `,
  };
};

const roadConditionAlert = (email, clusterCoordinates) => {
    const formattedCoords = clusterCoordinates.map(
      (point, index) =>
        `<li><strong>Location ${index + 1}:</strong> Latitude: ${point.latitude}, Longitude: ${point.longitude}</li>`
    ).join('');
    return {
      to: email,
      subject: "🚨 Road Condition Alert - Hazard Detected",
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
              .container { max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
              h2 { color: #d9534f; }
              ul { padding-left: 20px; }
              li { margin-bottom: 8px; }
              .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>🚧 Potential Road Hazard Detected</h2>
              <p>Dear Team,</p>
              <p>We have detected poor road conditions in the following cluster of locations:</p>
              <ul>${formattedCoords}</ul>
              <p>Please investigate and take necessary actions.</p>
              <div class="footer">
                <p>This is an automated message. Do not reply directly to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  };

module.exports = { transporter, mailOptions, createAdmin ,roadConditionAlert};
