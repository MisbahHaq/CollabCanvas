const projects = [
  // {
  //   title: "Represent",
  //   link: "https://representclothes.vercel.app/",
  //   type: "web",
  // },
  {
    title: "Duo Studio",
    description: "A modern design studio website showcasing creative work with smooth animations and interactive elements.",
    link: "https://duostudios.netlify.app/",
    type: "web",
  },
  {
    title: "Lazarev Agency",
    description: "A premium design agency portfolio featuring cutting-edge web design and development services.",
    link: "https://lazarev-agen.netlify.app/",
    type: "web",
  },
  { 
    title: "RayBin", 
    description: "A sleek file sharing platform with drag-and-drop functionality and secure cloud storage.",
    link: "https://raybin.netlify.app/", 
    type: "web" 
  },
  { 
    title: "Abel Fragrances", 
    description: "An elegant e-commerce website for luxury fragrances with immersive product showcases.",
    link: "https://abel-fragrances.netlify.app/", 
    type: "web" 
  },
  {
    title: "Lenis Scroll",
    description: "A demonstration of smooth scrolling effects using Lenis.js for enhanced user experience.",
    link: "https://lenis-scrolljs.netlify.app/",
    type: "web",
  },
  {
    title: "Paper Portfolio",
    description: "A minimalist portfolio website with clean typography and subtle animations.",
    link: "https://paper-port.netlify.app/",
    type: "web",
  },
  { 
    title: "Zelt", 
    description: "A modern workspace management platform with intuitive design and powerful collaboration tools.",
    link: "https://zelt-port.netlify.app/", 
    type: "web" 
  },
  // New Product Projects
  {
    year: "2025",
    title: "Skills Drop Animation",
    description:
      "Interactive Floating Skills Animation",
    link: "https://skills-drop-animation.netlify.app/",
    type: "product",
  },
  {
    year: "2025",
    title: "Scroll Reveal Showcase",
    description:
      "Interactive Floating Skills Animation",
    link: "https://scroll-reveal-animation.netlify.app/",
    type: "product",
  },
  {
    year: "2025",
    title: "Next.js Page Transition with GSAP & Animated Logo",
    description:
      "Interactive Floating Skills Animation",
    link: "https://next-js-transitions.vercel.app/",
    type: "product",
  },
  {
    year: "2025",
    title: "Smooth Page Transition Effect",
    description:
      "",
    link: "https://smooth-page-transition-effect.netlify.app/",
    type: "product",
  },
  {
    year: "2025",
    title: "JavaScript Text Animation",
    description:
      "Text Animation Using JavaScript",
    link: "https://javascript-text-animation.netlify.app/",
    type: "product",
  },
  {
    year: "2025",
    title: "MintoCoin",
    description:
      "This project is a deep dive into how cryptocurrencies like Bitcoin work built entirely from scratch using JavaScript, Node.js, and Express.",
    link: "https://github.com/MisbahHaq/MintoCoin",
    type: "product",
  },
  {
    year: "2025",
    title: "Image and Video Compressor",
    description: "Image and Video Compressor Website Using JavaScript.",
    link: "https://image-and-video-compressor.netlify.app/",
    type: "product",
  },
  {
    year: "2025",
    title: "Image Extension Converter",
    description: "Image Extension Converter Website Using JavaScript",
    link: "https://images-convert.netlify.app/",
    type: "product",
  },
  {
    year: "2025",
    title: "Symptom AI",
    description: "An AI-powered mobile application",
    link: "https://github.com/MisbahHaq/SymptomAI",
    type: "app",
  },
  {
    year: "2025",
    title: "Japanese Sushi",
    description: "Japanese Sushi App",
    link: "https://github.com/MisbahHaq/Japanese-Sushi",
    type: "app",
  },
  {
    year: "2025",
    title: "Tic-Tac-Toe-using-Emojis",
    description:
      "A fun and modern Tic Tac Toe game built with Flutter, using emojis instead of the traditional X and O. Includes a stylish onboarding page",
    link: "https://github.com/MisbahHaq/Tic-Tac-Toe-using-Emojis",
    type: "app",
  },
  {
    year: "2025",
    title: "FoodGo",
    description:
      "FoodGo is a mobile app designed to satisfy your cravings instantly.",
    link: "https://github.com/MisbahHaq/FoodGo",
    type: "app",
  },
  {
    year: "2025",
    title: "CineFlix",
    description:
      "CineFlix is a mobile app designed to enhance your movie-going experience.",
    link: "https://github.com/MisbahHaq/CineFlix",
    type: "app",
  },
  {
    year: "2025",
    title: "Briefly",
    description:
      "Briefly is a mobile application that delivers the latest news based on your selected categories.",
    link: "https://github.com/MisbahHaq/Briefly",
    type: "app",
  },
  {
    year: "2025",
    title: "Aur-Paisy",
    description:
      "Aurpaisy is a feature-rich mobile banking app designed to revolutionize the way you manage your finances.",
    link: "https://github.com/MisbahHaq/Aur-Paisy",
    type: "app",
  },
  {
    year: "2025",
    title: "Blinkit",
    description:
      "Blinkit Clone is a mobile app designed to bring grocery shopping to your doorstep in no time.",
    link: "https://github.com/MisbahHaq/Blinkit",
    type: "app",
  },
];

