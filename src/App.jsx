import "./App.css";
import TodayWeather from "./components/TodayWeather";
import Overview from "./components/Overview";
import Header from "./components/Header";
import Map from "./components/Map";
import Forecast from "./components/Forecast";
import Alert from "./components/Alert";

import { useState, useEffect } from "react";

function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [searchTerm, setSearchTerm] = useState("Sarajevo");
	const [cityName, setCityName] = useState("");

	const apiKey = "0a0c4c03f42b1da96d53d4deebb3a15c";

	//uncomment for fetching real humidity and preassure data

	// const year = new Date().getFullYear() - 1;

	// const fetchOldWeather = async (lat, lon, month) => {
	// 	const daysInMonth = new Date(year, month + 1, 0).getDate();
	// 	let totalHumidity = 0;

	// 	for (let day = 1; day <= daysInMonth; day++) {
	// 		const response = await fetch(
	// 			`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${
	// 				new Date(year, month, day).getTime() / 1000
	// 			}&appid=${apiKey}&units=metric`
	// 		);
	// 		const data = await response.json();
	// 		totalHumidity += data.data[0].humidity;
	// 	}
	// 	const averageHumidity = totalHumidity / daysInMonth;
	// 	console.log(averageHumidity);
	// 	return averageHumidity;
	// };

	// const fetchAverageMonthlyHumidity = async (lat, lon) => {
	// 	const averageHumidityByMonth = [];
	// 	for (let month = 0; month < 12; month++) {
	// 		const average = await fetchOldWeather(lat, lon, month);
	// 		averageHumidityByMonth.push(average);
	// 	}
	// 	console.log(averageHumidityByMonth);
	// 	return averageHumidityByMonth;
	// };

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	const fetchWeather = async (lat, lon) => {
		const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

		try {
			const response = await fetch(weatherUrl);
			const data = await response.json();
			setWeatherData(data);
			console.log(data);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

	const fetchCoordinates = async () => {
		const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&appid=${apiKey}`;
		try {
			const response = await fetch(geoUrl);
			const data = await response.json();
			if (data && data.length > 0) {
				const { lat, lon } = data[0];
				setCityName(data[0].name);
				fetchWeather(lat, lon);
				//uncomment for fetching real data
				// fetchAverageMonthlyHumidity(lat, lon);
			} else {
				console.error("City not found");
			}
		} catch (error) {
			console.error("Error fetching coordinates:", error);
		}
	};

	useEffect(() => {
		fetchCoordinates();
	}, [searchTerm]);

	return (
		<>
			<Header date={weatherData?.current.dt} handleSearch={handleSearch} />
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Alert alerts={weatherData?.alerts} />

				<div style={{ display: "flex" }}>
					<TodayWeather
						city={cityName}
						current={weatherData?.current}
						hourly={weatherData?.hourly}
					/>
					<Map apiKey={apiKey} />
				</div>
			</div>

			<div style={{ display: "flex" }}>
				<Overview
					humidityData={[30, 34, 60, 20, 20, 20, 10, 70, 90, 90, 80, 55]}
					pressureData={[5, 30, 15, 60, 50, 20, 70, 75, 80, 85, 75, 75]}
				/>
				<Forecast daily={weatherData?.daily} />
			</div>
		</>
	);
}

export default App;
