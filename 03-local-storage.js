// ========================================
// LOCAL STORAGE & SESSION STORAGE DEMO
// ========================================
// Real-Time Use: Save user preferences, login state, shopping cart

console.log('=== Local Storage & Session Demo ===\n');

// ========================================
// 1. LOCAL STORAGE BASICS
// ========================================
console.log('--- Local Storage Basics ---');

// Save data (persists even after browser closes)
localStorage.setItem('username', 'Arjun');
localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'Hindi');

// Retrieve data
const username = localStorage.getItem('username');
const theme = localStorage.getItem('theme');
console.log(`Username: ${username}, Theme: ${theme}`);

// Check if key exists
if (localStorage.getItem('username')) {
    console.log('User is logged in!');
}

// Remove item
localStorage.removeItem('theme');
console.log('Theme removed:', localStorage.getItem('theme')); // null

// Clear all data
// localStorage.clear(); // Uncomment to clear everything

// ========================================
// 2. STORING OBJECTS (JSON)
// ========================================
console.log('\n--- Storing Objects ---');

const userPreferences = {
    theme: 'dark',
    language: 'Hindi',
    notifications: true,
    fontSize: 16
};

// ❌ WRONG WAY - Stores as "[object Object]"
localStorage.setItem('prefs-wrong', userPreferences);
console.log('Wrong way:', localStorage.getItem('prefs-wrong'));

// ✅ RIGHT WAY - Convert to JSON string
localStorage.setItem('preferences', JSON.stringify(userPreferences));

// Retrieve and parse
const savedPrefs = JSON.parse(localStorage.getItem('preferences'));
console.log('Saved preferences:', savedPrefs);
console.log('Theme:', savedPrefs.theme);

// ========================================
// 3. SESSION STORAGE
// ========================================
console.log('\n--- Session Storage ---');

// Session storage - Data cleared when tab/browser closes
sessionStorage.setItem('sessionId', 'abc123xyz');
sessionStorage.setItem('tempData', 'This will be cleared on close');

console.log('Session ID:', sessionStorage.getItem('sessionId'));

// ========================================
// 4. PRACTICAL EXAMPLES
// ========================================
console.log('\n--- Practical Examples ---');

// Example 1: User Login State
function loginUser(username, token) {
    const loginData = {
        username: username,
        token: token,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(loginData));
    console.log(`✅ User ${username} logged in`);
}

function isUserLoggedIn() {
    return localStorage.getItem('user') !== null;
}

function logoutUser() {
    localStorage.removeItem('user');
    console.log('❌ User logged out');
}

// Demo login
loginUser('Priya', 'token_abc123');
console.log('Is logged in?', isUserLoggedIn());

// Example 2: Shopping Cart
const cart = [
    { id: 1, name: 'Laptop', price: 45000, quantity: 1 },
    { id: 2, name: 'Mouse', price: 500, quantity: 2 }
];

localStorage.setItem('cart', JSON.stringify(cart));

function getCartTotal() {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = savedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total;
}

console.log('Cart Total: ₹' + getCartTotal());

// Example 3: Form Auto-Save
function autoSaveForm() {
    const formData = {
        name: document.getElementById('name')?.value || 'Sample Name',
        email: document.getElementById('email')?.value || 'sample@example.com',
        message: document.getElementById('message')?.value || 'Sample message',
        savedAt: new Date().toLocaleString()
    };
    
    localStorage.setItem('formDraft', JSON.stringify(formData));
    console.log('📝 Form auto-saved!');
}

function restoreForm() {
    const draft = localStorage.getItem('formDraft');
    if (draft) {
        const formData = JSON.parse(draft);
        console.log('📋 Restoring form from:', formData.savedAt);
        console.log('Name:', formData.name);
        console.log('Email:', formData.email);
        return formData;
    }
    return null;
}

// Demo auto-save
autoSaveForm();
restoreForm();

// Example 4: Theme Preference
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.body.className = themeName;
    console.log(`🎨 Theme set to: ${themeName}`);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
    console.log(`🎨 Theme loaded: ${savedTheme}`);
}

setTheme('dark');

// Example 5: Recent Searches
function addRecentSearch(query) {
    let searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    // Add to beginning, keep only last 5
    searches.unshift(query);
    searches = searches.slice(0, 5);
    
    localStorage.setItem('recentSearches', JSON.stringify(searches));
    console.log('Recent searches:', searches);
}

addRecentSearch('JavaScript tutorials');
addRecentSearch('React hooks');
addRecentSearch('Node.js express');

// ========================================
// 5. STORAGE EVENT LISTENER
// ========================================
console.log('\n--- Storage Events ---');

// Listen for storage changes (works across tabs!)
window.addEventListener('storage', (e) => {
    console.log('Storage changed!');
    console.log('Key:', e.key);
    console.log('Old value:', e.oldValue);
    console.log('New value:', e.newValue);
});

// ========================================
// 6. HELPER FUNCTIONS
// ========================================
console.log('\n--- Helper Functions ---');

// Safe get with default value
function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from storage:', error);
        return defaultValue;
    }
}

// Safe set
function setToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error writing to storage:', error);
        return false;
    }
}

// Check storage size (approximate)
function getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    return (total / 1024).toFixed(2) + ' KB';
}

console.log('Storage size:', getStorageSize());

// ========================================
// 7. BEST PRACTICES
// ========================================
console.log('\n--- Best Practices ---');

/*
✅ DO:
- Store user preferences (theme, language)
- Store authentication tokens
- Cache API responses temporarily
- Save form drafts
- Store shopping cart items

❌ DON'T:
- Store sensitive data (passwords, credit cards)
- Store large amounts of data (use IndexedDB instead)
- Store data that needs to be synced across devices
- Rely on it being available (users can disable it)

⚠️ LIMITATIONS:
- Storage limit: ~5-10 MB per domain
- Synchronous (blocks main thread)
- String values only (must JSON stringify/parse)
- Not secure (anyone can access via console)
*/

console.log('\n💾 Local Storage is perfect for user preferences and login state!');
