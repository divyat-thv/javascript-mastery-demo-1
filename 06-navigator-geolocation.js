// ========================================
// NAVIGATOR & GEOLOCATION API DEMO
// ========================================
// Track user location + Detect device info

console.log('=== Navigator & Geolocation Demo ===\n');

// ========================================
// 1. NAVIGATOR API - DEVICE INFO
// ========================================
console.log('--- Device Information ---');

// Get basic device info
const deviceInfo = {
    platform: navigator.platform,        // Operating system
    language: navigator.language,        // Browser language
    languages: navigator.languages,      // Preferred languages
    userAgent: navigator.userAgent,      // Browser details
    vendor: navigator.vendor,            // Browser vendor
    onLine: navigator.onLine,           // Internet connection status
    cookieEnabled: navigator.cookieEnabled,
    maxTouchPoints: navigator.maxTouchPoints, // Touch support
    hardwareConcurrency: navigator.hardwareConcurrency // CPU cores
};

console.log('📱 Device Info:', deviceInfo);
console.log('💻 Platform:', deviceInfo.platform);
console.log('🌐 Language:', deviceInfo.language);
console.log('📶 Online:', deviceInfo.onLine ? 'Yes' : 'No');
console.log('🖥️ CPU Cores:', deviceInfo.hardwareConcurrency);

// ========================================
// 2. DETECTING MOBILE VS DESKTOP
// ========================================
console.log('\n--- Device Type Detection ---');

function detectDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
    const isTablet = /tablet|ipad/.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    console.log('📱 Mobile:', isMobile);
    console.log('📱 Tablet:', isTablet);
    console.log('💻 Desktop:', isDesktop);
    
    return { isMobile, isTablet, isDesktop };
}

const device = detectDeviceType();

// ========================================
// 3. BROWSER DETECTION
// ========================================
console.log('\n--- Browser Detection ---');

function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    
    if (userAgent.includes('Firefox')) {
        browserName = 'Firefox';
    } else if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
        browserName = 'Chrome';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browserName = 'Safari';
    } else if (userAgent.includes('Edg')) {
        browserName = 'Edge';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
        browserName = 'Opera';
    }
    
    console.log('🌐 Browser:', browserName);
    return browserName;
}

detectBrowser();

// ========================================
// 4. ONLINE/OFFLINE DETECTION
// ========================================
console.log('\n--- Connection Status ---');

function setupConnectionMonitoring() {
    console.log('Current status:', navigator.onLine ? '✅ Online' : '❌ Offline');
    
    window.addEventListener('online', () => {
        console.log('✅ Connection restored!');
        showNotification('You are back online');
    });
    
    window.addEventListener('offline', () => {
        console.log('❌ Connection lost!');
        showNotification('You are offline');
    });
}

function showNotification(message) {
    console.log('🔔 Notification:', message);
    // Show UI notification to user
}

setupConnectionMonitoring();

// ========================================
// 5. GEOLOCATION API - GET LOCATION
// ========================================
console.log('\n--- Geolocation ---');

function getCurrentLocation() {
    if (!navigator.geolocation) {
        console.log('❌ Geolocation not supported');
        return;
    }
    
    console.log('📍 Requesting location access...');
    
    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
            
            console.log('✅ Location obtained!');
            console.log('📍 Latitude:', latitude);
            console.log('📍 Longitude:', longitude);
            console.log('🎯 Accuracy:', accuracy, 'meters');
            console.log('⛰️ Altitude:', altitude, 'meters');
            console.log('🧭 Heading:', heading, 'degrees');
            console.log('🏃 Speed:', speed, 'm/s');
            console.log('⏰ Timestamp:', new Date(position.timestamp).toLocaleString());
            
            // Use the location
            showOnMap(latitude, longitude);
        },
        // Error callback
        (error) => {
            console.error('❌ Location error:', error.message);
            handleLocationError(error);
        },
        // Options
        {
            enableHighAccuracy: true,  // GPS if available
            timeout: 10000,            // 10 seconds timeout
            maximumAge: 0              // Don't use cached location
        }
    );
}

function handleLocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log('🚫 User denied location access');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('📍 Location unavailable');
            break;
        case error.TIMEOUT:
            console.log('⏱️ Location request timed out');
            break;
        default:
            console.log('❌ Unknown error');
    }
}

function showOnMap(lat, lng) {
    console.log(`🗺️ Showing map at: ${lat}, ${lng}`);
    // Open Google Maps
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    console.log('Map URL:', mapsUrl);
}

// Get location
getCurrentLocation();

// ========================================
// 6. WATCH POSITION (Real-time tracking)
// ========================================
console.log('\n--- Real-Time Location Tracking ---');

function startLocationTracking() {
    if (!navigator.geolocation) {
        console.log('❌ Geolocation not supported');
        return;
    }
    
    console.log('👀 Starting location tracking...');
    
    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`📍 Updated location: ${latitude}, ${longitude}`);
            // Update map or send to server
        },
        (error) => {
            console.error('Tracking error:', error.message);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 5000,  // Update every 5 seconds
            timeout: 10000
        }
    );
    
    // Stop tracking after 30 seconds (demo)
    setTimeout(() => {
        navigator.geolocation.clearWatch(watchId);
        console.log('⏹️ Stopped location tracking');
    }, 30000);
    
    return watchId;
}

// Uncomment to start tracking
// startLocationTracking();

// ========================================
// 7. DISTANCE CALCULATION
// ========================================
console.log('\n--- Distance Calculation ---');

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
}

// Example: Distance from Mumbai to Delhi
const mumbai = { lat: 19.0760, lon: 72.8777 };
const delhi = { lat: 28.7041, lon: 77.1025 };
const distance = calculateDistance(mumbai.lat, mumbai.lon, delhi.lat, delhi.lon);
console.log(`Distance Mumbai to Delhi: ${distance.toFixed(2)} km`);

// ========================================
// 8. FIND NEAREST LOCATION
// ========================================
console.log('\n--- Find Nearest Store ---');

function findNearestStore(userLat, userLon) {
    const stores = [
        { name: 'Store A', lat: 19.0760, lon: 72.8777 },
        { name: 'Store B', lat: 19.1136, lon: 72.8697 },
        { name: 'Store C', lat: 18.9388, lon: 72.8354 }
    ];
    
    const storesWithDistance = stores.map(store => ({
        ...store,
        distance: calculateDistance(userLat, userLon, store.lat, store.lon)
    }));
    
    const nearest = storesWithDistance.sort((a, b) => a.distance - b.distance)[0];
    
    console.log('🏪 Nearest store:', nearest.name);
    console.log('📏 Distance:', nearest.distance.toFixed(2), 'km');
    
    return nearest;
}

// Example usage
findNearestStore(19.0760, 72.8777);

// ========================================
// 9. REVERSE GEOCODING (Get Address)
// ========================================
console.log('\n--- Reverse Geocoding ---');

async function getAddressFromCoordinates(lat, lon) {
    try {
        // Using OpenStreetMap's Nominatim (free)
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('🏠 Address:', data.display_name);
        console.log('📮 City:', data.address.city || data.address.town);
        console.log('🌍 Country:', data.address.country);
        
        return data;
    } catch (error) {
        console.error('Error getting address:', error);
    }
}

// Example: Get address for Mumbai coordinates
getAddressFromCoordinates(19.0760, 72.8777);

// ========================================
// 10. PERMISSIONS API
// ========================================
console.log('\n--- Check Location Permission ---');

async function checkLocationPermission() {
    if (navigator.permissions) {
        try {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            
            console.log('🔐 Location permission:', result.state);
            
            result.addEventListener('change', () => {
                console.log('🔄 Permission changed to:', result.state);
            });
            
            return result.state; // 'granted', 'denied', or 'prompt'
        } catch (error) {
            console.error('Error checking permission:', error);
        }
    }
}

