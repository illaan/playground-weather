import "../styles/Alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Alert({ alerts }) {
	if (!alerts) return null;
	return (
		<div className="alerts-container">
			{alerts?.map((alert, index) => {
				const date = new Date(alert.start * 1000);
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const hour = date.getHours();
				const minutes = date.getMinutes();
				const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
				const formattedDateTime = `${day}/${month} at ${hour}:${formattedMinutes}`;
				return (
					<div key={index} className="alert">
						<FontAwesomeIcon
							icon={faCircleExclamation}
							style={{ color: "red", marginInline: "0.5rem" }}
						/>
						{alert.event.toUpperCase()}
						&nbsp;
						{formattedDateTime}
						&nbsp; ({alert.description})
					</div>
				);
			})}
			<div className="alert-institute">-{alerts[0].sender_name}</div>
		</div>
	);
}

export default Alert;
