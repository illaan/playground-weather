import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../styles/Overview.css";

function Overview({ humidityData, pressureData }) {
	const chartContainer = useRef(null);
	const chartInstance = useRef(null);

	useEffect(() => {
		if (chartContainer.current && humidityData && pressureData) {
			const ctx = chartContainer.current.getContext("2d");

			if (chartInstance.current) {
				chartInstance.current.destroy();
			}

			// Create the chart
			chartInstance.current = new Chart(ctx, {
				type: "line",
				data: {
					labels: [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					],
					datasets: [
						{
							label: "Humidity (%)",
							data: humidityData,
							backgroundColor: "rgba(75, 192, 192, 0.2)",
							borderColor: "rgba(75, 192, 192, 1)",
							borderWidth: 3,
							tension: 0.3,
						},
						{
							label: "Pressure (mb)",
							data: pressureData,
							backgroundColor: "rgba(255, 99, 132, 0.2)",
							borderColor: "rgba(255, 99, 132, 1)",
							borderWidth: 3,
							tension: 0.3,
						},
					],
				},
				options: {
					scales: {
						y: {
							// title: {
							// 	display: true,
							// 	text: "Precipitation Percentage (%)",
							// },
							min: 0,
							max: 100,
							ticks: {
								stepSize: 20,
							},
						},
					},
					plugins: {
						legend: {
							position: "right",
							padding: 20,
						},
					},
				},
			});
		}
	}, [humidityData, pressureData]);

	return (
		<div className="overview-container">
			<h2>{new Date().getFullYear() - 1} Overview</h2>
			<canvas className="chart-canvas" ref={chartContainer}></canvas>
		</div>
	);
}

export default Overview;
