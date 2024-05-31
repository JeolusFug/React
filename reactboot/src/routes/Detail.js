import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Detail() {
    const [loading, setLoading] = useState(true);
    // const x = useParams();
    // console.log(x);
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const getMovies = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json);
        setLoading(false);
        console.log(json);
    };
    useEffect(() => {
        getMovies();
    }, [])

    return (
        <div>
            <h2>상세보기 페이지</h2>
            <button>
                <Link to="/">홈페이지</Link>
            </button>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <div>
                    <h2>{`${movie.data.movie.title} (${movie.data.movie.year})`}</h2>
                    <p>{`상영시간 : ${movie.data.movie.runtime}분  평점 : ${movie.data.movie.rating}`}</p>
                    <img src={movie.data.movie.large_cover_image} alt={movie.data.movie.title} title={movie.data.movie.title}/>
                    <ul>
                        {movie.data.movie.genres.map((g) => (
                            <li key={g}>{g}</li>
                        ))}
                    </ul>
                    <p>{movie.data.movie.description_full}</p>
                </div>
            )}
        </div>

    )
}

export default Detail;