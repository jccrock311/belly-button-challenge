const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function init(){

    // initialize drop-down menu with sample values

    let selector = d3.select("#selDataset");
    d3.json(url).then((data) => {

        let sampleNames = data.names;

        // loop through "names" from data, add to selector

        for (let i = 0; i < sampleNames.length; i++){

            selector.append("option").text(sampleNames[i]).property("value", sampleNames[i]);

        };

        let firstSample = sampleNames[0];
        // buildCharts(firstSample);
        metaData(firstSample);

    });
};

// initialize dashboard
init();


function metaData(sample){
    d3.json(url).then((data) => {

        let metadata = data.metadata;
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        let demographicInfo = d3.select("#sample-metadata");

        demographicInfo.html("");

        for (key in result){
            demographicInfo.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        }
    });
}

function charts(){
    d3.json(url).then((data) => {

        let sample = data.samples;
       
    });
};

