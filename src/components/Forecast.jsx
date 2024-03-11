import "../styles/Forecast.css";
import { useState } from "react";

function Forecast({ daily }) {
	const [forecastRange, setForecastRange] = useState(3);

	return (
		<div className="forecast-container">
			<div className="forecast-header">
				<h2>Forecast</h2>
				<div className="forecast-buttons">
					<button
						className={forecastRange === 3 ? "active" : ""}
						onClick={() => setForecastRange(3)}
					>
						3 Days
					</button>
					<button
						className={forecastRange === 8 ? "active" : ""}
						onClick={() => setForecastRange(8)}
					>
						8 Days
					</button>
				</div>
			</div>
			{daily?.slice(0, forecastRange).map((day, index) => {
				const date = new Date(day.dt * 1000);
				const day1 = date.getDate();
				const months = [
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
				];
				const month = months[date.getMonth()];
				const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
				const dayOfWeek = daysOfWeek[date.getDay()];
				const formattedDate = `${day1} ${month}, ${dayOfWeek}`;
				const iconCode = day.weather[0].icon;
				const minTemp = day.temp.min;
				const maxTemp = day.temp.max;
				const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

				return (
					<div key={index} className="forecast-day">
						<img src={iconUrl} alt="weather icon" />
						<div>
							{Math.round(minTemp)} / {Math.round(maxTemp)}°C
						</div>
						<div style={{ marginLeft: "auto" }}>{formattedDate}</div>
					</div>
				);
			})}
		</div>
	);
}

export default Forecast;
