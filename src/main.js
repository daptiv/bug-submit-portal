sendBug = function() {
  let title = document.getElementById('title').value;
  let category = document.getElementById('category').value;
  let url = document.getElementById('url').value;
  let type = document.getElementById('type').querySelector('input[name="type"]:checked').value;
  let description = document.getElementById('description').value;
  let screenshot = document.getElementById('screenshot-data').src;
  let name = document.getElementById('name').value;

  let data = {
    title: title,
    category: category,
    url: url,
    type: type,
    description: description,
    screenshot: screenshot,
    name: name
  };

  console.log(data);
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.open("POST", "/sendbug");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(data));
}

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('#screenshot').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

setInterval(previewFile, 500);
