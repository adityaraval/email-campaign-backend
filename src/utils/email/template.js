const handlebars = require('handlebars');

const source = `<!doctype html>
<html>
<body style="margin: 0; padding: 0; background: #f0f0f0; font-size: 16px; font-family: Arial, sans-serif;">
  <!-- gmail doesn't support the style tag hence all the inline styles -->
  <div id="wrapper">
    <div style="background: #ffffff" id="heading">
      <p style="margin: 0;" >Dear {{customName}},</p>
      <p style="margin-top: 10px; margin-bottom: 0; line-height: 1.4em;">
        {{body}}
      </p>
      <p style="margin-top: 10px; margin-bottom: 0; line-height: 1.4em;">
      Please use this link to
      <a style="color: #185bec; font-weight: 600;" href={{unsubscribeUrl}}>unsubscribe</a> from this campaign.
      </p>
      <br/>
      <p style="margin-top: 10px; margin-bottom: 0; line-height: 1.4em;">
          Kind regards <br/>
          Aditya,
      </p>
    </div>
  </div>
</body>
</html>`;

const templateSource = handlebars.compile(source);

module.exports = templateSource;
