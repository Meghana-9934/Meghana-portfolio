(() => {
    const style = document.createElement("style");

    style.textContent = `
        @keyframes heroFadeUp {
            from {
                opacity: 0;
                transform: translateY(22px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        #home .home-content > * {
            animation: heroFadeUp 0.8s ease both;
        }

        #home .home-content > *:nth-child(1) {
            animation-delay: 0.1s;
        }

        #home .home-content > *:nth-child(2) {
            animation-delay: 0.25s;
        }

        #home .home-content > *:nth-child(3) {
            animation-delay: 0.4s;
        }

        #home .home-content > *:nth-child(4) {
            animation-delay: 0.55s;
        }

        #home .home-content > *:nth-child(5) {
            animation-delay: 0.7s;
        }

        #home .home-content > *:nth-child(6) {
            animation-delay: 0.85s;
        }

        .scroll-reveal {
    opacity: 0;
    translate: 0 24px;
    transition:
        opacity 0.7s ease,
        translate 0.7s ease;
}

.scroll-reveal.is-visible {
    opacity: 1;
    translate: 0 0;
}

@media (prefers-reduced-motion: reduce) {
    .scroll-reveal {
        animation: none !important;
        opacity: 1 !important;
        translate: none !important;
        transition: none !important;
    }
}

        @media (prefers-reduced-motion: reduce) {
            #home .home-content > *,
            .scroll-reveal {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
            }
        }
    `;

    document.head.appendChild(style);

    const home = document.querySelector("#home");
    const homeChildren = home
        ? home.querySelectorAll(".home-content > *")
        : [];

   const sections = document.querySelectorAll("section:not(#home)");
    const animatedElements = [];

    sections.forEach((section) => {
        const heading = section.querySelector(":scope > h2");

        if (heading) {
            animatedElements.push(heading);
        }

        const content = Array.from(section.children).filter(
            (element) => element !== heading
        );

        content.forEach((element) => {
            animatedElements.push(element);
        });
    });

    animatedElements.forEach((element) => {
        element.classList.add("scroll-reveal");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }
})();
