import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Add useParams
import PlantList from "../components/PlantList";
import SearchField from "../components/SearchField";
import styles from "./MyPlantsView.module.css";

export default function MyPlantsView() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL for editing

    const [plants, setPlants] = useState(() => {
        const savedPlants = localStorage.getItem("myPlants");
        return savedPlants ? JSON.parse(savedPlants) : [];
    });

    const [filterText, setFilterText] = useState(() => {
        const savedFilter = localStorage.getItem("plantFilter");
        return savedFilter ? savedFilter : "";
    });

    // Form states
    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [lightLevel, setLightLevel] = useState("");
    const [watering, setWatering] = useState("");
    const [soil, setSoil] = useState("");
    const [level, setLevel] = useState("");
    
    // Track if we're editing
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Load plant data if ID is provided (for editing)
    useEffect(() => {
        if (id) {
            const plantToEdit = plants.find(p => p.id === Number(id));
            if (plantToEdit) {
                setCommonName(plantToEdit.commonName);
                setScientificName(plantToEdit.scientificName);
                setLightLevel(plantToEdit.light);
                setWatering(plantToEdit.watering);
                setSoil(plantToEdit.soil);
                setLevel(plantToEdit.level);
                setIsEditing(true);
                setEditingId(Number(id));
            }
        }
    }, [id, plants]);

    useEffect(() => {
        localStorage.setItem("myPlants", JSON.stringify(plants));
    }, [plants]);

    useEffect(() => {
        localStorage.setItem("plantFilter", filterText);
    }, [filterText]);

    // Handle form submit (Create OR Update)
    function handleSubmit(e) {
        e.preventDefault();

        if (isEditing && editingId) {
            // UPDATE existing plant
            const updatedPlants = plants.map(plant => 
                plant.id === editingId 
                    ? {
                        ...plant,
                        commonName: commonName,
                        scientificName: scientificName,
                        light: lightLevel,
                        watering: watering,
                        soil: soil,
                        level: level,
                        dateUpdated: new Date().toISOString().split("T")[0]
                      }
                    : plant
            );
            
            setPlants(updatedPlants);
            alert("🌱 Plant updated successfully!");
            navigate("/myplants"); // Go back to main list
        } else {
            // CREATE new plant
            const highestId = plants.length > 0
                ? Math.max(...plants.map(plant => plant.id))
                : 0;

            const newPlant = {
                id: highestId + 1,
                commonName: commonName,
                scientificName: scientificName,
                light: lightLevel,
                watering: watering,
                soil: soil,
                level: level,
                dateAdded: new Date().toISOString().split("T")[0],
            };

            setPlants([...plants, newPlant]);
            alert("🌱 Plant added successfully!");
        }

        // Reset form
        resetForm();
    }

    // Reset form fields
    const resetForm = () => {
        setCommonName("");
        setScientificName("");
        setLightLevel("");
        setWatering("");
        setSoil("");
        setLevel("");
        setIsEditing(false);
        setEditingId(null);
    };

    // Cancel editing
    const cancelEdit = () => {
        resetForm();
        navigate("/myplants");
    };

    const handleInputChange = (event) => {
        setFilterText(event.target.value);
    };

    const filteredPlants = plants.filter(plant => {
        const searchTerm = filterText.toLowerCase();
        return (
            plant.commonName.toLowerCase().includes(searchTerm) ||
            plant.scientificName.toLowerCase().includes(searchTerm) ||
            plant.level.toLowerCase().includes(searchTerm)
        );
    });

    const sortedPlants = [...filteredPlants].sort((a, b) => {
        return a.commonName.localeCompare(b.commonName, "en", { sensitivity: "base" });
    });

    return (
        <div className={styles.myPlants}>
            <h1>My Plants 🌿</h1>

            <section className={styles.addForm}>
                <h2>{isEditing ? "✏️ Edit Plant" : " Add a New Plant"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
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
                            <label htmlFor="scientificName">Scientific Name:</label>
                            <input
                                type="text"
                                id="scientificName"
                                value={scientificName}
                                onChange={(e) => setScientificName(e.target.value)}
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
                                placeholder="e.g. Every 1-2 weeks"
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
                            <select
                                id="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                required
                            >
                                <option value="">Select level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" className={styles.submitButton}>
                            {isEditing ? "✏️ Update Plant" : "Add to My Plants"}
                        </button>
                        
                        {isEditing && (
                            <button 
                                type="button" 
                                onClick={cancelEdit}
                                className={styles.cancelButton}
                                style={{
                                    background: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    padding: '1rem 2rem',
                                    borderRadius: '25px',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    flex: 1
                                }}
                            >
                                ✖ Cancel
                            </button>
                        )}
                    </div>
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