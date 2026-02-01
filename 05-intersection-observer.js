// ========================================
// INTERSECTION OBSERVER API DEMO
// ========================================
// Animate items on scroll + Lazy Loading images = Performance Boost!

console.log('=== Intersection Observer Demo ===\n');

// ========================================
// 1. BASIC INTERSECTION OBSERVER
// ========================================
console.log('--- Basic Setup ---');

// Create an observer
const basicObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('✅ Element is visible:', entry.target);
            entry.target.classList.add('visible');
        } else {
            console.log('❌ Element is hidden:', entry.target);
        }
    });
});

// Observe elements
document.querySelectorAll('.observe-me').forEach(element => {
    basicObserver.observe(element);
});

console.log('👁️ Observer created and watching elements!');

// ========================================
// 2. LAZY LOADING IMAGES
// ========================================
console.log('\n--- Lazy Loading Images ---');

/*
HTML Structure:
<img 
    class="lazy-image" 
    src="placeholder.jpg" 
    data-src="actual-image.jpg"
    alt="Description"
/>
*/

function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Load the actual image
                const actualSrc = img.dataset.src;
                if (actualSrc) {
                    console.log('📷 Loading image:', actualSrc);
                    
                    img.src = actualSrc;
                    img.classList.add('loaded');
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            }
        });
    }, {
        // Load image when 10% visible
        threshold: 0.1,
        // Start loading 50px before entering viewport
        rootMargin: '50px'
    });

    // Observe all lazy images
    document.querySelectorAll('.lazy-image').forEach(img => {
        imageObserver.observe(img);
    });
    
    console.log('🚀 Lazy loading enabled! Images load only when needed.');
}

setupLazyLoading();

// ========================================
// 3. SCROLL ANIMATIONS
// ========================================
console.log('\n--- Scroll Animations ---');

function setupScrollAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element enters viewport
                entry.target.classList.add('animate-in');
                console.log('✨ Animating:', entry.target.className);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% visible
    });

    // Observe elements to animate
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animationObserver.observe(element);
    });
}

setupScrollAnimations();

/*
CSS for animations:
.animate-on-scroll {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.6s ease;
}

.animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
}
*/

// ========================================
// 4. INFINITE SCROLL
// ========================================
console.log('\n--- Infinite Scroll ---');

function setupInfiniteScroll() {
    let page = 1;
    let loading = false;
    
    // Observe the last element in list
    const infiniteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !loading) {
                loading = true;
                console.log('⬇️ Loading more content... Page:', page);
                
                // Simulate API call
                setTimeout(() => {
                    loadMoreItems(page);
                    page++;
                    loading = false;
                    console.log('✅ Content loaded!');
                }, 1000);
            }
        });
    }, {
        rootMargin: '100px' // Load before reaching bottom
    });

    function loadMoreItems(pageNum) {
        const container = document.getElementById('infiniteList');
        
        // Simulate adding new items
        for (let i = 1; i <= 10; i++) {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.textContent = `Page ${pageNum}, Item ${i}`;
            container?.appendChild(item);
        }
        
        // Observe the new last item
        const lastItem = container?.lastElementChild;
        if (lastItem) {
            infiniteObserver.observe(lastItem);
        }
    }
    
    // Start observing
    const sentinel = document.querySelector('.infinite-scroll-sentinel');
    if (sentinel) {
        infiniteObserver.observe(sentinel);
    }
}

setupInfiniteScroll();

// ========================================
// 5. VIDEO AUTO-PLAY
// ========================================
console.log('\n--- Video Auto-Play ---');

function setupVideoAutoPlay() {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                console.log('▶️ Playing video');
                video.play().catch(err => {
                    console.log('Video play failed:', err.message);
                });
            } else {
                console.log('⏸️ Pausing video');
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Play when 50% visible
    });

    document.querySelectorAll('video.auto-play').forEach(video => {
        videoObserver.observe(video);
    });
}

setupVideoAutoPlay();

// ========================================
// 6. PROGRESS INDICATOR
// ========================================
console.log('\n--- Reading Progress Indicator ---');

