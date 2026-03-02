import { useState, useEffect } from "react";
import styles from "./HomeView.module.css";

import heroImage from "../assets/hero-image.jpg";

import plantCollections from "../assets/plant.jpg";


export default function HomeView() {
    const [predefinedGuides] = useState([
        {
            id: 1,
            commonName: "Snake Plant",
            scientificName: "Sansevieria trifasciata",
            light: "Low to bright indirect",
            watering: "Every 2-3 weeks",
            soil: "Well-draining cactus or succulent mix",
            level: "Beginner",

        },
        {
            id: 2,
            commonName: "Spider Plant",
            scientificName: "Chlorophytum comosum",
            light: "Bright indirect",
            watering: "Every 1-2 weeks",
            soil: "Well-draining potting mix",
            level: "Intermediate",

        },
        {
            id: 3,
            commonName: "Fiddle-Leaf Fig",
            scientificName: "Ficus lyrata",
            light: "Bright indirect (6+ hours)",
            watering: "Every 1-2 weeks",
            soil: "Well-draining potting mix",
            level: "Advanced",

        },
    ]);

    return (
        <div className="{styles.home}">
            <section className="{styles.hero}">
             <img src={heroImage} alt="Beautiful plants" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Welcome to FlowerPlant 🌿</h1>
          <p>
            A community for plant enthusiasts, gardeners, and beginners 
            looking to learn about plant care.
          </p>
        </div>
      </section>

      {/* Care Basics Section */}
      <section className={styles.basics}>
        <h2>Plant Care Basics</h2>
        <div className={styles.tips}>
          <div className={styles.tip}>
            <h3>💧 Watering</h3>
            <p>Most plants prefer their soil to dry out between waterings. Always check soil moisture first!</p>
          </div>
          <div className={styles.tip}>
            <h3>☀️ Light</h3>
            <p>"Bright indirect light" means near a window but not in direct sun rays.</p>
          </div>
          <div className={styles.tip}>
            <h3>🌱 Soil</h3>
            <p>Well-draining soil prevents root rot. Different plants need different mixes.</p>
          </div>
        </div>
      </section>


      {/* Predefined Guides */}
      <section className={styles.guides}>
        <h2>Popular Plant Care Guides</h2>
        <div className={styles.guideGrid}>
          {predefinedGuides.map(guide => (
            <div key={guide.id} className={styles.guideCard}>
              <h3>{guide.commonName}</h3>
              <p className={styles.scientific}>{guide.scientificName}</p>
              <div className={styles.guideDetails}>
                <p><strong>Light:</strong> {guide.light}</p>
                <p><strong>Water:</strong> {guide.watering}</p>
                <p><strong>Soil:</strong> {guide.soil}</p>
                <p><strong>Level:</strong> 
                  <span className={`${styles.levelBadge} ${styles[guide.level.toLowerCase()]}`}>
                    {guide.level}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}