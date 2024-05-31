import { useState } from "react";
import Movie from "../components/Movie";
import { useEffect } from "react";
import styles from "./Home.module.css";

function Home() {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    // useEffect(() => {
    //   fetch(
    //     'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
    //   )
    //     .then((response) => response.json())
    //     .then((json) => {
    //       setMovies(json.data.movies);
    //       setLoading(false);
    //     });
    // }, []);

    // .then보다 보편적으로 사용하는 방법
    // const getMovies = async() => {
    //   const response = await fetch(
    //     'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
    //   );
    //   const json = await response.json();
    //   setMovies(json.data.movies);
    //   setLoading(false);
    // }

    // 를 조금 더 줄여서 사용하는 방법
    const getMovies = async () => {
        const json = await (
            await fetch(
                'https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year'
            )
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, {})

    // console.log(movies);


    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className={styles.movies}>
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            img={movie.medium_cover_image}
                            title={movie.title}
                            summary={movie.summary}
                            genres={movie.genres}
                            year={movie.year}
                        />
                    ))}
                </div>
            )}
        </div>
    );

}

export default Home;