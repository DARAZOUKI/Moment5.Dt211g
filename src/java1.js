"use strict"
async function fetchAndDisplayMap() {
    const locationInput = document.getElementById('locationInput').value;
    const coordinates = await fetchCoordinates(locationInput);

    if (coordinates) {
        const mapContainer = document.getElementById('mapContainer');
        mapContainer.innerHTML = `<iframe width="600" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon - 1}%2C${coordinates.lat - 1}%2C${coordinates.lon + 1}%2C${coordinates.lat + 1}&amp;layer=mapnik&amp;marker=${coordinates.lat}%2C${coordinates.lon}" style="border: 1px solid black"></iframe>`;
    } else {
        alert('Could not fetch coordinates. Please try again.');
    }
}

async function fetchCoordinates(location) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
        const data = await response.json();

        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        } else {
            console.error('No coordinates found for the specified location.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}
