Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

Handlebars.registerHelper("formatDate", function(data) {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };
  return new Date(data).toLocaleString("de-DE", options); //ES6
});

Handlebars.registerHelper("mapRelevance", function(data) {
  var relevanceTypes = {
    1: "Wenn nid hüt, de morn...",
    2: "Mal luege",
    3: "Jo cha me mache",
    4: "Ab geht die Luzi!",
    5: "AYAYAYAYAY!!!"
  };
  return relevanceTypes[data];
});
