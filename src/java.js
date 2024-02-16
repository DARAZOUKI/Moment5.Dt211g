   "use strict"

document.addEventListener("DOMContentLoaded", function () {
    // Fetch data 
    const fetchData = async () => {
        try {
            const response = await fetch('statistik_sokande.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to create Bar Chart
    const createBarChart = (coursesData) => {
        const ctx = document.getElementById('barChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: coursesData.map(course => course.courseName),
                datasets: [{
                    label: 'Total Sökande',
                    data: coursesData.map(course => course.totalApplicants),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    // Function to create Pie Chart
    const createPieChart = (programsData) => {
        const ctx = document.getElementById('pieChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: programsData.map(program => program.programName),
                datasets: [{
                    data: programsData.map(program => program.totalApplicants),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            }
        });
    };

    // Fetch data and create charts
    fetchData().then(data => {
        const coursesData = data.coursesData; 
        const programsData = data.programsData;
        createBarChart(coursesData);
        createPieChart(programsData);
    });
});
