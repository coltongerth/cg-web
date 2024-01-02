// Assuming Leaflet for maps and some UI library for controls
// async function addGeoJson() {
//     const response = await fetch("static/data/geo_data.json");
//     return data = await response.json();
//     // L.geoJson(data).addTo(map);
// }

// geoDf = addGeoJson();

// var year = 0

// // Function to update hoverover value for UI.
// function updateHtml(feature) {
//     let dataValue = layer.choroData[feature.properties.SOVEREIGNT] || 'No data';
//     if (typeof dataValue === 'number') {
//         dataValue = dataValue.toFixed(2);
//     }
//     countryLabel.textContent = `${feature.properties.SOVEREIGNT}: ${dataValue}°C`;
// }

// // Function to update Choropleth layer.
// function updateLayer(event) {
//     const newYear = event.target.value;
//     const newData = geoTotalYears[newYear] || {};
//     layer.choroData = newData;
//     globalLabel.textContent = `Global Mean Change: ${global_data[newYear]}°C`;
// }



// fetch('static/data/global_data.json')
//     .then((response) => response.json())
//     .then((json) => global_data = json);

// fetch('static/data/yearly_geojsons.json')
//         .then((response) => response.json())
//         .then((json) =>{ 




            // function getColor(d,y) {

    
            //     // d = Number(d)
            //     console.log(d)
            //     console.log(global_data[y])
            //     var result = '';
            //     if(d < global_data[y]){
            //         result = '#d73027';
            //     }
            //     else if(d = global_data[y]){
            //         result = '#fee090'
            //     }
            //     else if(d > global_data[y]){
            //         result = '#4575b4'
            //     }
                
            //     // switch(true){
            //     //     case(d < global_data[y]):
            //     //     result = '#d73027';
            //     //     break;
            //     //     case(d = global_data[y]):
            //     //     result = '#fee090';
            //     //     break;
            //     //     case(d > global_data[y]):
            //     //     result = '#4575b4';
            //     //     break;
            //     // }
            //     console.log(result)
            //     return  result
                        
            // }
            
            // function style(feature) {
            //     return {
            //         fillColor: getColor(feature.properties.yearly_temp,year),
            //         weight: 2,
            //         opacity: 1,
            //         color: 'white',
            //         dashArray: '3',
            //         fillOpacity: 0.7
            //     };
            // }
            
//             function initLayer(json,year){
            
                
                
                
//                 choropleth = L.geoJson(json[year], {style: style}).addTo(map);
//                 console.log(choropleth)
//                 console.log("i happened")
//             }
            
//             // console.log(geoTotalYears)
//             console.log(json[1961])
//             var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 maxZoom: 19,
//                 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             }).addTo(map);

//             // const geoJson = json
//             const initialYear = 1961;
//             year = initialYear
//             initLayer(json,year)

// const choroDataDict = geoTotalYears[initialYear];
// console.log(choroDataDict)

// Assuming Choropleth and other controls are available through some library
// const layer = new Choropleth({
//     geoData: geoJson,
//     choroData: choroDataDict,
//     // other layer options
// });



// Legend and label controls
// const globalLabel = document.createElement('div');
// globalLabel.textContent = `Global Mean Change: ${yearlyMeanDataTrimmedDict[initialYear]}°C`;
// const countryLabel = document.createElement('div');

// // Attach event listener to the layer
// layer.on('hover', updateHtml);

// // Slider widget
// const slider = document.createElement('input');
// slider.type = 'range';
// slider.value = initialYear;
// slider.min = Math.min(...Object.keys(geoTotalYears));
// slider.max = Math.max(...Object.keys(geoTotalYears));
// slider.step = 1;
// slider.addEventListener('input', updateLayer);

// // Add controls to the map
// m.addControl(/* appropriate control with globalLabel */);
// m.addControl(/* appropriate control with countryLabel */);
// m.addControl(/* appropriate control with slider */);

        // m.setView([latCent, lonCent]);
        // m.addLayer(layer);
        // Add other controls like legend
        // }
        // );


// Assuming you have defined global variables and functions like getColor and style

// Function to initialize or update the choropleth layer

var map = L.map('mapId').setView([37.8, -96], 4);
var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getColor(d,y) {

    var result = '';
    console.log(d)
    if(d == null){
        console.log("ping")
        result = '#000000';
    }
    else if(d <= 0.5 * global_data[y] ){
        result = '#2c7bb6';
    }
    else if(d > global_data[y] * 0.5 && d < global_data[y] * .75){
        result = '#abd9e9'
    }
    else if(d >= global_data[y] * .75 && d <= global_data[y] * 1.25){
        result = '#ffffbf'
    }
    else if(d > global_data[y] * 1.25 && d < 1.5 * global_data[y]){
        result = '#fdae61'
    }
    else if(d >= 1.5 * global_data[y]){
        result = '#d73027'
    }
    
    return  result
            
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (name,props) {
    if(props != undefined){
        if(props.yearly_temp != null ){
            this._div.innerHTML = '<h4>Countries Yearly Change in Temperature</h4>' +  (props ?
                '<b>' + name + '</b><br />' + props.yearly_temp.toFixed(2) + ' Δ°C '
                : 'Hover over a country');
        }
        else{
            this._div.innerHTML = '<h4>Countries Yearly Change in Temperature</h4>' +  (props ?
            '<b>'+ name +'</b><br />Data was not provided for this country': 'Hover over a country');
        }
    }
    
    
};

info.addTo(map);

function style(feature) {
    return {
        fillColor: getColor(feature.properties.yearly_temp,year),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function initOrUpdateLayer(json, newYear) {
    // Remove existing choropleth layer if it exists
    if (window.choropleth) {
        map.removeLayer(window.choropleth);
    }
    // Update the global year variable
    year = newYear;

    // Add new choropleth layer
    window.choropleth = L.geoJson(JSON.parse(json[newYear])["features"], { style: style, onEachFeature: onEachFeature }).addTo(map);
}

function highlightFeature(e) {
    var layer = e.target;
    console.log(layer)

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
    info.update(layer.feature.id,layer.feature.properties);
}

function resetHighlight(e) {
    window.choropleth.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
// Fetch global data and GeoJSON, then initialize the map
Promise.all([
    fetch('static/data/global_data.json').then(response => response.json()),
    fetch('static/data/refined_geodata.json').then(response => response.json())
]).then(([globalData, geoJson]) => {
    // console.log(geoJson)
    // console.log("here")
   

    window.global_data = globalData;  // Make sure this is accessible globally
    const initialYear = 1961;
    initOrUpdateLayer(geoJson, initialYear);

    // Initialize slider here if needed
    // slider.addEventListener('input', event => initOrUpdateLayer(geoJson, event.target.value));
});

document.getElementById("t-project").addEventListener("click",function(){
    setTimeout(function(){ map.invalidateSize()}, 500);
})