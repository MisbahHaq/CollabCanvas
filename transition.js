document.addEventListener("DOMContentLoaded", () => {
    const ease = "power4.inOut";
    const blocks = document.querySelectorAll(".block");

    console.log("✅ transition.js loaded");

    // Trigger page transition OUT on link click
    document.querySelectorAll("a[href]").forEach((link) => {
        const href = link.getAttribute("href");

        // Skip external or same-page links
        if (!href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                animateTransition().then(() => {
                    window.location.href = href;
                });
            });
        }
    });

    // Initial page reveal transition
    revealTransition().then(() => {
        console.log("🎉 reveal done");
        gsap.set(blocks, { visibility: "hidden" });
    });
    function revealTransition() {
        return new Promise(resolve => {
            gsap.set(".block", { scaleY: 1, visibility: "visible" });
            gsap.to(".block", {
                scaleY: 0,
                duration: 1,
                stagger: { each: 0.1, from: "start" },
                ease: "power4.inOut",
                onComplete: resolve,
            });
        });
    }


    function animateTransition() {
        return new Promise((resolve) => {
            gsap.set(blocks, { visibility: "visible", scaleY: 0 });
            gsap.to(blocks, {
                scaleY: 1,
                duration: 1,
                stagger: { each: 0.1, from: "start" },
                ease,
                onComplete: resolve,
            });
        });
    }
});
