"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log('De website is ingeladen')
    document.getElementById('fetchData').addEventListener('click', fetchIp);
}

async function fetchIp() {
    try{
        let response = await fetch("https://api.ipify.org/?format=json");
        let data = await response.json();
        displayIp(data);
        fetchLocation(data.ip)
    }
    catch(error){
        console.log('Fout bij het ophalen van de IP', error);
    }
}

async function fetchLocation(ip) {
    try {
        let response = await fetch(`https://ipinfo.io/${ip}/geo`);
        let data = await response.json();
        displayLocation(data);
        fetchCoordinates(data.city, data.region);
    } catch (error) {
        console.error("Fout bij het ophalen van de locatiegegevens:", error);
    }
}

async function fetchCoordinates(city, region) {
    try {
        let response = await fetch(`https://nominatim.openstreetmap.org/search?
q=${city},${region}&format=json`);
        let data = await response.json();
        if (data.length === 0) throw new Error("Geen coördinaten gevonden");
        let lat = data[0].lat;
        let lon = data[0].lon;
        displayCoordinates(lat, lon);
        //fetchWeather(lat, lon)//
    } catch (error) {
        console.error("Fout bij het ophalen van de coördinaten:", error);
    }
}
/*
async function fetchWeather(lat, lon) {
    try{
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,rain&forecast_days=1`)
        let data = await response.json();
        let temperature = data.current.temperature_2m
        if (data.length ===0) throw new Error('Geen informatie beschikbaar')
        let wind = data.current.wind_speed_10m
        let rain = data.current.rain
        displayWeather(lat, lon)
    } catch(error){
        console.error('Fout bij het ophalen van het weer', error);
    }
}
*/
function displayIp(data){
    const container = document.querySelector("#IPcontainer");
    container.innerHTML = 'IP : ' + data.ip;
}

function displayLocation(data){
    const container = document.querySelector("#LOCcontainer");
    container.innerHTML = 'Location : ' + data.loc;
}

function displayCoordinates(lat, lon) {
    const container = document.querySelector("#Coordinates");
    container.innerHTML = 'Coordinates : ' + lat + ' , ' + lon;
}
/*
function displayWeather(lat, lon) {
    const container = document.querySelector("#Weather");
    container.innerHTML = 'Coordinates : ' + temperature + ' , ' + wind + ' , ' + rain;
}
*/
