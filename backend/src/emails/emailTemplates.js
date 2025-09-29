export function welcomeEmailTemplate(name, clientURL) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Chat App</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
    <!-- HEADER -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" 
      style="background:linear-gradient(90deg,rgba(242,92,84,1) 0%,rgba(247,178,103,1) 100%);height:40vh;">
      <tr>
        <td align="center" valign="middle" style="padding:40px 0;">
          <!-- Logo -->
          <table role="presentation" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" valign="middle" style="background-color:#ffffff;width:80px;height:80px;border-radius:50%;">
                <img src="https://cdn-icons-png.freepik.com/256/9149/9149357.png" alt="Chat App" width="60" style="display:block;max-width:90px;">
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:10px;">
                <h1 style="font-weight:bold;font-size:2rem;color:#ffffff;margin:0;">Welcome to Chat App</h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CONTENT -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:0 20px;">
          <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" 
            style="max-width:800px;background-color:#fdfdfd;border:1px solid #ddd;border-radius:20px;margin-top:-60px;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding:40px 20px;">
                <p style="font-size:24px;font-weight:bold;margin:0 0 10px;">Hello ${name},</p>
                <span style="display:block;margin-bottom:30px;font-weight:600;font-size:1rem;line-height:1.4;">
                  Let's create many interesting conversations with your friends in here.
                </span>
                <a href="${clientURL}" 
                   style="display:inline-block;padding:12px 24px;border-radius:10px;background-color:#f7b267;
                          color:#f25c54;font-size:20px;font-weight:bold;text-decoration:none;">
                  Let's start
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
