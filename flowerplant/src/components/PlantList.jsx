import PlantItem from "./PlantItem";
import styles from "./PlantList.module.css";

export default function PlantList({ plants, setPlants }) {

    function deletePlantHandler(id) {
        const isConfirmed = window.confirm("Are you sure you want to delete this plant?");
        if (isConfirmed) {
            setPlants(plants.filter(plant => plant.id !== id));
        }
    }

    if (plants.length === 0) {
        return <p className={styles.emptyMessage}>🌱 No plants yet. Add your first plant!</p>;
    }

    return (
        <div className={styles.plantGrid}>
            {plants.map(plant => (
                <PlantItem
                    key={plant.id}
                    plant={plant}
                    deleteHandler={deletePlantHandler}
                />
            ))}
        </div>
    );
}
