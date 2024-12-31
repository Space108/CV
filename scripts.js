window.addEventListener('load', () => {
    gsap.timeline()
        .to('.parallax h1', {y: 0, opacity: 1, duration: 1, ease: 'power2.out'})
        .to('.parallax h2', {y: 0, opacity: 1, duration: 1, ease: 'power2.out'}, '-=0.5');
});

document.addEventListener("DOMContentLoaded", function () {
    const titleElement = document.querySelector('.parallax-1 h1');
    const titleText = "Михаил\nКолядин QA The tester\nиз ГАЛАКТИКИ МЛЕЧНЫЙ ПУТЬ";
    titleElement.innerHTML = "";

    let index = 0;
    function printTitle() {
        if (index < titleText.length) {
            titleElement.innerHTML += titleText.charAt(index);
            index++;
            setTimeout(printTitle, 100);
        }
    }

    printTitle();
});

gsap.registerPlugin(ScrollTrigger);

gsap.from(".parallax-1 h1, .parallax-1 h2", {
    scrollTrigger: {
        trigger: ".parallax-1",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: -20,
    duration: 1,
    stagger: 0.5,
    ease: "power3.out"
});

document.querySelectorAll("section").forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });
});

const scrollTopButton = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth' });
});
