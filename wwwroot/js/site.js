"use strict";

const mobileMenuToggle = document.querySelector("#mobileMenuToggle");
const mobileMenu = document.querySelector("#mobileMenu");

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("show");
        mobileMenuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
    document.addEventListener("click", (event) => {
        if (
            !mobileMenu.contains(event.target) &&
            !mobileMenuToggle.contains(event.target)
        ) {
            mobileMenu.classList.remove("show");
            mobileMenuToggle.setAttribute("aria-expanded", "false");
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            mobileMenu.classList.remove("show");
            mobileMenuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


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

const featuredGames = [
    {
        title: "Grand Theft Auto VI",
        description: "Vice City sokaklarında suç, aksiyon ve özgürlüğün sınırlarını keşfet.",
        image: "/images/banners/GrandTheftAutoVI-Banner.avif"
    },
    {
        title: "Ghost of Tsushima",
        description: "Bir samurayın onur ve intikam mücadelesine katıl.",
        image: "/images/banners/GhostofTsushima-Banner.jpg"
    },
    {
        title: "DOOM: The Dark Ages",
        description: "The Dark Ages: Cehennem ordularına karşı amansız bir savaşa gir.",
        image: "/images/banners/Doom-Banner.avif"
    },
    {
        title: "The Witcher 3: Wild Hunt",
        description: "Canavarlarla dolu karanlık bir dünyada kaderini yaz.",
        image: "/images/banners/TheWitcher3WildHunt-Banner.jpg"
    },
    {
        title: "Death Stranding 2: On the Beach",
        description: "Parçalanmış bir dünyada insanlığı yeniden birleştir.",
        image: "/images/banners/DeathStranding2OntheBeach-Banner.jpg"
    }
];

featuredGames.forEach(game => {
    const img = new Image();
    img.src = game.image;
});

let currentGameIndex = 0;
const featuredBanner = document.querySelector("#featuredBanner");
const bannerTitle = document.querySelector("#bannerTitle");
const bannerDescription = document.querySelector("#bannerDescription");


function showFeaturedGame() {
    let game = featuredGames[currentGameIndex];
    const bannerLayer = featuredBanner;
    bannerLayer.classList.add("banner-entering");
    setTimeout(() => {
        bannerTitle.textContent = game.title;
        bannerDescription.textContent = game.description;
        bannerLayer.style.setProperty(
            "--banner-image",
            `linear-gradient(to right, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.25) 45%, rgba(0, 0, 0, 0) 100%), url("${game.image}")`
        );
        requestAnimationFrame(() => {
            bannerLayer.classList.remove("banner-entering");
        });
        const img = new Image();
        img.src = game.image;
        img.onload = () => {
            bannerLayer.style.setProperty(
                "--banner-image",
                `linear-gradient(to right, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.25) 45%, rgba(0, 0, 0, 0) 100%), url("${game.image}")`
            );
            requestAnimationFrame(() => {
                bannerLayer.classList.remove("banner-entering");
            });
        };
    }, 100);
}


const bannerProgressFill = document.querySelector(".banner-progress-fill");

function resetBannerProgress() {
    bannerProgressFill.style.transition = "none";
    bannerProgressFill.style.width = "0%";
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            bannerProgressFill.style.transition = "width 5s linear";
            bannerProgressFill.style.width = "100%";
        });
    });
}

resetBannerProgress();
setInterval(() => {
    currentGameIndex++;
    if (currentGameIndex >= featuredGames.length) {
        currentGameIndex = 0;
    }
    showFeaturedGame();
    resetBannerProgress();
}, 5000);


const profileMenuToggle = document.querySelector("#profileMenuToggle");
const profileDropdown = document.querySelector("#profileDropdown");

if (profileMenuToggle && profileDropdown) {
    profileMenuToggle.addEventListener("click", () => {
        const isOpen = profileDropdown.classList.toggle("show");

        profileMenuToggle.classList.toggle("open", isOpen);
        profileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", (event) => {
        if (
            !profileDropdown.contains(event.target) &&
            !profileMenuToggle.contains(event.target)
        ) {
            profileDropdown.classList.remove("show");
            profileMenuToggle.classList.remove("open");
            profileMenuToggle.setAttribute("aria-expanded", "false");
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            profileDropdown.classList.remove("show");
            profileMenuToggle.classList.remove("open");
            profileMenuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


const darkThemeBtn = document.querySelector(".dark-theme-btn");
const lightThemeBtn = document.querySelector(".light-theme-btn");

function setTheme(theme) {
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(theme + "-mode");

    localStorage.setItem("rune-theme", theme);
}

const savedTheme = localStorage.getItem("rune-theme") || "light";

setTheme(savedTheme);

darkThemeBtn?.addEventListener("click", () => {
    setTheme("dark");
});

lightThemeBtn?.addEventListener("click", () => {
    setTheme("light");
});

