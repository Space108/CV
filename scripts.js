gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-kicker", { opacity: 0, y: 16, duration: 0.6 })
        .from(".hero h1", { opacity: 0, y: 25, duration: 0.8 }, "-=0.3")
        .from(".hero-subtitle", { opacity: 0, y: 18, duration: 0.7 }, "-=0.45")
        .from(".hero-tags span", { opacity: 0, y: 14, duration: 0.4, stagger: 0.07 }, "-=0.45");
});

gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 84%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out"
    });
});

gsap.utils.toArray(".skill-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%"
        },
        opacity: 0,
        y: 24,
        duration: 0.55,
        delay: i * 0.06
    });
});

gsap.to(".hero-nebula", {
    xPercent: 4,
    yPercent: -3,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

const scrollTopButton = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
});

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
