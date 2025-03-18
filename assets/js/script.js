"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#fetchIP").addEventListener("click", fetchData)

    console.log('De website is ingeladen.')
}

async function fetchData(){
    try{
        let response = await fetch('https://ipinfo.io/195.130.157.67/geo')
        let data = await response.json();
        displayIp(data);
        displayCity(data);
        displayRegion(data);
        displayCountry(data);
        displayLoc(data);
    } catch(error){
        console.log("Fout bij het ophalen van de API", error);
    }
}

function displayIp(data){
    const container = document.querySelector("#IPcontainer");
    container.innerHTML = 'IP : ' + data.ip;
}

function displayCity(data){
    const container = document.querySelector("#CITYcontainer");
    container.innerHTML = 'City : ' + data.city;
}

function displayRegion(data){
    const container = document.querySelector("#REGIONcontainer");
    container.innerHTML = 'Region : ' + data.region;
}

function displayCountry(data){
    const container = document.querySelector("#COUNTRYcontainer");
    container.innerHTML = 'Country : ' + data.country;
}

function displayLoc(data){
    const container = document.querySelector("#LOCcontainer");
    container.innerHTML = 'LOC : ' + data.loc;
}