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
        buildCharts(firstSample);
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


function buildCharts(sample){
    
    d3.json(url).then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        let otuIds = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;


        // build bar chart

        let barData = [{

                x: sampleValues.slice(0,10).reverse(),
                y: otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
                text: otuLabels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h",
        
        }];

        let barLayout = {
            title: "Top 10 Operational Taxonomic Units (OTUs)",
            xaxis: {title: "Sample Values"},
            margin : {t:40, l: 120}
        };

        Plotly.newPlot("bar", barData, barLayout);

    });
};

// new sample data from test subjects
function optionChanged(newSample) {
    
    buildCharts(newSample);
    metaData(newSample);

};
