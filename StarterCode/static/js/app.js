//Data Source
jsonfile = 'samples.json'

// Promise Pending
const dataPromise = d3.json(jsonfile);
console.log("Data Promise: ", dataPromise);

//create funtion to hold dropdown value
// Submit Button handler
function optionChanged(n) {
  // Prevent the page from refreshing
  //d3.event.preventDefault();
  document.getElementById("sample-metadata").innerHTML = "";
  buildCharts(n)

  // Select the input value from the form
 // var selectedid = d3.select("#selDataset").node().value;
 // console.log(selectedid);

  // Build the plot with the new stock
  //d3.selectAll("id").node();
}

//function to populate dropdown
function init() {
  var dropdownmenu = d3.select("#selDataset")
  buildCharts(940)
  d3.json(jsonfile).then((data) => {
    var names = data.names
    names.forEach((n) => {
     // console.log(n)
      dropdownmenu
        .append("option")
        .text(n)
        .property("value",n)
    })

  })
}
init()


//create function that will grab data and build charts
function buildCharts(sample) {
  d3.json(jsonfile).then((data) => {

    // Grab values from the data json object to build the plots
    var names = data.names;
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample)[0];
    var otu_ids = resultArray.otu_ids;
    var otu_labels = resultArray.otu_labels;
    var sample_values = resultArray.sample_values;
    var metadata = data.metadata.filter(sampleObj => sampleObj.id == sample)[0];
   // var sortedsample_values = data.sort(
    //  (a, b) => b.sample_values - a.sample_values
   // );
    console.log(names);
    console.log(samples);
    console.log(resultArray);
    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);
    console.log(metadata);

    //build demographic info
    var dropdownmenu = d3.select("#sample-metadata")
    Object.entries(metadata).forEach(([key,value]) => {
     // console.log(n)
      dropdownmenu
        .append("ul")
        .text(`${key}: ${value}`)
    })
    //bar chart
    var trace = {
      x: sample_values,
      y: otu_ids,
      text: otu_labels,
      orientation: 'h',
      type: "bar"
    };
    
    var data = [trace];
    
    var layout = {
      title: "OTUs",
      xaxis: {title: "Sample Values"},
      yaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bar", data, layout);

    //bubble chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);

    //gauge
    

  });

  
}
