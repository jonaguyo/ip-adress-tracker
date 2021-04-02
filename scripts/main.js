let ipifyKey = 'at_r8aldhC3xuPElC316XF8TjjBV6l2O';
let leafletKey = 'pk.eyJ1IjoiYXJhbWluZXQiLCJhIjoiY2trODlteDlrMDV0bjJ2cTh1bjRsZm13eSJ9.6WhlUeHsibF_pfqLGxmAAA';
let ipifyUrl = 'https://geo.ipify.org/api/v1?apiKey=' + ipifyKey + '&ipAddress=';

let map = L.map('map', {zoomControl: false}).setView([48.85875893258228, 2.348786807381395], 11);
let marker;

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: leafletKey
}).addTo(map);

searchIp();
document.getElementById("search-button").addEventListener('click', searchIp);
document.getElementById("search-field").addEventListener('keypress', handleEnter);

function handleEnter(event) {
    if(event.keyCode == 13) {
        event.preventDefault();
        searchIp();
    }
}

function searchIp() {
    let ip = document.getElementById("search-field").value;
    let request = new XMLHttpRequest();
    request.open('GET', ipifyUrl + ip);
    request.send();
    request.onload = (e) => {
        let response = JSON.parse(request.responseText);
        document.getElementById('ip').innerText = response['ip'];
        document.getElementById('location').innerText = 
            response['location'].city 
            + '\n' 
            + response['location'].postalCode
            + ', '
            + response['location'].country;
        document.getElementById('timezone').innerText = 'UTC' + response['location'].timezone;
        document.getElementById('isp').innerText = response['isp'];

        let lat = response['location'].lat;
        let lng = response['location'].lng;
        if(marker == null) {
            marker = L.marker([lat, lng]);
            marker.addTo(map);
        } else {
            marker.setLatLng([lat, lng]);
        }
        map.flyTo(new L.LatLng(lat, lng), 15, {duration: 2});
    }
}