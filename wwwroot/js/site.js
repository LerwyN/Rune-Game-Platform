"use strict";

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
        title: "Red Dead Redemption 2",
        description: "Vahşi Batı'nın acımasız dünyasında kendi hikâyeni yaşa.",
        image: "/images/banners/Red-Dead-Redemption2-Banner.jpg"
    },
    {
        title: "The Last of Us Part I",
        description: "Hayatta kalmak için her şeyini riske at.",
        image: "/images/banners/TheLastOfUs-Banner.jpg"
    },
    {
        title: "Marvel's Spider-Man 2",
        description: "New York sokaklarında kendi kahramanlık hikâyeni yaz.",
        image: "/images/banners/Spider-Man2-Banner.jpg"
    },
    {
        title: "God of War Ragnarök",
        description: "Kratos ve Atreus ile İskandinav mitolojisinde destansı bir maceraya atıl.",
        image: "/images/banners/GodOfWarRagnaörk-Banner.jpg"
    },
    {
        title: "Alan Wake 2",
        description: "Karanlık sırları çöz ve korkularla dolu bir dünyada hayatta kal.",
        image: "/images/banners/AlanWake2-Banner.jpg"
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

