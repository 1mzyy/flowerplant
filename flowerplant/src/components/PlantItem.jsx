import { Link } from "react-router-dom";    
import styles from "./PlantItem.module.css";

export default function PlantItem({ plant, deleteHandler }) {

    function formatDate(dateString) {

        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();

        const suffix = (day) => {
            if (day >3 && day < 21) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }

        return `${day}${suffix(day)} ${month} ${year}`;
    };

    return (
        <div className={styles.plantCard}>
            <h3 className={styles.plantName}>
            {plant.commonName} <span className={styles.scientificName}>({plant.scientificName})</span>
            </h3>

            <div className={styles.details}>
                    <p>☀️ Light: {plant.light}</p>
                    <p>💧 Water: {plant.watering}</p>
                 <p>🌱 Soil: {plant.soil}</p>
                    <p>📊 Level: 
                    <span className={`${styles.level} ${styles[plant.level.toLowerCase()]}`}>
                        {plant.level}
                    </span>
                </p>

                <p>📅 Added: {formatDate(plant.dateAdded)}</p>
            </div>

            <div className={styles.actions}>
                <Link to={`/update-plant/${plant.id}`} className={styles.editButton}>Edit</Link>
                <button
                    onClick={() => deleteHandler(plant.id)}
                    className={styles.deleteButton}
                >
                    Delete

                </button>
            </div>
        </div>
    );
}
