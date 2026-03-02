import communityImage from "../assets/community.jpg";
import styles from "./AboutView.module.css";

export default function AboutView() {

    return (
        <div className={styles.about}>
            <h2>About FlowerPlant</h2>

            <div className={styles.content}>
                <div className={styles.textSection}>
                    <h2>Our Vision</h2>
                    <p>To create a world where everyone can experience the joy and 
            well-being that comes from connecting with plants. We believe 
            that plant care should be accessible, enjoyable, and community-driven.
            </p>

                    <h2>Our Mission</h2>
                    <p>To empower plant lovers of all levels with the knowledge, tools, and community support they need to thrive in their plant care journey. 
            We are dedicated to fostering a welcoming space where everyone can 
            share their passion for plants and learn from each other.
            </p>

                    <h2>Our Values</h2>
                    <p>We value community, sustainability, and education. We believe in the power of plants to bring people together and improve well-being. Our commitment to sustainability drives us to promote eco-friendly practices in plant care and beyond.</p>
                </div>
            </div>

            <div className={styles.imageSection}>
                <img src={communityImage} alt="Community of plant lovers" className={styles.image} />
                <div className={styles.contactBox}>
                    <h3>Get in Touch</h3>
                    <p>📍 123 Botanical Lane, Green City</p>
                    <p>📧 flowplant123@flowerplant2026.dk</p>
                    <p>📞 +45 20 76 76 5</p>
                </div>
            </div>
        </div>
    );
}