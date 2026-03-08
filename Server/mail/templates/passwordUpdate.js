exports.passwordUpdated = (email, name) => {
  return `

<!DOCTYPE html>
<html>
<body style="margin:0;background:#f4f6fb;font-family:Arial">

<table width="100%">
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
<td align="center">
<h2>Password Updated</h2>
</td>
</tr>

<tr>
<td style="font-size:16px;color:#444">

Hello <b>${name}</b>,

</td>
</tr>

<tr>
<td style="font-size:15px;color:#555;padding-top:10px">

Your password has been successfully updated for

<b>${email}</b>.

</td>
</tr>

<tr>
<td style="font-size:14px;color:#777;padding-top:20px">

If you did not request this change please contact support immediately.

</td>
</tr>

<tr>
<td align="center" style="padding-top:30px;font-size:12px;color:#aaa">

StudyNotion Security Team

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
