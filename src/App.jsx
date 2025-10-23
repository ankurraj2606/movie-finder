import "./styles.css";
import { useState, useEffect, useMemo } from "react";
import { useFetch } from "./hooks/useFetch";
import MovieCard from "./components/MovieCard";

export default function App() {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);

  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?language=eng";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjgyN2ZhODYzNDBhZDMzM2QyY2E0NjdiYWE0YjJhZiIsIm5iZiI6MTc2MTA0Nzc0NC41MDMsInN1YiI6IjY4Zjc3NGMwYWEwYWNlN2U4MThmOGVkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tomjPDBXAPAdZG0ZchGvys6O8Ai82aocdoXlg_N37N4`,
    },
  };
  const { data: genreData } = useFetch(genreUrl, options);
  const genreMap = useMemo(() => {
    const map = new Map();
    genreData?.genres?.forEach((gen) => map.set(gen.id, gen.name));
    return map;
  }, [genreData]);
  const { data, isLoading, setIsLoading } = useFetch(url, options, page);

  function debounce(fn, delay) {
    let timerId;

    return function (...args) {
      if (timerId) clearTimeout(timerId);

      timerId = setTimeout(() => fn(...args), delay);
    };
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollHeight - 300 <
        window.scrollY + window.innerHeight
      ) {
        setIsLoading(true);
      }
    };

    const debouncedFn = debounce(handleScroll, 500);

    window.addEventListener("scroll", debouncedFn);

    return () => window.removeEventListener("scroll", debouncedFn);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    setPage((prevPage) => prevPage + 1);
  }, [isLoading]);

  useEffect(() => {
    if (data?.results) {
      setAllMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
    }
  }, [data, page]);
  return (
    <div className="App">
      <h1>The Movie Hub</h1>
      <button onClick={() => setPage(page + 1)}>{page}</button>
      <div className="movie-container">
        {allMovies &&
          allMovies?.map((da, idx) => (
            <MovieCard
              key={idx}
              title={da.title}
              overview={da.overview}
              backdrop_path={da.backdrop_path}
              poster_path={da.poster_path}
              popularity={da.popularity}
              vote_average={da.vote_average}
              vote_count={da.vote_count}
              release_date={da.release_date}
              genreMap={genreMap}
              genre_ids={da.genre_ids}
            />
          ))}
        {isLoading && <h1>Loading...</h1>}
      </div>
    </div>
  );
}