function setupProgressIndicator() {
    const sections = document.querySelectorAll('section');
    const progressBar = document.getElementById('progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                console.log('📖 Reading section:', sectionId);
                
                // Update progress bar
                const progress = (entry.target.dataset.section / sections.length) * 100;
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach((section, index) => {
        section.dataset.section = String(index + 1);
        progressObserver.observe(section);
    });
}

setupProgressIndicator();

// ========================================
// 7. ANALYTICS TRACKING
// ========================================
console.log('\n--- View Tracking ---');

function setupViewTracking() {
    const tracked = new Set();
    
    const trackingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elementId = entry.target.id;
                
                // Track only once
                if (!tracked.has(elementId)) {
                    tracked.add(elementId);
                    console.log('📊 Tracked view:', elementId);
                    
                    // Send to analytics
                    trackView(elementId);
                }
            }
        });
    }, {
        threshold: 0.8 // Consider "viewed" when 80% visible
    });

    function trackView(elementId) {
        // Send to analytics service
        console.log('Sending to analytics:', {
            event: 'element_view',
            element: elementId,
            timestamp: new Date().toISOString()
        });
    }

    document.querySelectorAll('[data-track]').forEach(element => {
        trackingObserver.observe(element);
    });
}

setupViewTracking();

// ========================================
// 8. ADVANCED OPTIONS
// ========================================
console.log('\n--- Advanced Configuration ---');

const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log('Intersection Ratio:', entry.intersectionRatio);
        console.log('Is Intersecting:', entry.isIntersecting);
        console.log('Bounding Rect:', entry.boundingClientRect);
    });
}, {
    // Root element (null = viewport)
    root: null,
    
    // Margin around root (load earlier/later)
    rootMargin: '0px 0px -100px 0px', // bottom: -100px
    
    // Multiple thresholds
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
});

// ========================================
// 9. PERFORMANCE BEST PRACTICES
// ========================================
console.log('\n--- Performance Tips ---');

function performantObserver() {
    const observer = new IntersectionObserver((entries) => {
        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Do expensive operations here
                    entry.target.classList.add('visible');
                    
                    // Unobserve if animation only happens once
                    observer.unobserve(entry.target);
                }
            });
        });
    }, {
        threshold: 0.1
    });

    return observer;
}

const perfObserver = performantObserver();

// ========================================
// 10. REAL-WORLD EXAMPLES
// ========================================
console.log('\n--- Real-World Use Cases ---');

// Example 1: Product Card Animation (E-commerce)
function setupProductCards() {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.product-card').forEach(card => {
        cardObserver.observe(card);
    });
    
    console.log('🛍️ Product cards ready to animate!');
}

setupProductCards();

// Example 2: Social Media Feed (Load on scroll)
function setupSocialFeed() {
    let postNumber = 1;
    
    const feedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('📱 Loading social media posts...');
                
                // Load next batch of posts
                loadPosts(5);
                postNumber += 5;
            }
        });
    });

    function loadPosts(count) {
        const feed = document.getElementById('socialFeed');
        for (let i = 0; i < count; i++) {
            const post = document.createElement('div');
            post.className = 'post';
            post.innerHTML = `<h3>Post ${postNumber + i}</h3>`;
            feed?.appendChild(post);
        }
    }

    const loadMore = document.querySelector('.load-more-trigger');
    if (loadMore) {
        feedObserver.observe(loadMore);
    }
}

setupSocialFeed();

// Example 3: Parallax Effect
function setupParallax() {
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const scrolled = entry.boundingClientRect.top;
            const parallaxSpeed = 0.5;
            
            if (entry.isIntersecting) {
                entry.target.style.transform = 
                    `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    });

    document.querySelectorAll('.parallax').forEach(element => {
        parallaxObserver.observe(element);
    });
}

setupParallax();

// ========================================
// 11. CLEANUP & BEST PRACTICES
// ========================================
console.log('\n--- Cleanup & Best Practices ---');

/*
✅ BEST PRACTICES:
1. Unobserve elements after animation completes (one-time animations)
2. Use appropriate threshold values (0.1 - 0.5 usually good)
3. Use rootMargin to load content earlier/later
4. Combine with requestAnimationFrame for smooth animations
5. Track what's already loaded to avoid duplicates

❌ COMMON MISTAKES:
1. Not unobserving elements (memory leak)
2. Too many observers (create one, reuse it)
3. Not checking isIntersecting flag
4. Forgetting to handle loading states

⚡ PERFORMANCE:
- Much better than scroll event listeners
- Browser-optimized (runs on separate thread)
- Automatically handles performance

🎯 USE CASES:
- Lazy loading images/videos
- Infinite scroll
- Scroll animations
- Analytics tracking
- Auto-playing videos
- Progressive content loading
*/

// Cleanup function
function cleanup() {
    // Disconnect all observers when page unloads
    window.addEventListener('beforeunload', () => {
        basicObserver.disconnect();
        console.log('🧹 Observers cleaned up!');
    });
}

cleanup();

console.log('\n👁️ Intersection Observer = Better UX + Performance!');
