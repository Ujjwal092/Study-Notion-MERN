exports.contactReply = (name) => {
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
<h2>📩 Message Received</h2>
</td>
</tr>

<tr>
<td style="font-size:16px;color:#444">

Hello <b>${name}</b>,

</td>
</tr>

<tr>
<td style="font-size:15px;color:#555;padding-top:10px">

Thanks for contacting StudyNotion.

Our support team will get back to you shortly.

</td>
</tr>

<tr>
<td align="center" style="padding:30px">

<a
href="https://studynotion-edtech-project.vercel.app"

style="
background:#FFD60A;
padding:14px 28px;
border-radius:6px;
color:black;
text-decoration:none;
font-weight:bold">

Visit Website

</a>

</td>
</tr>

<tr>
<td align="center" style="font-size:12px;color:#aaa">

© StudyNotion Support Team

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
