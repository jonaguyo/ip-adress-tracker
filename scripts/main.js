let ipifyKey = 'at_r8aldhC3xuPElC316XF8TjjBV6l2O';
let leafletKey = 'pk.eyJ1IjoiYXJhbWluZXQiLCJhIjoiY2trODlteDlrMDV0bjJ2cTh1bjRsZm13eSJ9.6WhlUeHsibF_pfqLGxmAAA';
let ipifyUrl = 'https://geo.ipify.org/api/v1?apiKey=' + ipifyKey + '&ipAddress=';

let map = L.map('map').setView([48.85875893258228, 2.348786807381395], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: leafletKey
}).addTo(map);

document.getElementById("search-button").addEventListener('click', searchIp);

function searchIp() {
    let ip = document.getElementById("search-field").value;
    let request = new XMLHttpRequest();
    request.open('GET', ipifyUrl + ip);
    request.send();
    request.onload = (e) => {
        let response = JSON.parse(request.responseText);
        document.getElementById('ip').innerText = response['ip'];
        let lat = response['location'].lat;
        let lng = response['location'].lng;
        map.flyTo(new L.LatLng(lat, lng), 18);
    }
}