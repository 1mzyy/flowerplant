import styles from './Footer.module.css'

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.contact}>
                <p>📍 123 Botanical Lane, Green City, 2345 Copenhagen, Denmark</p>
                <p>📧 flowplant123@flowerplant2026.dk</p>
                <p>📞 +45 20 76 76 5</p>
             </div>
             <p className={styles.copyright}>
                © {currentYear} FlowerPlant. All rights reserved.
             </p>
        </footer>
    );
}

export default Footer;