checkLocationPermission();

// ========================================
// 11. REAL-WORLD USE CASES
// ========================================
console.log('\n--- Real-World Examples ---');

// Use Case 1: Weather App
async function getLocalWeather() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        console.log('☀️ Getting weather for your location...');
        // Call weather API with coordinates
        console.log(`Weather API call: lat=${latitude}, lon=${longitude}`);
    });
}

// Use Case 2: Store Locator
function setupStoreLocator() {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        console.log('🗺️ Finding nearby stores...');
        const nearest = findNearestStore(latitude, longitude);
        
        // Show directions
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lon}`;
        console.log('📍 Get directions:', directionsUrl);
    });
}

// Use Case 3: Delivery Tracking
function trackDelivery() {
    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            
            // Send to server
            console.log('🚚 Sending location to server:', { latitude, longitude });
            
            // Update ETA based on distance
            console.log('⏱️ Updating ETA...');
        },
        null,
        { enableHighAccuracy: true, maximumAge: 5000 }
    );
    
    return watchId;
}

// Use Case 4: Restaurant Finder
async function findNearbyRestaurants(userLat, userLon, radius = 5) {
    console.log(`🍽️ Finding restaurants within ${radius}km...`);
    
    // Example restaurants
    const restaurants = [
        { name: 'Restaurant A', lat: 19.0760, lon: 72.8777, rating: 4.5 },
        { name: 'Restaurant B', lat: 19.1136, lon: 72.8697, rating: 4.2 },
        { name: 'Restaurant C', lat: 18.9388, lon: 72.8354, rating: 4.8 }
    ];
    
    const nearby = restaurants
        .map(r => ({
            ...r,
            distance: calculateDistance(userLat, userLon, r.lat, r.lon)
        }))
        .filter(r => r.distance <= radius)
        .sort((a, b) => b.rating - a.rating);
    
    console.log('Found', nearby.length, 'nearby restaurants:');
    nearby.forEach(r => {
        console.log(`- ${r.name}: ${r.distance.toFixed(2)}km, ⭐${r.rating}`);
    });
    
    return nearby;
}

// ========================================
// 12. BATTERY STATUS (Bonus!)
// ========================================
console.log('\n--- Battery Status ---');

if ('getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
        console.log('🔋 Battery level:', (battery.level * 100).toFixed(0) + '%');
        console.log('🔌 Charging:', battery.charging ? 'Yes' : 'No');
        console.log('⏱️ Time to full:', battery.chargingTime + ' seconds');
        console.log('⏱️ Time to empty:', battery.dischargingTime + ' seconds');
        
        battery.addEventListener('levelchange', () => {
            console.log('🔋 Battery changed:', (battery.level * 100).toFixed(0) + '%');
        });
    });
} else {
    console.log('❌ Battery API not supported');
}

// ========================================
// 13. BEST PRACTICES
// ========================================
console.log('\n--- Best Practices ---');

/*
✅ BEST PRACTICES:
1. Always check if API is supported before using
2. Handle permission denial gracefully
3. Show loading state while getting location
4. Use high accuracy only when needed (drains battery)
5. Cache location when appropriate
6. Clear watchPosition when done
7. Explain WHY you need location access

❌ COMMON MISTAKES:
1. Not checking for API support
2. Not handling errors properly
3. Requesting location too frequently
4. Not respecting user privacy
5. Using watchPosition unnecessarily

⚡ PERFORMANCE:
- enableHighAccuracy uses GPS (slower, more accurate)
- Set reasonable timeout values
- Use maximumAge to cache results
- Clear watch when not needed

🔐 PRIVACY:
- Always explain why you need location
- Only request when necessary
- Don't store without permission
- Provide opt-out option

🎯 USE CASES:
- Weather apps
- Store/restaurant locators
- Delivery tracking
- Location-based content
- Maps and navigation
- Proximity-based features
*/

console.log('\n🌍 Navigator & Geolocation = Location-Aware Apps!');
