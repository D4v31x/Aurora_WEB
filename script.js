// Wait until the entire page has loaded (images, CSS, JS)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    // Hide the loader with a smooth transition
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500); // Adjust this delay as needed, or remove if not necessary
});

// Smooth scroll for "Find out more" button
document.querySelector('.cta').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#more-info').scrollIntoView({ behavior: 'smooth' });
});

// GSAP Animations
gsap.from('.hero h1', { opacity: 0, y: -50, duration: 1, delay: 0.5 });
gsap.from('.hero p', { opacity: 0, y: 50, duration: 1, delay: 0.7 });
gsap.from('.cta', { opacity: 0, scale: 0.8, duration: 1, delay: 1 });

gsap.from('.about-company h2', { opacity: 0, y: 30, duration: 1, delay: 0.5, scrollTrigger: '#more-info' });
gsap.from('.about-company p', { opacity: 0, y: 50, duration: 1, delay: 0.7, scrollTrigger: '#more-info' });
