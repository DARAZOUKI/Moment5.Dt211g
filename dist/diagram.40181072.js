"use strict";
document.addEventListener("DOMContentLoaded", function() {
    fetchDataAndGenerateCharts();
});
async function fetchDataAndGenerateCharts() {
    try {
        const response = await fetch("statistik_sokande.json");
        const data = await response.json();
        if (data) {
            const coursesData = getTopCourses(data.coursesData, 6);
            const programsData = getTopPrograms(data.programsData, 5);
            createBarChart(coursesData);
            createPieChart(programsData);
        } else console.error("Data not available.");
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function getTopCourses(coursesData, count) {
    // Filter out programs from the coursesData array
    const topCourses = coursesData.filter((course)=>course.type === "Kurs").sort((a, b)=>b.applicantsTotal - a.applicantsTotal).slice(0, count);
    return topCourses;
}
function getTopPrograms(programsData, count) {
    // Sort the programsData array
    const sortedPrograms = programsData.sort((a, b)=>b.applicantsTotal - a.applicantsTotal);
    // Take the top 'count' programs
    const topPrograms = sortedPrograms.slice(0, count);
    return topPrograms;
}
function createBarChart(coursesData) {
    const ctx = document.getElementById("barChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: coursesData.map((course)=>course.name),
            datasets: [
                {
                    label: "Total S\xf6kande",
                    data: coursesData.map((course)=>course.applicantsTotal),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function createPieChart(programsData) {
    const ctx = document.getElementById("pieChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: programsData.map((program)=>program.name),
            datasets: [
                {
                    data: programsData.map((program)=>program.applicantsTotal),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}

