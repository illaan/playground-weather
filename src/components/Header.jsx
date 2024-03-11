import "../styles/Header.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header({ date, handleSearch }) {
	const [inputValue, setInputValue] = useState("");

	const formatDate = (timestamp) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleDateString(undefined, {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
			// hour: "numeric",
			// minute: "numeric",
			// second: "numeric",
		});
	};

	const handleEnterKeyPress = async (e) => {
		if (e.key === "Enter") {
			handleSearch(inputValue);
		}
	};

	return (
		<div className="header-wraper">
			<div className="header-title">
				<h1>My weather</h1>
			</div>
			<div className="header-container">
				<div className="header-date">{formatDate(date)}</div>
				<div className="search">
					<input
						type="text"
						placeholder="Weather in your city"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyUp={handleEnterKeyPress}
					/>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</div>
			</div>
		</div>
	);
}

export default Header;
