sendBug = function() {
  let title = document.getElementById('title').value;
  let type = document.getElementById('type').querySelector('input[name="type"]:checked').value;
  let category = document.getElementById('category').value;
  let description = document.getElementById('description').value;

  let data = {
    title: title,
    type: type,
    category: category,
    description: description
  };

  console.log(data);
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.open("POST", "/sendbug");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(data));
}
