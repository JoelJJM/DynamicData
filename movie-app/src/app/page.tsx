"use client";

import { STRING_LITERAL_DROP_BUNDLE } from "next/dist/shared/lib/constants";
import { useEffect, useState } from "react";

//Setting types because typescript is needy
type Movie = {
  id: string;
  cast: string[];
  director: string;
  genres: string[];
  name: string;
};
type Movies = Movie[];

//Function to retrieve data from the API
const getAPIData = async (searchQuery: string = ""): Promise<Movies> => {
  // Fetch based on whether data is passed
  const res = await fetch(
    searchQuery === ""
      ? `http://localhost:3000/api/movies`
      : `http://localhost:3000/api/movies?movie=${searchQuery}`
  );

  const data: Movies = await res.json();
  return data;
};

export default function Home() {
  const [displayData, setDisplayData] = useState<Movies>([]); //Use state for movie data
  const [query, setQuery] = useState<string>(""); //Use state for query

  //Use affect automatically does stuff when stuff happens
  useEffect(() => {
    getAPIData().then((data) => setDisplayData(data));
  }, []);

  //Supposed to run when form submit button is clicked.
  const handleSubmit = async (formData: FormData) => {
    const data = await getAPIData(formData.get("query") as string); //Puts form data in to retrieve api data

    setDisplayData(data);
  };

  return (
    <div className="flex flex-col w-screen h-screen p-3">
      <div className="flex flex-row mb-2">
        <h1 className="font-bold text-4xl mr-10">Movies4u</h1>

        <div className="flex flex-1 justify-center align-middle text-center">
          {/*Form to request different API data*/}
          <form action={handleSubmit}>
            <input
              type="text"
              name="query"
              placeholder="Looking for a movie?"
              className="p-3 rounded-xl w-[400px] text-black mr-2"
            />
            <button
              type="submit"
              className="bg-slate-600 p-3 rounded-xl hover:opacity-85 active:opacity-75"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="data-wrapper-div">
        {/*Mapping movie data and display*/}
        {displayData.map((movie) => (
          <div key={movie.id} className="data-div">
            <h2>{movie.name}</h2>
            <p>Director: {movie.director}</p>
            <p>Cast: {movie.cast.join(", ")}</p>
            <p>Genres: {movie.genres.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
