let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let wreck = require('wreck');
let sanitize = require('sanitize-html');

let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

app.post('/sendbug', function(req, res) {
  let payload = {
    Name: req.body.title,
    Description: formatDescription(req.body),
    Project: { Id: 140294 },
    Feature: getFeatureRef(req.body.category),
    Tags: req.body.type
  };

  console.log(payload);

  wreck.post(
    'https://daptiv.tpondemand.com/api/v1/Bugs',
    {
      headers: {
        'Authorization': 'Basic xxx',
        'Content-Type': 'application/json'
      },
      payload: payload
    },
    function() { }
  );

  res.json({});
});

function sanitizish(dirty) {
  return sanitize(dirty, {
    allowedTags: sanitize.defaults.allowedTags.concat([ 'img' ]),
    allowedSchemes: sanitize.defaults.allowedSchemes.concat([ 'data' ])
  });
}

function getFeatureRef(category) {
  switch (category) {
    case 'UI':
      return { Id: 140296 };
    case 'Other':
      return { Id: 140304 };
    default:
      throw new Error();
  }
}

function getScreenshotElem(dataUrl) {
  return `<img src="${dataUrl}" />`;
}

function formatDescription(body) {
  // let screenshotUrl = getScreenshotElem(body.screenshot);
  let descParts = [ body.url, body.description, /*screenshotUrl,*/ body.name];
  let rawString = descParts.join('\n\n');
  let midDesc = sanitizish(rawString)
    .replace(/\n/g, '</div><div>')
    .replace(/<div><\/div>/g, '<div>&nbsp;</div>');

  return '<div>' + midDesc + '</div>';
}

app.listen(3000);
