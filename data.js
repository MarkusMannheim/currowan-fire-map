var d3 = require("d3"),
    fs = require("fs");

fs.readFile("majorIncidents.json", "utf8", function(error, data) {
  data = JSON.parse(data)
    .features;
  console.log(data.length);
  fires = data.filter(function(feature) { return feature.properties.title.includes("North Black Range") || feature.properties.title.includes("Currowan"); });
  fires.forEach(function(feature) {
    feature.properties = {
      name: feature.properties.title.includes("North Black") ? "North Black Range fire" : "Currowan fire",
      updated: feature.properties.description.slice(-17),
      size: +feature.properties.description.slice(feature.properties.description.search("SIZE:") + 6, feature.properties.description.search("SIZE:") + 11)
    };
    console.log(feature.properties);
  });
  fires = {
    type: "FeatureCollection",
    features: fires
  };

  fs.writeFile("fires.geojson", JSON.stringify(fires), function(error) {
    console.log("fires.geojson written");
  });
});
