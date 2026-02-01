// ========================================
// ASYNC/AWAIT & FETCH API DEMO
// ========================================
// Real-Time Use: Fetch live data from APIs (Weather, Crypto, etc.)

// Example 1: Fetch Bitcoin Price
async function getCryptoPrice() {
    try {
        const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        const data = await response.json();
        console.log(`Bitcoin Price: $${data.data.amount}`);
        return data.data.amount;
    } catch (error) {
        console.error('Error fetching crypto price:', error);
    }
}

// Example 2: Fetch Weather Data
async function getWeather(city) {
    try {
        const apiKey = 'YOUR_API_KEY'; // Replace with actual API key
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const data = await response.json();
        console.log(`Weather in ${city}: ${data.weather[0].description}`);
        console.log(`Temperature: ${data.main.temp}K`);
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Example 3: Multiple API Calls in Parallel
async function fetchMultipleData() {
    try {
        // Fetch multiple APIs simultaneously
        const [crypto, users, posts] = await Promise.all([
            fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json())
        ]);

        console.log('Crypto:', crypto.data.amount);
        console.log('Users count:', users.length);
        console.log('Posts count:', posts.length);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example 4: Error Handling with Try-Catch
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed:', error.message);
        return null;
    }
}

// Run the demos
console.log('=== Running Async/Await Demos ===');
getCryptoPrice();
fetchMultipleData();
