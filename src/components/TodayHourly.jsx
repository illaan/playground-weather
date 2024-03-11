import "../styles/TodayHourly.css";

function TodayHourly({ hourly }) {
	const formatDate = (dt) => {
		const date = new Date(dt * 1000);
		const hour = date.getUTCHours();
		return hour;
	};

	return (
		<div className="today-hourly-container">
			{hourly.map(({ dt, temp, weather }) => (
				<div className="hour-card">
					<p>{formatDate(dt)}:00</p>
					<img
						src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
						alt=""
					/>
					<p>{Math.round(temp)}°C</p>
				</div>
			))}
		</div>
	);
}

export default TodayHourly;
