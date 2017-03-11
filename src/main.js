const queryString = require('query-string');

sendBug = function() {
  let title = document.getElementById('title').value;
  let category = document.getElementById('category').value;
  let importance = document.getElementById('importance').value;
  let url = document.getElementById('url').value;
  let type = document.getElementById('type').querySelector('input[name="type"]:checked').value;
  let description = document.getElementById('description').value;
  let screenshot = document.getElementById('screenshot-data').src;
  let name = document.getElementById('name').value;

  let data = {
    title: title,
    category: category,
    importance: importance,
    url: url,
    type: type,
    description: description,
    screenshot: screenshot,
    name: name
  };

  console.log(data);
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
      let q = '?type=' + type + '&title=' + title;
      document.location.assign('/thanks.html' + q);
    }
  };

  xmlhttp.open('POST', '/sendbug');
  xmlhttp.setRequestHeader('Content-Type', 'application/json');
  xmlhttp.send(JSON.stringify(data));
}

function previewFile() {
  let preview = document.querySelector('img');
  let file = document.querySelector('#screenshot').files[0];
  let reader = new FileReader();

  reader.addEventListener('load', function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
if (document.location.pathname === '/') {
  setInterval(previewFile, 500);
}

const bugText = '\nRepro Steps\n\nWhat you expected to see\n\nWhat you saw';
let shouldAppend = true;
appendBugText = function() {
  if (shouldAppend) {
    let descriptionElem = document.getElementById('description');
    descriptionElem.value = descriptionElem.value + bugText;
    shouldAppend = false;
  }
}
if (document.location.pathname === '/') {
  setInterval(function() { shouldAppend = true; }, 500);
}

function setupQueryData() {
  let q = queryString.parse(location.search);
  document.getElementById('type').innerHTML = q.type;
  document.getElementById('title').innerHTML = q.title;
}
if (document.location.pathname === '/thanks.html') {
  setupQueryData();
}
