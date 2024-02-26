// Import Chartist.js
import * as Chartist from 'chartist';


document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndGenerateCharts();
});

async function fetchDataAndGenerateCharts() {
    try {
        const response = await fetch('statistik_sokande.json');
        const data = await response.json();

        if (data) {
            const coursesData = getTopCourses(data, 6);
            const programsData = getTopPrograms(data, 5);

            createBarChart(coursesData);
            createPieChart(programsData);
        } else {
            console.error('Data not available.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createBarChart(coursesData) {
    const labels = coursesData.map(course => course.name);
    const series = [coursesData.map(course => parseInt(course.applicantsTotal))];

    new Chartist.Bar('.ct-bar-chart', {
        labels: labels,
        series: series
    }, {
        axisY: {
            onlyInteger: true
        }
    });
}

function createPieChart(programsData) {
    const labels = programsData.map(program => program.name);
    const series = programsData.map(program => parseInt(program.applicantsTotal));

    new Chartist.Pie('.ct-pie-chart', {
        labels: labels,
        series: series
    });
}
