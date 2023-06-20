import Movie from "../Movie";

// I would suggest importing scss files as modules
import "./Movies.scss";

const Movies = ({ movies }) => {
  if (!movies) {
    return <div>Loading movies...</div>;
  }

  return (
    <div data-testid="movies">
      {movies.map((movie) => {
        return <Movie movie={movie} key={movie.id} />;
      })}
    </div>
  );
};

export default Movies;
