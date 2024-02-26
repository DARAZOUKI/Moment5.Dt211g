

document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndGenerateCharts();
});

async function fetchDataAndGenerateCharts() {
    try {
        // Replace 'your_api_endpoint' with the actual API endpoint or file path
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
    const data = coursesData.map(course => parseInt(course.applicantsTotal));

    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Applicants',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust as needed
                borderColor: 'rgba(75, 192, 192, 1)', // Adjust as needed
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    onlyInteger: true
                }
            }
        }
    });
}

function createPieChart(programsData) {
    const labels = programsData.map(program => program.name);
    const data = programsData.map(program => parseInt(program.applicantsTotal));

    new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                    // Add more colors as needed
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                    // Add more colors as needed
                ],
                borderWidth: 1
            }]
        }
    });
}
// Placeholder function for getting top courses
function getTopCourses(data, limit) {
    // Assuming data is an array of courses with 'name' and 'applicantsTotal' properties
    return data
        .sort((a, b) => parseInt(b.applicantsTotal) - parseInt(a.applicantsTotal))
        .slice(0, limit);
}

// Placeholder function for getting top programs
function getTopPrograms(data, limit) {
    // Assuming data is an array of programs with 'name' and 'applicantsTotal' properties
    return data
        .sort((a, b) => parseInt(b.applicantsTotal) - parseInt(a.applicantsTotal))
        .slice(0, limit);
}

