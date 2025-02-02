interface MovieGenre {
  id: number;
  name: string;
}

interface MovieDetail {
  genres: MovieGenre[];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

type Movie = Pick<
  MovieDetail,
  "id" | "title" | "release_date" | "poster_path" | "vote_average"
>;

type MovieType = "popular" | "top_rated" | "upcoming" | "now_playing";

export type { Movie, MovieDetail, MovieGenre, MovieType };