let shownProjects = [];

function renderProjects(filter = "web", showMore = false) {
  const projectsContainer = document.querySelector(".projects");
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hideBtn = document.getElementById("hideBtn");

  if (!showMore) {
    projectsContainer.innerHTML = "";
    shownProjects = [];
  }

  const filtered = projects.filter((project) => project.type === filter);

  filtered.forEach((project, index) => {
    if (!showMore && index < 4) {
      createProjectElement(project);
    }
    if (showMore && index >= 4) {
      createProjectElement(project);
      shownProjects.push(project);
    }
  });

  if (filtered.length > 4) {
    showMoreBtn.style.display = "inline-block";
    hideBtn.style.display = "none";
  } else {
    showMoreBtn.style.display = "none";
    hideBtn.style.display = "none";
  }
}

function createProjectElement(project) {
  const projectsContainer = document.querySelector(".projects");
  const projectElement = document.createElement("a");
  projectElement.href = project.link;
  projectElement.className = "project";
  projectElement.target = "_blank";
  projectElement.rel = "noopener noreferrer";

  projectElement.innerHTML = `
      <div class="project-content">
        <div class="project-info">
          <div class="project-header">
            <div>
              <div class="project-title">${project.title}</div>
              ${project.description ? `<div class="project-description">${project.description}</div>` : ''}
            </div>
          </div>
        </div>
        <svg class="arrow project-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0; transition: opacity 0.3s;">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    `;

  projectElement.addEventListener("mouseenter", () => {
    projectElement.querySelector(".arrow").style.opacity = "1";
    const description = projectElement.querySelector(".project-description");
    if (description) {
      description.style.opacity = "1";
      description.style.transform = "translateY(0)";
    }
  });

  projectElement.addEventListener("mouseleave", () => {
    projectElement.querySelector(".arrow").style.opacity = "0";
    const description = projectElement.querySelector(".project-description");
    if (description) {
      description.style.opacity = "0";
      description.style.transform = "translateY(-10px)";
    }
  });

  projectsContainer.appendChild(projectElement);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects("web");

  const webBtn = document.getElementById("webBtn");
  const appBtn = document.getElementById("appBtn");
  const productBtn = document.getElementById("productBtn");
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hideBtn = document.getElementById("hideBtn");

  webBtn.addEventListener("click", () => {
    renderProjects("web");
    webBtn.classList.add("active");
    appBtn.classList.remove("active");
    productBtn.classList.remove("active");
  });

  appBtn.addEventListener("click", () => {
    renderProjects("app");
    appBtn.classList.add("active");
    webBtn.classList.remove("active");
    productBtn.classList.remove("active");
  });

  productBtn.addEventListener("click", () => {
    renderProjects("product");
    productBtn.classList.add("active");
    webBtn.classList.remove("active");
    appBtn.classList.remove("active");
  });

  showMoreBtn.addEventListener("click", () => {
    const activeBtn = document.querySelector(".filter-btn.active");
    const filter = activeBtn.id.replace("Btn", "");
    renderProjects(filter, true);
    showMoreBtn.style.display = "none";
    hideBtn.style.display = "inline-block";
  });

  hideBtn.addEventListener("click", () => {
    const projectsContainer = document.querySelector(".projects");
    shownProjects.forEach((project) => {
      const projectElements = projectsContainer.querySelectorAll(".project");
      projectElements.forEach((element) => {
        if (
          element.querySelector(".project-title").textContent === project.title
        ) {
          element.remove();
        }
      });
    });
    shownProjects = [];
    showMoreBtn.style.display = "inline-block";
    hideBtn.style.display = "none";
  });

  const follower = document.querySelector(".mouse-follower");

  window.addEventListener("mousemove", (e) => {
    follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateFollower() {
    currentX += (mouseX - currentX) * 0.2;
    currentY += (mouseY - currentY) * 0.2;
    follower.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateFollower);
  }

  animateFollower();
});
