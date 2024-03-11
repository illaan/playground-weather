import React from "react";
import "../styles/TodayWeather.css";
import TodayHourly from "./TodayHourly";

function TodayWeather({ city, current, hourly }) {
	if (!current) return null;

	const { dt, sunrise, sunset, temp, weather, humidity, wind_speed } = current;
	const weatherDescription = weather[0].description;
	const iconCode = weather[0].icon;
	const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

	return (
		<div className="today-container">
			<div className="today-title">
				<h2>
					<em>{city}</em>
				</h2>
				<img src={iconUrl} alt="Weather icon" />
			</div>
			<div className="today-info">
				<div className="today-info-item">
					<p>Temperature</p>
					<h2>{Math.round(temp)}°C</h2>
				</div>
				<div className="today-info-item">
					<p>Description</p>
					<h2>{weatherDescription}</h2>
				</div>
				<div className="today-info-item">
					<p>Wind Speed</p>
					<h2>
						{(wind_speed * 3.6).toFixed(1)} <span>km/h</span>
					</h2>
				</div>
				<div className="today-info-item">
					<p>Humidity</p>
					<h2>
						{humidity} <span>%</span>
					</h2>
				</div>
			</div>
			<TodayHourly hourly={hourly} />
		</div>
	);
}

export default TodayWeather;
