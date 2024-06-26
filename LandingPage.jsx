import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [movieInput, setMovieInput] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);
  const apiKey = 'f752cc23c578e8cece90cccbd106670a';

  const handleInputChange = (event) => {
    setMovieInput(event.target.value);
  };

  const handleSearch = () => {
    if (!movieInput) {
      alert('Please enter a movie name.');
      return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieInput)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.results.length === 0) {
          alert('No movie found with that name.');
          return;
        }
        const movie = data.results[0];
        const director = movie.director; // Note: Adjust based on API response structure

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
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to the Movie Review Site</h1>
        <p>Discover and explore movies.</p>
        <div className="search-container">
          <input
            type="text"
            value={movieInput}
            onChange={handleInputChange}
            placeholder="Enter a movie name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {movieInfo && (
          <div className="movie-info">
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

export default LandingPage;
