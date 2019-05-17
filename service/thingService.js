function log1() {
  console.log('log1');
};
function log2() {
  console.log('log2');
};

function saveThing(thing) {
  //localStorage.setItem("thing", thing.value);
  //localStorage.setItem("description", description.value);
  //console.log('Thing: ' + localStorage.getItem("thing") + ' Description: ' + localStorage.getItem("description"));
  console.log(thing.value);
};

export { log1, log2, saveThing};