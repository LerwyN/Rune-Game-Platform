

const filterButton = document.querySelector(".filter-button");
const filterPanel = document.querySelector(".filter-panel");

if (filterButton && filterPanel) {
    filterButton.addEventListener("click", () => {
        filterPanel.classList.toggle("show");
    });
}


const navMiddle = document.querySelector(".navbar-middle");
const activePill = document.querySelector(".nav-active-pill");

if (navMiddle && activePill) {
    const navLinks = navMiddle.querySelectorAll("a");
    const activeLink = navMiddle.querySelector("a.active");
    function moveActivePill(link) {
        if (!link) return;
        activePill.style.left = `${link.offsetLeft}px`;
        activePill.style.top = `${link.offsetTop}px`;
        activePill.style.width = `${link.offsetWidth}px`;
        activePill.style.height = `${link.offsetHeight}px`;
    }
    if (activeLink) {
        activePill.style.transition = "none";
        moveActivePill(activeLink);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                activePill.style.transition =
                    "all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)";
            });
        });
    }

    navLinks.forEach(link => {
    link.addEventListener("click", event => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        if (link.classList.contains("active")) return;
        event.preventDefault();
        navLinks.forEach(navLink => {
            navLink.classList.remove("active");
        });
        link.classList.add("active");
        moveActivePill(link);
        setTimeout(() => {
            window.location.href = link.href;
        }, 350);
    });
    });


    window.addEventListener("resize", () => {
        const currentActiveLink = navMiddle.querySelector("a.active");
        if (currentActiveLink) moveActivePill(currentActiveLink);
    });
}
