// ========================================
// EVENT DELEGATION DEMO
// ========================================
// Use single parent listener to manage thousands of buttons - HUGE performance boost!

console.log('=== Event Delegation Demo ===\n');

// ========================================
// 1. THE PROBLEM (Without Event Delegation)
// ========================================
console.log('--- The Problem ---');

// ❌ BAD APPROACH: Adding listener to each button individually
function badApproach() {
    const buttons = document.querySelectorAll('.button');
    
    // This adds 1000 event listeners if you have 1000 buttons!
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Button clicked:', e.target.textContent);
        });
    });
    
    console.log('❌ Added', buttons.length, 'event listeners (memory intensive!)');
}

// Problems with this approach:
// 1. Memory intensive (1000 buttons = 1000 listeners)
// 2. Slow for dynamic content (need to re-attach listeners)
// 3. Can cause memory leaks if not cleaned up

// ========================================
// 2. THE SOLUTION (Event Delegation)
// ========================================
console.log('\n--- The Solution ---');

// ✅ GOOD APPROACH: One listener on parent element
function goodApproach() {
    const parent = document.querySelector('.button-container');
    
    // Single event listener on parent!
    parent.addEventListener('click', function(e) {
        // Check if clicked element is a button
        if (e.target.matches('.button')) {
            console.log('Button clicked:', e.target.textContent);
            handleButtonClick(e.target);
        }
    });
    
    console.log('✅ Added only 1 event listener for all buttons!');
}

function handleButtonClick(button) {
    console.log('Handling click for:', button.textContent);
    // Your button logic here
}

// ========================================
// 3. HOW EVENT DELEGATION WORKS
// ========================================
console.log('\n--- How It Works ---');

/*
Event Bubbling:
┌─────────────────┐
│   Document      │
└────────┬────────┘
         │ ↑ Bubbles up
┌────────┴────────┐
│   Parent Div    │ ← We listen here!
└────────┬────────┘
         │ ↑
┌────────┴────────┐
│   Button        │ ← User clicks here
└─────────────────┘

When user clicks button:
1. Click event fires on button
2. Event bubbles up to parent
3. Parent's listener catches it
4. We check what was clicked
5. Handle accordingly
*/

// ========================================
// 4. PRACTICAL EXAMPLE - TODO LIST
// ========================================
console.log('\n--- Practical Example: Todo List ---');

// HTML Structure (imagine this):
/*
<ul id="todoList">
    <li>
        <span class="todo-text">Buy groceries</span>
        <button class="delete-btn">Delete</button>
        <button class="edit-btn">Edit</button>
    </li>
    <li>...</li>
</ul>
*/

function setupTodoList() {
    const todoList = document.getElementById('todoList');
    
    // Single event listener for ALL todos (even future ones!)
    todoList?.addEventListener('click', function(e) {
        // Delete button clicked
        if (e.target.matches('.delete-btn')) {
            const todoItem = e.target.closest('li');
            console.log('🗑️ Deleting:', todoItem?.querySelector('.todo-text')?.textContent);
            todoItem?.remove();
        }
        
        // Edit button clicked
        if (e.target.matches('.edit-btn')) {
            const todoText = e.target.closest('li')?.querySelector('.todo-text');
            console.log('✏️ Editing:', todoText?.textContent);
            // Edit logic here
        }
        
        // Todo text clicked (mark complete)
        if (e.target.matches('.todo-text')) {
            console.log('✅ Toggling complete:', e.target.textContent);
            e.target.classList.toggle('completed');
        }
    });
    
    console.log('✨ Todo list ready! All buttons handled with 1 listener.');
}

setupTodoList();

// ========================================
// 5. DYNAMIC CONTENT EXAMPLE
// ========================================
console.log('\n--- Dynamic Content ---');

function setupDynamicList() {
    const container = document.getElementById('dynamicContainer');
    
    // Event delegation handles future elements automatically!
    container?.addEventListener('click', function(e) {
        if (e.target.matches('.dynamic-item')) {
            console.log('Clicked:', e.target.textContent);
        }
    });
    
    // Add new items dynamically - listeners work automatically!
    function addNewItem(text) {
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item';
        newItem.textContent = text;
        container?.appendChild(newItem);
        console.log('➕ Added:', text, '(no new listener needed!)');
    }
    
    // Simulate adding items
    setTimeout(() => addNewItem('New Item 1'), 1000);
    setTimeout(() => addNewItem('New Item 2'), 2000);
}

setupDynamicList();

// ========================================
// 6. COMPLEX EXAMPLE - DATA ATTRIBUTES
// ========================================
console.log('\n--- Using Data Attributes ---');

/*
<div id="productList">
    <div class="product" data-id="1" data-price="999">
        <h3>Product 1</h3>
        <button class="add-to-cart">Add to Cart</button>
        <button class="view-details">View</button>
    </div>
</div>
*/

