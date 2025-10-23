import { useEffect } from "react";

const MovieCard = ({
  title,
  overview,
  backdrop_path,
  popularity,
  poster_path,
  release_date,
  vote_average,
  vote_count,
  genreMap,
  genre_ids,
}) => {
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  return (
    <div className="movie-card">
      <div
        className="image-container"
        style={{ "--bg-backdrop-image": `url(${backdropUrl})` }}
      >
        <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="" />
      </div>
      <h4 className="card-title">{title}</h4>
      <p className="card-overview">{overview}</p>
      <div className="card-pop">
        <span>
          <span>⭐️ {vote_average && vote_average.toFixed(1)}</span>
          <span className="card-rated-by">
            <span>👍</span>
            <span>❤️</span>
            <span>👏</span>
          </span>

          <span>{vote_count}</span>
        </span>
        <p className="release_date">Release: {release_date.slice(0, 4)}</p>
      </div>

      <div className="genres">
        {genre_ids ? (
          genre_ids.map((gen) => (
            <span key={gen} className="genre-pills">
              {genreMap?.get(gen)}
            </span>
          ))
        ) : (
          <p>Genre Unknown</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
