import React, { useState } from 'react';

const MovieSearch = () => {
  const [movieInput, setMovieInput] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);
  const apiKey = 'f752cc23c578e8cece90cccbd106670a';

  const fetchMovieData = () => {
    const movieInfoContainer = document.getElementById('movieInfo');
    // Clear previous movie information
    movieInfoContainer.innerHTML = '';

    // Check if movie name is provided
    if (!movieInput) {
      alert('Please enter a movie name.');
      return;
    }

    // Fetch movie data from TMDb API
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieInput)}`)
      .then(response => response.json())
      .then(data => {
        // Check if any results are returned
        if (data.results.length === 0) {
          alert('No movie found with that name.');
          return;
        }
        const movie = data.results[0];
        const director = movie.director; // Note: The TMDb API response doesn't include 'director', adjust as per API documentation

        // Update state with movie information
        setMovieInfo({
          title: movie.title,
          director: director || 'Not available',
          release_date: movie.release_date || 'Not available',
          overview: movie.overview || 'Not available'
        });
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
        alert('Error fetching movie data. Please try again.');
      });
  };

  return (
    <div>
      <h1>Welcome to the Movie Review Site</h1>
      <input
        type="text"
        value={movieInput}
        onChange={(e) => setMovieInput(e.target.value)}
        placeholder="Enter a movie name"
      />
      <button onClick={fetchMovieData}>Search</button>
      <div id="movieInfo">
        {movieInfo && (
          <div>
            <h2>{movieInfo.title}</h2>
            <p><strong>Director:</strong> {movieInfo.director}</p>
            <p><strong>Release Date:</strong> {movieInfo.release_date}</p>
            <p><strong>Overview:</strong> {movieInfo.overview}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
