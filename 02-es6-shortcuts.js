// ========================================
// ES6+ SHORTCUTS DEMO
// ========================================
// Optional Chaining (?.) and Destructuring - Reduce code by 50%!

console.log('=== ES6+ Shortcuts Demo ===\n');

// ========================================
// 1. OPTIONAL CHAINING (?.)
// ========================================
console.log('--- Optional Chaining ---');

const user = {
    name: 'John Doe',
    address: {
        city: 'New York',
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        }
    }
};

// ❌ OLD WAY (Verbose and error-prone)
const oldWayZipcode = user && user.address && user.address.zipcode;
console.log('Old way zipcode:', oldWayZipcode); // undefined

// ✅ NEW WAY (Clean and safe)
const newWayZipcode = user?.address?.zipcode;
console.log('New way zipcode:', newWayZipcode); // undefined

// Deep nesting example
const latitude = user?.address?.coordinates?.lat;
console.log('Latitude:', latitude); // 40.7128

// Works with arrays too!
const users = [
    { name: 'Alice', posts: [{ title: 'Post 1' }] },
    { name: 'Bob' }
];

console.log('First user first post:', users[0]?.posts?.[0]?.title); // "Post 1"
console.log('Second user first post:', users[1]?.posts?.[0]?.title); // undefined

// ========================================
// 2. DESTRUCTURING - Objects
// ========================================
console.log('\n--- Object Destructuring ---');

const person = {
    firstName: 'Arjun',
    lastName: 'Sharma',
    age: 28,
    job: {
        title: 'Developer',
        company: 'Tech Corp',
        salary: 100000
    }
};

// ❌ OLD WAY
const firstName = person.firstName;
const lastName = person.lastName;
const age = person.age;

// ✅ NEW WAY - Extract multiple values in one line
const { firstName: fName, lastName: lName, age: personAge } = person;
console.log(fName, lName, personAge); // Arjun Sharma 28

// Nested destructuring
const { job: { title, company } } = person;
console.log(`${title} at ${company}`); // Developer at Tech Corp

// Default values
const { city = 'Unknown', country = 'India' } = person;
console.log('City:', city); // Unknown (not in object)
console.log('Country:', country); // India (default value)

// ========================================
// 3. DESTRUCTURING - Arrays
// ========================================
console.log('\n--- Array Destructuring ---');

const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

// ✅ Extract first few elements
const [primary, secondary, tertiary] = colors;
console.log(primary, secondary, tertiary); // red green blue

// Skip elements with commas
const [first, , third] = colors;
console.log(first, third); // red blue

// Rest operator
const [head, ...rest] = colors;
console.log('Head:', head); // red
console.log('Rest:', rest); // ['green', 'blue', 'yellow', 'orange']

// ========================================
// 4. SPREAD OPERATOR (...)
// ========================================
console.log('\n--- Spread Operator ---');

// Combine arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log('Combined:', combined); // [1, 2, 3, 4, 5, 6]

// Clone arrays
const original = [1, 2, 3];
const clone = [...original];
console.log('Clone:', clone); // [1, 2, 3]

// Combine objects
const baseUser = { name: 'Raj', age: 25 };
const userWithEmail = { ...baseUser, email: 'raj@example.com' };
console.log('User with email:', userWithEmail);

// Override properties
const updatedUser = { ...baseUser, age: 26 };
console.log('Updated user:', updatedUser); // age is now 26

// ========================================
// 5. TEMPLATE LITERALS
// ========================================
console.log('\n--- Template Literals ---');

const product = 'Laptop';
const price = 45000;
const discount = 10;

// ❌ OLD WAY
const oldMessage = 'Product: ' + product + ', Price: ₹' + price + ', Discount: ' + discount + '%';

// ✅ NEW WAY
const newMessage = `Product: ${product}, Price: ₹${price}, Discount: ${discount}%`;
console.log(newMessage);

// Multi-line strings
const invoice = `
    Invoice
    -------
    Product: ${product}
    Price: ₹${price}
    Discount: ${discount}%
    Total: ₹${price - (price * discount / 100)}
`;
console.log(invoice);

// ========================================
// 6. ARROW FUNCTIONS
// ========================================
console.log('\n--- Arrow Functions ---');

// ❌ OLD WAY
function oldAdd(a, b) {
    return a + b;
}

// ✅ NEW WAY
const newAdd = (a, b) => a + b;
console.log('Add:', newAdd(5, 3)); // 8

// With array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter(n => n % 2 === 0);
console.log('Evens:', evens); // [2, 4]

// ========================================
// 7. NULLISH COALESCING (??)
// ========================================
console.log('\n--- Nullish Coalescing ---');

const value1 = null;
const value2 = 0;
const value3 = '';

// ?? only checks for null/undefined (not falsy values like 0 or '')
console.log(value1 ?? 'default'); // 'default'
console.log(value2 ?? 'default'); // 0
console.log(value3 ?? 'default'); // ''

// Compare with || (checks all falsy values)
console.log(value2 || 'default'); // 'default'
console.log(value3 || 'default'); // 'default'

// ========================================
// PRACTICAL EXAMPLE - Combining Everything
// ========================================
console.log('\n--- Real-World Example ---');

const apiResponse = {
    status: 'success',
    data: {
        user: {
            name: 'Priya',
            email: 'priya@example.com',
            preferences: {
                theme: 'dark'
            }
        }
    }
};

// Extract and use with defaults
const {
    data: {
        user: {
            name: userName,
            email: userEmail,
            preferences: { theme = 'light', language = 'en' } = {}
        } = {}
    } = {}
} = apiResponse;

console.log(`User: ${userName}`);
console.log(`Email: ${userEmail}`);
console.log(`Theme: ${theme}`);
console.log(`Language: ${language}`);

// Safe access with optional chaining
const notifications = apiResponse?.data?.user?.notifications?.length ?? 0;
console.log(`Notifications: ${notifications}`);

console.log('\n✨ Code reduced by 50% with ES6+ features!');
