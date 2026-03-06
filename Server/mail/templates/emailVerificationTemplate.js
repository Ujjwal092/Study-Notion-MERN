const otpTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f6fa;font-family:Arial">

<table width="100%">
<tr>
<td align="center">

<table width="600" style="background:white;padding:30px;border-radius:10px">

<tr>
<td align="center">
<img src="https://i.ibb.co/7Xyj3PC/logo.png" width="160"/>
</td>
</tr>

<tr>
<td align="center">
<h2>🔑 OTP Verification</h2>
</td>
</tr>

<tr>
<td style="font-size:15px;color:#555">
Use the OTP below to verify your account.
</td>
</tr>

<tr>
<td align="center" style="padding:30px">

<div style="
font-size:32px;
letter-spacing:8px;
font-weight:bold;
background:#FFD60A;
padding:15px 30px;
border-radius:8px;
display:inline-block">
${otp}
</div>

</td>
</tr>

<tr>
<td align="center" style="font-size:14px;color:#777">
⏳ OTP valid for 5 minutes
</td>
</tr>

<tr>
<td style="padding-top:20px;font-size:14px;color:#777">
If you didn't request this OTP please ignore this email.
</td>
</tr>

<tr>
<td align="center" style="padding-top:25px;font-size:12px;color:#aaa">
© StudyNotion Platform
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

module.exports = otpTemplate;
