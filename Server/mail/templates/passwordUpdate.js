exports.passwordUpdated = (email, name) => {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f6fa;font-family:Arial">

<table width="100%" align="center">
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
<h2>🔐 Password Updated</h2>
</td>
</tr>

<tr>
<td style="font-size:16px;color:#444">
Hello <b>${name}</b>,
</td>
</tr>

<tr>
<td style="font-size:15px;color:#555;padding-top:10px">
Your password has been successfully updated for:
<br/><br/>

<b>${email}</b>

<br/><br/>

If you did NOT request this change please contact support immediately.
</td>
</tr>

<tr>
<td style="padding-top:20px;font-size:14px;color:#777">
Support:
<a href="mailto:info@studynotion.com">
info@studynotion.com
</a>
</td>
</tr>

<tr>
<td align="center" style="padding-top:30px;font-size:12px;color:#aaa">
© StudyNotion Security Team
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
