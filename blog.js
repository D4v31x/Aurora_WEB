// blog.js
import { getAllPosts, getPostBySlug } from './posts.js';

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
}

// Get initials helper
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
}

// Create post element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.onclick = () => window.location.hash = `post/${post.slug}`;
    
    article.innerHTML = `
        <div class="blog-content">
            <span class="category">${post.category}</span>
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 150)}...</p>
            <div class="blog-meta">
                <div class="blog-author">
                    <i class="fas fa-user-circle"></i>
                    <span>${post.authorName}</span>
                </div>
                <span><i class="far fa-clock"></i> ${formatDate(post.createdAt)}</span>
            </div>
        </div>
    `;
    return article;
}

// Filter and search posts
function filterAndSearchPosts() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const blogGrid = document.getElementById('blogGrid');
    const posts = getAllPosts();

    // Clear the grid
    blogGrid.innerHTML = '';

    // Filter posts based on both search query and category
    const filteredPosts = posts.filter(post => {
        const matchesSearch = 
            post.title.toLowerCase().includes(searchQuery) ||
            post.content.toLowerCase().includes(searchQuery) ||
            post.category.toLowerCase().includes(searchQuery) ||
            post.authorName.toLowerCase().includes(searchQuery);

        const matchesCategory = 
            selectedCategory === '' || 
            post.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Display filtered posts
    filteredPosts.forEach(post => {
        blogGrid.appendChild(createPostElement(post));
    });
}

// Show blog list
function showBlogList() {
    const blogGrid = document.getElementById('blogGrid');
    const postContainer = document.getElementById('postContainer');
    const blogControls = document.querySelector('.blog-controls');
    const blogHeader = document.querySelector('.blog-header');

    if (blogGrid) blogGrid.style.display = 'grid';
    if (blogControls) blogControls.style.display = 'flex';
    if (blogHeader) blogHeader.style.display = 'block';
    if (postContainer) postContainer.style.display = 'none';

    // Initial load of all posts
    filterAndSearchPosts();
}

// Show single post
function showPost(slug) {
    const post = getPostBySlug(slug);
    if (!post) {
        window.location.hash = '';
        return;
    }

    const blogGrid = document.getElementById('blogGrid');
    const postContainer = document.getElementById('postContainer');
    const blogControls = document.querySelector('.blog-controls');
    const blogHeader = document.querySelector('.blog-header');

    if (blogGrid) blogGrid.style.display = 'none';
    if (blogControls) blogControls.style.display = 'none';
    if (blogHeader) blogHeader.style.display = 'none';
    if (postContainer) {
        postContainer.style.display = 'block';
        postContainer.innerHTML = `
            <a href="#" class="back-button">
                <i class="fas fa-arrow-left"></i>
                Back to Blog
            </a>
            <article class="post-header">
                <span class="category">
                    <i class="fas fa-tag"></i>
                    ${post.category}
                </span>
                <h1 class="post-title">${post.title}</h1>
                <div class="post-meta">
                    <div class="author">
                        <div class="author-avatar">${getInitials(post.authorName)}</div>
                        <div>
                            <div style="margin-bottom: 4px; font-weight: 500;">${post.authorName}</div>
                            <div style="font-size: 14px; opacity: 0.8">Aurora Team</div>
                        </div>
                    </div>
                    <div class="post-date">
                        <div style="text-align: right; margin-bottom: 4px">Published on</div>
                        <div style="font-size: 14px; opacity: 0.8">${new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</div>
                    </div>
                </div>
                <div class="post-content">
                    ${post.content}
                </div>
            </article>
        `;
    }
}

// Handle hash changes
function handleHashChange() {
    const hash = window.location.hash;
    if (hash.startsWith('#post/')) {
        const slug = hash.replace('#post/', '');
        showPost(slug);
    } else {
        showBlogList();
    }
}

// Initialize the blog
function initializeBlog() {
    // Add post container if it doesn't exist
    if (!document.getElementById('postContainer')) {
        const postContainer = document.createElement('div');
        postContainer.id = 'postContainer';
        postContainer.className = 'post-container';
        postContainer.style.display = 'none';
        document.querySelector('.blog-container').appendChild(postContainer);
    }

    // Set up event listeners
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', handleHashChange);

    // Set up search and filter listeners
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterAndSearchPosts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSearchPosts);
    }

    // Initial load
    handleHashChange();
}

export { initializeBlog };