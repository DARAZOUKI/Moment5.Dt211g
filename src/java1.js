"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById('locationInput');
    const mapContainer = document.getElementById('mapContainer');

    locationInput.addEventListener('change', async function () {
        const location = locationInput.value;
        try {
            const coordinates = await fetchCoordinates(location);
            if (coordinates) {
                displayMap(coordinates);
            } else {
                alert('Could not fetch coordinates. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

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
            throw error; // Propagate the error to the caller
        }
    }

    function displayMap(coordinates) {
        mapContainer.innerHTML = `<iframe width="600" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon - 1}%2C${coordinates.lat - 1}%2C${coordinates.lon + 1}%2C${coordinates.lat + 1}&amp;layer=mapnik&amp;marker=${coordinates.lat}%2C${coordinates.lon}" style="border: 1px solid black"></iframe>`;
    }
});
