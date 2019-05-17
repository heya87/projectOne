function loadThings() {
  let things = JSON.parse(localStorage.getItem("things"));
  things.forEach((element) => {
    console.log("Title: " + element.title + " Description: " + element.description); // 100, 200, 300
  });
  fillThings(things);
};

function fillThings(things) {
    let list = document.getElementById("things");
  things.forEach((element) => {
    console.log("Title: " + element.title + " Description: " + element.description); // 100, 200, 300
    let newItem = document.createElement('li');
    newText = document.createTextNode("Title: " + element.title + " Description: " + element.description);
    newItem.appendChild(newText);
    list.appendChild(newItem);
  });
};

loadThings();