function setupProductList() {
    const productList = document.getElementById('productList');
    
    productList?.addEventListener('click', function(e) {
        const product = e.target.closest('.product');
        
        if (e.target.matches('.add-to-cart')) {
            const productId = product?.dataset.id;
            const price = product?.dataset.price;
            console.log(`🛒 Added to cart: Product #${productId}, Price: ₹${price}`);
        }
        
        if (e.target.matches('.view-details')) {
            const productId = product?.dataset.id;
            console.log(`👁️ Viewing details for Product #${productId}`);
        }
    });
}

setupProductList();

// ========================================
// 7. PERFORMANCE COMPARISON
// ========================================
console.log('\n--- Performance Comparison ---');

function performanceDemo() {
    console.time('Without Delegation');
    // Simulate 1000 individual listeners
    for (let i = 0; i < 1000; i++) {
        const btn = { addEventListener: () => {} };
        btn.addEventListener('click', () => {});
    }
    console.timeEnd('Without Delegation');
    
    console.time('With Delegation');
    // Single listener
    const parent = { addEventListener: () => {} };
    parent.addEventListener('click', () => {});
    console.timeEnd('With Delegation');
    
    console.log('⚡ Delegation is ~1000x faster!');
}

performanceDemo();

// ========================================
// 8. REAL-WORLD USE CASES
// ========================================
console.log('\n--- Real-World Use Cases ---');

// Use Case 1: Social Media Feed
function setupSocialFeed() {
    const feed = document.getElementById('feed');
    
    feed?.addEventListener('click', function(e) {
        const post = e.target.closest('.post');
        const postId = post?.dataset.id;
        
        if (e.target.matches('.like-btn')) {
            console.log(`❤️ Liked post ${postId}`);
        }
        if (e.target.matches('.comment-btn')) {
            console.log(`💬 Commenting on post ${postId}`);
        }
        if (e.target.matches('.share-btn')) {
            console.log(`📤 Sharing post ${postId}`);
        }
    });
}

// Use Case 2: E-commerce Filters
function setupFilters() {
    const filterPanel = document.getElementById('filters');
    
    filterPanel?.addEventListener('change', function(e) {
        if (e.target.matches('.filter-checkbox')) {
            const filterType = e.target.dataset.filter;
            const value = e.target.value;
            console.log(`🔍 Filter applied: ${filterType} = ${value}`);
        }
    });
}

// Use Case 3: Table Row Actions
function setupTable() {
    const table = document.querySelector('table');
    
    table?.addEventListener('click', function(e) {
        const row = e.target.closest('tr');
        const userId = row?.dataset.userId;
        
        if (e.target.matches('.edit-btn')) {
            console.log(`✏️ Edit user ${userId}`);
        }
        if (e.target.matches('.delete-btn')) {
            console.log(`🗑️ Delete user ${userId}`);
        }
        if (e.target.matches('.view-btn')) {
            console.log(`👁️ View user ${userId}`);
        }
    });
}

// ========================================
// 9. ADVANCED TECHNIQUES
// ========================================
console.log('\n--- Advanced Techniques ---');

// Technique 1: Stop Propagation when needed
function advancedDelegation() {
    const container = document.getElementById('container');
    
    container?.addEventListener('click', function(e) {
        // Handle nested elements
        if (e.target.matches('.inner-button')) {
            console.log('Inner button clicked');
            e.stopPropagation(); // Don't bubble to outer handler
            return;
        }
        
        if (e.target.matches('.outer-button')) {
            console.log('Outer button clicked');
        }
    });
}

// Technique 2: Multiple event types
function multipleEvents() {
    const form = document.getElementById('form');
    
    // Handle multiple event types with delegation
    ['click', 'change', 'input'].forEach(eventType => {
        form?.addEventListener(eventType, function(e) {
            console.log(`${eventType} on`, e.target.name || e.target.className);
        });
    });
}

// ========================================
// 10. BEST PRACTICES
// ========================================
console.log('\n--- Best Practices ---');

/*
✅ USE EVENT DELEGATION WHEN:
- You have many similar elements (buttons, list items)
- Elements are added/removed dynamically
- You need better performance
- Working with large lists (100+ items)

❌ DON'T USE WHEN:
- Only 1-2 elements (overhead not worth it)
- Need to stop propagation on child
- Events don't bubble (focus, blur, scroll)

⚡ PERFORMANCE BENEFITS:
- 1 listener vs 1000 listeners
- Lower memory usage
- Faster initial page load
- Automatic handling of dynamic content
- Easy cleanup (remove 1 listener vs many)

🎯 COMMON SELECTORS:
- e.target.matches('.class') - check class
- e.target.closest('.parent') - find parent element
- e.target.dataset.id - access data attributes
*/

console.log('\n🚀 Event Delegation = Better Performance + Cleaner Code!');
