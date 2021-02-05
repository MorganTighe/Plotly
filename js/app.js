//Function to create the graphs and reading the data
function graphs(sample){
      d3.json("./data/samples.json").then (data => {
        console.log(data);
        var otu_ids = data.samples[0].otu_ids;
        console.log(`otu_ids: ${otu_ids}`);
    
        //Getting 10 otu_ids
        var otu_10 = data.samples[0].otu_ids.slice(0, 10).reverse();
        var otu_id = otu_10.map(d => "OTU " + d);
        console.log(`otu_id: ${otu_id}`);
    
        //Values for samples
        var Values = data.samples[0].sample_values.slice(0,10).reverse();
        console.log(`SampleValues: ${Values}`);
    
        //OTU labels
        var labels =  data.samples[0].labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`);
    
        //Code to run the Bar Chart
        var trace1 = {
          x: Values,
          y: otu_id,
          text: labels,
          type:"bar",
          orientation: "h",
        };
        var data1 = [trace1];
        var layout = {
          title: "Top 10 OTU",
          yaxis: {
              tickmode:"linear",
          },
          margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 50
          }
        };
        Plotly.newPlot("bar", data1, layout);
    
        //Code to create the bubble chart
        var trace2 = {
          x: data.samples[0].otu_ids,
          y: data.samples[0].sample_values,
          mode: "markers",
          marker: {
              size: data.samples[0].sample_values,
              color: data.samples[0].otu_ids
          },
          text: data.samples[0].labels
    
        };
        var data2 = [trace2];
        var layout2 = {
          title: "OTU Bubble chart",
          xaxis:{title: "OTU ID"},
          height: 500,
          width: 1000
        };
        Plotly.newPlot("bubble", data2, layout2); 
    
      });
    };
    
    
    //Demographic info
    function demoInfo(sample) {
      d3.json("./data/samples.json").then ((data => {
        console.log(data);
    
        //Metadata
        var metadata = data.metadata
        console.log(metadata)
    
        var demo = metadata.filter(item => item.id.toString() === sample)[0];    
        var demoinfo = d3.select("#sample-metadata") 

        Object.entries(demo).forEach(([key, value]) => {
          demoinfo.append("h5").text(`${key}: ${value}`);
        });
     }));
    }
    
    //Function for event change
    function optionChanged(sample) {
      graphs(sample);
      demo_Info(sample);
    };
    
    //Test subject id number 
    function init() {
      var select_id = d3.select("#selDataset") 
    
      d3.json("./data/samples.json").then (data => {
        console.log(data);
        var names = data.names
        console.log(`Names: ${names}`)
        names.forEach((name)=>{
        select_id.append("option").text(name).property("value", name);
        });
      })

      graphs(data.names[0]);
      demo_Info(data.names[0]); 
    };
    
    init();