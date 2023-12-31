var map = L.map('mapId').setView([37.8, -96], 4);
var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getColor(d,y) {

    var result = '';
    if(d == null){
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
var global_temp = L.control();

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


global_temp.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
global_temp.update = function (year,props) {
    if(props != undefined){
        if(props != null ){
            this._div.innerHTML = '<h4>Global Average</h4>' +  (
                '<b>' + year + '</b><br />' + props + ' Δ°C '
                );
        }
    
    }
    
    
};

global_temp.addTo(map);
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

function updateMap(value) {
    initOrUpdateLayer(window.geo_json, value)
}

var slider = document.getElementById('slider');
slider.addEventListener('input', function() {
    updateMap(this.value);
    global_temp.update(this.value,window.global_data[this.value])
});

function initOrUpdateLayer(json, newYear) {
    // Remove existing choropleth layer if it exists
    if (window.choropleth) {
        map.removeLayer(window.choropleth);
    }
    year = newYear;

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

    window.global_data = globalData;  // Make sure this is accessible globally
    window.geo_json = geoJson;
    const initialYear = 1961;
    initOrUpdateLayer(window.geo_json, initialYear);
    global_temp.update(initialYear,window.global_data[initialYear])
});

document.getElementById("t-project").addEventListener("click",function(){
    setTimeout(function(){ map.invalidateSize()}, 500);
})