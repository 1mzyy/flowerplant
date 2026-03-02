import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlantList from "../components/PlantList";
import SearchField from "../components/SearchField";
import styles from "./MyPlantsView.module.css";

export default function MyPlantsView() {
    const navigate = useNavigate();

    const [plants, setPlants] = useState (() => {
    const savedPlants = localStorage.getItem("myPlants");
    return savedPlants ? JSON.parse(savedPlants) : [];

});

const [filterText, setFilterText] = useState (() => {
    const savedFilter = localStorage.getItem("plantFilter");
    return savedFilter ? savedFilter : "";

});

const [commonName, setCommonName] = useState("");
const [scientificName, setScientificName] = useState("");
const [lightLevel, setLightLevel] = useState("");
const [watering, setWatering] = useState("");
const [soil, setSoil] = useState("");
const [level, setLevel] = useState("");

useEffect(() => {
    localStorage.setItem("myPlants", JSON.stringify(plants));
}, [plants]);

useEffect(() => {
    localStorage.setItem("plantFilter", filterText);
}, [filterText]);

function createPlantHandler(e) {
    e.preventDefault();

    const highestId = plants.length > 0
        ? Math.max(...plants.map(plant => plant.id))
        : 0;

    const newPlant = {
        id: highestId + 1,
        commonName : commonName,
        scientificName : scientificName,
        light : lightLevel,
        watering : watering,
        soil : soil,
        level : level,
        dateAdded : new Date().toISOString().split("T")[0],
    };

    setPlants([...plants, newPlant]);

    setCommonName("");
    setScientificName("");
    setLightLevel("");
    setWatering("");
    setSoil("");
    setLevel("");

    alert("Plant added successfully!");
}

const handleInputChange = (event) => {
    setFilterText(event.target.value);
}

const filteredPlants = plants.filter(plant => {
    const searchTerm = filterText.toLowerCase();
    return (
        plant.commonName.toLowerCase().includes(searchTerm) ||
        plant.scientificName.toLowerCase().includes(searchTerm)
    );
});

const sortedPlants = [...filteredPlants].sort((a, b) => {
    return a.commonName.localeCompare(b.commonName, "en", { sensitivity: "base" });

});

    return (
        <div className={styles.myPlants}>
            <h1>My Plants 🌿</h1>

            <section className={styles.addForm}>
                <h2>Add a New Plant</h2>
                <form onSubmit={createPlantHandler}>
                    <div className={styles.formRow} >
                        <div className={styles.formGroup}>
                            <label htmlFor="commonName">Common Name:</label>
                            <input
                                type="text"
                                id="commonName"
                                value={commonName}
                                onChange={(e) => setCommonName(e.target.value)}
                                required
                            />
                        </div>  
                        <div className={styles.formGroup}>
                            <label htmlFor="scientificName">Scientific Name:

                            </label>

                            <input
                                type="text"
                                id="scientificName"onChange={(e) => setScientificName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="lightLevel">Light Requirements:</label>
                            <input
                                type="text"
                                id="lightLevel"
                                value={lightLevel}
                                placeholder="e.g. Bright indirect light"
                                onChange={(e) => setLightLevel(e.target.value)}
                                required
                            />
                        </div>
                   
                    <div className={styles.formGroup}>
                        <label htmlFor="watering">Watering Needs:</label>
                        <input
                            type="text"
                            id="watering"
                            value={watering}
                            placeholder="e.g. Once a week"
                            onChange={(e) => setWatering(e.target.value)}
                            required
                        />
                    </div>
                 </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="soil">Soil Type:</label>
                            <input
                                type="text"
                                id="soil"
                                value={soil}
                                placeholder="e.g. Well-draining potting mix"
                                onChange={(e) => setSoil(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="level">Difficulty Level:</label>
                            <input
                                type="text"
                                id="level"
                                value={level}
                                placeholder="e.g. Beginner"
                                onChange={(e) => setLevel(e.target.value)}
                                required
                            />
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </div>
                    </div>
                    <button type="submit" className={styles.submitButton}>Add to my Plants</button>
                </form>
            </section>

            <section className={styles.collection}>
                <div className={styles.collectionHeader}>
                    <h2>My Plant Collection ({filteredPlants.length})</h2>
                    <SearchField filter={filterText} handleInput={handleInputChange} />
                </div>
               {sortedPlants.length > 0 ? (
                    <PlantList plants={sortedPlants} setPlants={setPlants} />
                ) : (

                    <p className={styles.noResults}>
                        {filterText ? "No plants found." : "Start adding plants to your collection!"}
                    </p>
                )}
            </section>
        </div>
    );
}