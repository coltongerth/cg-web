// Assuming Leaflet for maps and some UI library for controls
async function addGeoJson() {
    const response = await fetch("static/data/geo_data.json");
    return data = await response.json();
    // L.geoJson(data).addTo(map);
}

// geoDf = addGeoJson();


// Function to update hoverover value for UI.
function updateHtml(feature) {
    let dataValue = layer.choroData[feature.properties.SOVEREIGNT] || 'No data';
    if (typeof dataValue === 'number') {
        dataValue = dataValue.toFixed(2);
    }
    countryLabel.textContent = `${feature.properties.SOVEREIGNT}: ${dataValue}°C`;
}

// Function to update Choropleth layer.
function updateLayer(event) {
    const newYear = event.target.value;
    const newData = geoTotalYears[newYear] || {};
    layer.choroData = newData;
    globalLabel.textContent = `Global Mean Change: ${yearlyMeanDataTrimmedDict[newYear]}°C`;
}

fetch('static/data/geo_data.json')
    .then((response) => response.json())
    .then((json) => geoTotalYears = json);

fetch('static/data/combined_geojson.json')
        .then((response) => response.json())
        .then((json) =>{ 

        // console.log(geoTotalYears)
        console.log(json)
        // geoDf = json
        // console.log(geoDf)
        var map = L.map('mapId').setView([37.8, -96], 4); // Assuming mapId is the id of your map element
        var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        // const lonCent = (geoDf.bounds.maxx + geoDf.bounds.minx) / 2;
        // const latCent = (geoDf.bounds.maxy + geoDf.bounds.miny) / 2;

        // const geoJson = json
        const initialYear = 1961;
        // const choroDataDict = geoTotalYears[initialYear];
        // console.log(choroDataDict)

        // Assuming Choropleth and other controls are available through some library
        // const layer = new Choropleth({
        //     geoData: geoJson,
        //     choroData: choroDataDict,
        //     // other layer options
        // });

        function getColor(d) {
            return d > 1000 ? '#800026' :
                   d > 500  ? '#BD0026' :
                   d > 200  ? '#E31A1C' :
                   d > 100  ? '#FC4E2A' :
                   d > 50   ? '#FD8D3C' :
                   d > 20   ? '#FEB24C' :
                   d > 10   ? '#FED976' :
                              '#FFEDA0';
        }

        function style(feature) {
            return {
                fillColor: getColor(feature.properties.dataValue),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

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
        L.geoJson(json, {style: style}).addTo(map);
        // m.setView([latCent, lonCent]);
        // m.addLayer(layer);
        // Add other controls like legend
        }
        );

// Initialization of the map

