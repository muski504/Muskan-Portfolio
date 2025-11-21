document.addEventListener("DOMContentLoaded", () => {
  // ---------- CONFIG ----------
    const PHONE_NUMBER = '923319231155'; // number in international format
    const DEFAULT_MESSAGE = "Hello Muskan! I found your portfolio and would like to talk about a project.";

    const whatsappUrl = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

    // ---------- HERO + CONTACT WHATSAPP ----------
    const hireDesktop = document.getElementById('hireDesktop');
    const whatsappLink = document.getElementById('whatsapp-link');
    const footerWhatsapp = document.getElementById('footerWhatsapp');

    const setWhatsappLinks = () => {
    const url = (PHONE_NUMBER && PHONE_NUMBER.length >= 10) 
        ? whatsappUrl(PHONE_NUMBER, DEFAULT_MESSAGE) 
        : 'https://wa.me/';

    [hireDesktop, whatsappLink, footerWhatsapp].forEach(el => {
        if(el) el.setAttribute('href', url);
    });

    if(PHONE_NUMBER.length < 10) {
        console.warn('Set a valid PHONE_NUMBER in international format to enable WhatsApp links.');
    }
    };

    setWhatsappLinks();


  // ---------- MOBILE MENU ----------
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    mobileMenu.setAttribute('aria-hidden', !mobileMenu.classList.contains('show'));
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // ---------- REVEAL ANIMATIONS ----------
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealEls.forEach(el => revealObserver.observe(el));

  // ---------- PROJECTS SCROLL ----------
  const projectsTrack = document.getElementById('projectsTrack');
  if(projectsTrack){
    projectsTrack.addEventListener('keydown', e => {
      if(e.key === 'ArrowRight') projectsTrack.scrollBy({left: 340, behavior:'smooth'});
      if(e.key === 'ArrowLeft') projectsTrack.scrollBy({left: -340, behavior:'smooth'});
    });
  }


  // ---------- PROFILE IMAGE FALLBACK ----------
  const profileImg = document.getElementById('profileImg');
  profileImg?.addEventListener('error', () => {
    profileImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect rx="20" width="100%" height="100%" fill="#F8F6FF"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#B185DB" font-family="Poppins, sans-serif" font-size="28">Your profile image</text></svg>`
    );
  });

  // ---------- ACTIVE NAV LINK ----------
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const setActiveNav = () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // navbar offset
      if(scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActiveNav);
  setActiveNav(); // initial call
});

// Scroll Spy: Highlight active section in navbar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function activateNavLink() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120; // navbar height offset
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activateNavLink);

//----------------------
// Typing Effect
//----------------------

const roles = [
  "SOFTWARE ENGINEER",
  "WEB DEVELOPER",
  "FULL-STACK DEVELOPER",
  "PYTHON DEVELOPER"
];

let roleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);  // speed
  } else {
    setTimeout(erase, 1500); // delay before erase
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 60);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});

//--------------------------------------
//--- Hero section Image & Text Animation -----
//-------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  
  const heroLeft = document.querySelector(".hero-left");
  const heroRight = document.querySelector(".hero-right");

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          heroLeft.classList.add("show-hero-left");
          heroRight.classList.add("show-hero-right");
        }
      });
    },
    { threshold: 0.3 }
  );

  heroObserver.observe(document.querySelector("#home"));
});



//--------------------------------------
//--- About Image & Text Animation -----
//--------------------------------------

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.hidden-left, .hidden-right')
        .forEach(el => observer.observe(el));
