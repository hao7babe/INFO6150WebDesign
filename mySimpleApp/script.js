document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const weatherResults = document.getElementById('weather-results');
    
    try {
        // First, get coordinates for the location
        const geocodingResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
        const geocodingData = await geocodingResponse.json();
        
        if (!geocodingData.results || geocodingData.results.length === 0) {
            throw new Error('Location not found');
        }
        
        const { latitude, longitude } = geocodingData.results[0];
        
        // Get weather data for the next 7 days
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
        const weatherData = await weatherResponse.json();
        
        // Calculate average temperature for the period
        const avgTemp = weatherData.daily.temperature_2m_max.reduce((sum, temp) => sum + temp, 0) / weatherData.daily.temperature_2m_max.length;
        
        // Calculate average precipitation probability
        const avgPrecip = weatherData.daily.precipitation_probability_max.reduce((sum, prob) => sum + prob, 0) / weatherData.daily.precipitation_probability_max.length;
        
        // Display the weather data
        let weatherHTML = `
            <h2>Weather Forecast</h2>
            <div class="weather-summary">
                <h3>${location}</h3>
                <p>Average Temperature: ${avgTemp.toFixed(1)}°C</p>
                <p>Average Rain Chance: ${avgPrecip.toFixed(0)}%</p>
            </div>
            <details class="weather-details">
                <summary>View Daily Forecast</summary>
                <div class="weather-grid">
        `;
        
        weatherData.daily.time.forEach((date, index) => {
            const maxTemp = weatherData.daily.temperature_2m_max[index];
            const minTemp = weatherData.daily.temperature_2m_min[index];
            const precipProb = weatherData.daily.precipitation_probability_max[index];
            
            weatherHTML += `
                <div class="weather-day">
                    <h3>${new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h3>
                    <p>High: ${maxTemp}°C</p>
                    <p>Low: ${minTemp}°C</p>
                    <p>Rain Chance: ${precipProb}%</p>
                </div>
            `;
        });
        
        weatherHTML += '</div></details>';
        weatherResults.innerHTML = weatherHTML;
        
    } catch (error) {
        weatherResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
});
