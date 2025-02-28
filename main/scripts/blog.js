document.addEventListener("DOMContentLoaded", () => {
    const blogSection = document.querySelector(".blog-section");

    // Mock Blog Posts Data
    const mockPosts = [
        {
            title: "Welcome to Our Blog",
            date: "February 28, 2025",
            snippet: "We’re excited to launch the Galaxy Chat Bots blog! Stay tuned for tips, updates, and insights on AI chatbot technology.",
            link: "/blog/welcome"
        },
        {
            title: "How AI Chatbots Enhance Productivity",
            date: "February 25, 2025",
            snippet: "Discover how our chatbots streamline workflows and boost efficiency for users and businesses alike.",
            link: "/blog/productivity"
        },
        {
            title: "The Future of Conversational AI",
            date: "February 20, 2025",
            snippet: "Explore the next steps in AI evolution and how Galaxy Chat Bots is leading the way.",
            link: "/blog/future-ai"
        }
    ];

    // Function to Render Blog Posts
    function renderPosts(posts) {
        const container = document.querySelector(".container");
        container.innerHTML = "<header>Blog</header>"; // Reset content with header

        posts.forEach(post => {
            const article = document.createElement("article");
            article.classList.add("blog-post");
            article.innerHTML = `
                <h2>${post.title}</h2>
                <p><small>Posted on ${post.date}</small></p>
                <p>${post.snippet}</p>
                <a href="${post.link}" class="read-more">Read More</a>
            `;
            container.appendChild(article);
        });
    }

    // Initial Render with Mock Data
    renderPosts(mockPosts);

    // Simulate Loading Animation
    const articles = document.querySelectorAll(".blog-post");
    articles.forEach((article, index) => {
        article.style.opacity = "0";
        article.style.transform = "translateY(20px)";
        setTimeout(() => {
            article.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            article.style.opacity = "1";
            article.style.transform = "translateY(0)";
        }, index * 200); // Staggered fade-in
    });

    // Backend Integration Placeholder (Uncomment when ready)
    /*
    async function fetchBlogPosts() {
        try {
            const response = await fetch("/api/blog/posts", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) throw new Error("Failed to fetch posts");
            const posts = await response.json();
            renderPosts(posts);
        } catch (error) {
            console.error("Blog fetch error:", error);
            const errorMsg = document.createElement("p");
            errorMsg.textContent = "Failed to load blog posts. Please try again later.";
            errorMsg.style.color = "#ff0000";
            errorMsg.style.textShadow = "0 0 5px rgba(255, 0, 0, 0.5)";
            blogSection.appendChild(errorMsg);
        }
    }
    // fetchBlogPosts(); // Call this instead of renderPosts(mockPosts) with backend
    */
});
