// posts.js
const blogPosts = [
  {
    id: "1",
    slug: "aurora-website",
    title: "Introducing Aurora Software Website",
    category: "Announcement",
    content: `
<h1>Welcome to the New Aurora Software Website!</h1>

<p>I'm thrilled to announce the official launch of the new Aurora Software website! Join me as I walk you through what you'll find here, share some behind-the-scenes insights, and give you important updates about Aurora Music.</p>

<h2>What's This All About?</h2>
<p>This website serves as your go-to destination for everything related to Aurora Software projects. Here, you'll find the latest updates, development progress, and important announcements as they happen.</p>

<p>You might wonder about our choice of domain and platform. The decision comes down to two key factors: professional quality and long-term commitment. While free hosting platforms are available, we've invested in a solution that gives us complete control over your experience. This allows us to maintain the high standards you expect from Aurora Software.</p>

<p>Our website is intentionally built using HTML and JavaScript for optimal security and performance. For transparency, you can explore our website's repository to understand how everything works. We kindly ask that you respect our intellectual property by not redistributing or repurposing the code under a different name.</p>

<h2>What's Coming Next?</h2>
<p>We have exciting developments in the pipeline for Aurora Music:</p>
<ul>
    <li>Continuous optimization improvements</li>
    <li>New feature implementations</li>
    <li>Enhanced user experience updates</li>
</ul>

<p>A special note for our iPhone users: The iOS version is actively under development. While we can't provide an exact release date, we're making steady progress. We appreciate your patience and promise it will be worth the wait!</p>

<h2>Your Feedback Powers Our Progress</h2>
<p>Community feedback is invaluable to us. If you encounter any issues while using Aurora Music, please don't hesitate to report them. Every bug report, suggestion, and feature request helps shape the future of our software.</p>

<p>Want to contribute? Here's how:</p>
<ul>
    <li>Report bugs when you find them</li>
    <li>Share your feature suggestions</li>
    <li>Tell us about your user experience</li>
    <li>Spread the word about Aurora Music</li>
</ul>

<p>You can find all our contact information in the "Contact" section of the website. We're always eager to hear from our users!</p>

<h2>Stay Connected</h2>
<p>Thank you for your continued support and trust in Aurora Software. Your enthusiasm drives us to make Aurora Music better every day.</p>

<p>Let's build something amazing together!</p>

<p class="signature">— David<br>
Creator, Aurora Software</p>
    `,
    authorName: "Aurora Team",
    createdAt: "2024-10-26"
  },
  // Add more posts here
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}
