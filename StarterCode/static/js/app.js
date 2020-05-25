//Load data
jsonfile = 'samples.json'
// Fetch the JSON data and console log it
d3.json(jsonfile).then(function(data) {
    console.log(data);
  });
  
  // Promise Pending
  const dataPromise = d3.json(jsonfile);
  console.log("Data Promise: ", dataPromise);