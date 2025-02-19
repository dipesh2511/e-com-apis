export const generateOtpHtml = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password OTP</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f7fa;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 90%;
          max-width: 480px;
          margin: 30px auto;
          background-color: #ffffff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .header h2 {
          color: #007bff;
          margin-bottom: 10px;
        }
        .message {
          font-size: 16px;
          color: #555;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .otp-box {
          display: inline-block;
          font-size: 26px;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(135deg, #007bff, #0056b3);
          padding: 14px 25px;
          border-radius: 10px;
          margin: 15px 0;
          letter-spacing: 3px;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        }
        .note {
          font-size: 14px;
          color: #666;
          margin: 15px 0;
        }
        .button {
          display: inline-block;
          padding: 14px 28px;
          background: linear-gradient(135deg, #28a745, #218838);
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          font-weight: bold;
          border-radius: 50px;
          margin-top: 20px;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
          text-transform: uppercase;
        }
        .button:hover {
          background: linear-gradient(135deg, #218838, #1e7e34);
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(40, 167, 69, 0.4);
        }
        .footer {
          font-size: 12px;
          color: #777;
          margin-top: 20px;
          border-top: 1px solid #ddd;
          padding-top: 15px;
        }

        /* Mobile adjustments */
        @media screen and (max-width: 500px) {
          .container {
            padding: 20px;
          }
          .otp-box {
            font-size: 22px;
            padding: 12px 20px;
          }
          .button {
            width: 100%;
            text-align: center;
            padding: 14px 0;
            border-radius: 8px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Password Reset Request</h2>
        </div>
        <p class="message">You requested to reset your password. Please use the OTP below to proceed.</p>
        <div class="otp-box">${otp}</div>
        <p class="note">This OTP is valid for 1 minute. If you did not request this change, please ignore this email.</p>
        <a href="#" class="button">Reset Password</a>
        <div class="footer">
          <p>If you need any help, feel free to contact our support team.</p>
          <p>&copy; 2025 Dipesh Info-Tech. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
