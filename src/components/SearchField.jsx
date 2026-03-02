import styles from './SearchField.module.css';

export default function SearchField({ filter, handleInput }) {
    return (
        <div className={styles.searchContainer}>
            <label htmlFor="search">Search Plants:</label>
            <input
                type="text"
                id="search"
                value={filter}
                className={styles.input}
                onChange={handleInput}
                placeholder='Type to filter by name...'
            />
        </div>
    );
}
