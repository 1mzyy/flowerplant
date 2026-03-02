import { useState, useEffect } from "react";
import styles from "./UpdatePlantView.module.css";
import { useNavigate, useParams} from "react-router-dom";

export default function UpdatePlantView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [plants, setPlants] = useState(() => {
        const savedPlants = localStorage.getItem("myPlants");
        return savedPlants ? JSON.parse(savedPlants) : [];
    }

    );

    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [lightLevel, setLightLevel] = useState("");
    const [watering, setWatering] = useState("");
    const [soil, setSoil] = useState("");
    const [level, setLevel] = useState("");

    useEffect(() => {
        if (plant) {
            setCommonName(plant.commonName);
            setScientificName(plant.scientificName);
            setLightLevel(plant.light);
            setWatering(plant.watering);
            setSoil(plant.soil);
            setLevel(plant.level);
        }
    }, [plant]);

    useEffect(() => {
        localStorage.setItem("myPlants", JSON.stringify(plants));
    }, [plants]);

    function updateHandler(e) {
        e.preventDefault();

        const updatedPlant = {
            id: plant.id,
            commonName: commonName,
            scientificName: scientificName,
            light: lightLevel,
            watering: watering,
            soil: soil,
            level: level,
            dateAdded: plant.dateAdded,
        };

        setPlants(plants.map(p => p.id === plant.id ? updatedPlant : p));
        navigate("/plants");
    }

    if (!plant) {
        return (
            <div className={styles.notFound}>
                <h2>Plant not found</h2>
                <button onClick={() => navigate("/plants")} className={styles.backbtn}
                    >Back to My Plants
                </button>

            </div>
        );
    }

    return (
        <div className={styles.updatePlant}>
            <h2>Update Plant</h2>
            <form onSubmit={updateHandler} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>ID:</label>
                    <input type="number" value={id} readOnly className={styles.readOnly}/>
                </div>

                <div className={styles.formGroup}>
                    <label>Common Name:</label>
                    <input
                        type="text"
                        id="commonName"
                        value={commonName}
                        onChange={(e) => setCommonName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Scientific Name:</label>
                    <input
                        type="text"
                        id="scientificName"
                        value={scientificName}
                        onChange={(e) => setScientificName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Light Level:</label>
                    <input
                        type="text"
                        id="lightLevel"
                        value={lightLevel}
                        onChange={(e) => setLightLevel(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Watering:</label>
                    <input
                        type="text"
                        id="watering"
                        value={watering}
                        onChange={(e) => setWatering(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Soil:</label>
                    <input
                        type="text"
                        id="soil"
                        value={soil}
                        onChange={(e) => setSoil(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Level:</label>
                    <input
                        type="text"
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                    />
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </div>

                       <div className={styles.formActions}>
          <button type="submit" className={styles.updateBtn}>Update Plant</button>
          <button type="button" onClick={() => navigate("/myplants")} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
  
