exports.emailTemplate = (otp) => {
  return `

<!DOCTYPE html>
<html>
<body style="margin:0;background:#f4f6fb;font-family:Arial">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" style="background:white;border-radius:10px;padding:40px">

<tr>
<td align="center">

<img
src="https://raw.githubusercontent.com/Ujjwal092/Study-Notion-MERN/main/FrontEnd/src/assets/Logo/Logo-Full-Light.png"
width="160"
/>

</td>
</tr>

<tr>
<td align="center" style="padding-top:20px">
<h2>Account Verification</h2>
</td>
</tr>

<tr>
<td align="center" style="color:#555;font-size:15px">
Use the OTP below to verify your account
</td>
</tr>

<tr>
<td align="center" style="padding:35px">

<div style="
font-size:36px;
font-weight:bold;
letter-spacing:8px;
background:#FFD60A;
padding:16px 30px;
border-radius:8px;
display:inline-block">

${otp}

</div>

</td>
</tr>

<tr>
<td align="center" style="color:#777;font-size:14px">

OTP valid for 5 minutes

</td>
</tr>

<tr>
<td align="center" style="padding-top:30px;font-size:12px;color:#aaa">

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
