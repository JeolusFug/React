import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, img, title, summary, genres, year }) {
    return (
        <div className={styles.movie}>
            <img src={img} alt={title} title={title} className={styles.movie__img} />
            <div>
                <h2 className={styles.movie__title}>
                    <Link to={`/movie/${id}`}>{title}</Link>
                </h2>
                <h3 className={styles.movie__year}>{year}</h3>
                <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
                {/* {summary.split('').slice(0,80).join('')}...는 너무 길때 줄여준다 */}
                <ul className={styles.movie__genres}>
                    {genres.map((g) => (
                        <li key={g}>{g}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;