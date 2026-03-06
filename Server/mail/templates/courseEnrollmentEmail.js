exports.courseEnrollmentEmail = (courseName, name) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Course Enrollment</title>
</head>

<body style="margin:0;background:#f5f6fa;font-family:Arial">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" style="background:white;padding:30px;border-radius:10px">

<tr>
<td align="center">
<img src="https://i.ibb.co/7Xyj3PC/logo.png" width="160"/>
</td>
</tr>

<tr>
<td align="center" style="padding-top:20px">
<h2>🎉 Enrollment Successful</h2>
</td>
</tr>

<tr>
<td style="padding:10px 0;font-size:16px;color:#444">
Hello <b>${name}</b>,
</td>
</tr>

<tr>
<td style="font-size:15px;color:#555">
You have successfully enrolled in
<b style="color:#000">${courseName}</b>.
<br/><br/>
Start learning now and explore the course dashboard.
</td>
</tr>

<tr>
<td align="center" style="padding:30px">
<a href="https://studynotion-edtech-project.vercel.app/dashboard"
style="
background:#FFD60A;
padding:14px 28px;
text-decoration:none;
color:black;
font-weight:bold;
border-radius:6px;
display:inline-block">
🚀 Go To Dashboard
</a>
</td>
</tr>

<tr>
<td style="font-size:14px;color:#777">
Need help? Contact us at  
<a href="mailto:notionstudy08@gmail.com">
notionstudy08@gmail.com
</a>
</td>
</tr>

<tr>
<td align="center" style="padding-top:30px;font-size:12px;color:#aaa">
© StudyNotion Learning Platform
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
