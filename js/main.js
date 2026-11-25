const services = [
  {
    title: "Flight Booking",
    text: "We will help you find convenient flights from Kabul at a fair price.",
  },
  {
    title: "Visa Assistance",
    text: "We will guide you through the paperwork for your destination.",
  },
  {
    title: "Kabul Tours",
    text: "Explore the history and local culture of Kabul with a knowledgeable guide.",
  },
  {
    title: "Hotel Stays",
    text: "We will help you choose a comfortable place that fits your budget.",
  },
  {
    title: "Airport Transfers",
    text: "Arrive with peace of mind with a trusted pickup arranged in advance.",
  },
];

// Fill each title glyph with a different landmark photo from a featured country.
const heroTitleLines = document.querySelectorAll(".hero-title-line");
const heroLandmarkPhotos = [
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=90",
  "assets/d0d37c4a8930839b1ae325ca9ba8dcdc.jpg",
  "https://images.unsplash.com/photo-1635346260593-bf3bb9b695e3?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=90",
  "assets/garden of babur.jpg",
  "assets/27c5727109dff9e45230f9a63d64d523.jpg",
  "assets/c32f1f5ebdb5c9989e6a397978592551.jpg",
  "assets/b51b343a76786b75e3f53cb882d4a4db.jpg",
  "assets/5e65f25369a99b10933709f093595b75.jpg",
  "assets/58ccc31f2cc6e341c048c271c78b647b.jpg",
  "assets/6d1f552eb5d4ecc0b66af7a734bca197.jpg",
  "assets/d3b90df4886fcb88f95d51b939fb3c1a.jpg",
  "assets/9b67fe4df9e263d924d8bd6bf1e9839e.jpg",
  "assets/0f72997d20aa48c3e811942ec425508c.jpg",
  "assets/20260829_094415.jpg",
  "assets/585d174a9546e0d3f392f1dc7e66fef0.jpg",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=90",
  "assets/b8a4c9161114323bee26fcbe55b8afb9.jpg",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=90",
  "assets/IMG_acae28cf-8d01-4961-a081-d6f10f2ba3f7.jpg",
  "assets/IMG_a200d18a-7655-481c-839e-4e3874831c7a.jpg",
  "assets/97d069a008bc2bf8f412328ae5219d3a.jpg",
  "https://images.unsplash.com/photo-1501371632240-5d60b49290e7?auto=format&fit=crop&w=900&q=90",
];
const heroLandmarkNames = [
  "Japanese pagoda and cherry blossoms", "Dubai skyline", "Taj Mahal", "Tropical long-tail boat",
  "Golden temple architecture", "Great Barrier Reef", "Sydney Harbour", "Sydney Opera House",
  "Gold Coast", "Uluru", "Tanzania safari", "Pyramids of Egypt", "Ghana coast",
  "Serengeti savanna", "West African coastline", "Eiffel Tower", "Italian seaside village",
  "Paris rooftops", "Alpine lake", "New York skyline", "Red rock canyon", "Yosemite waterfall",
  "Machu Picchu",
];
let heroLetterIndex = 0;
heroTitleLines.forEach((line) => {
  const letters = Array.from(line.textContent);
  line.replaceChildren();
  letters.forEach((character) => {
    if (character === " ") {
      line.append(document.createTextNode(" "));
      return;
    }
    const letter = document.createElement("span");
    letter.className = "hero-title-letter";
    letter.textContent = character;
    const photoIndex = heroLetterIndex % heroLandmarkPhotos.length;
    heroLetterIndex += 1;
    letter.style.backgroundImage = `url("${heroLandmarkPhotos[photoIndex]}")`;
    letter.dataset.heroImage = heroLandmarkPhotos[photoIndex];
    letter.setAttribute("role", "button");
    letter.tabIndex = 0;
    letter.setAttribute("aria-label", `Use ${heroLandmarkNames[photoIndex]} as the hero background`);
    line.append(letter);
  });
});

const servicesGrid = document.querySelector("#services-grid");
if (servicesGrid) {
  services.forEach((service, index) => {
    const card = document.createElement("article");
    card.className = "service-card";

    const number = document.createElement("span");
    number.className = "service-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("h3");
    title.textContent = service.title;

    const text = document.createElement("p");
    text.textContent = service.text;

    const link = document.createElement("a");
    link.className = "service-link";
    link.href = "#contact";
    link.textContent = "Ask us about this";

    card.append(number, title, text, link);
    servicesGrid.append(card);
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("travel-vibes-theme");
  } catch {
    // The toggle still works when browser storage is unavailable.
  }
  const initialTheme = savedTheme ||
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const applyTheme = (theme) => {
    const lightMode = theme === "light";
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(lightMode));
    themeToggle.setAttribute("aria-label", `Switch to ${lightMode ? "dark" : "light"} mode`);
  };

  applyTheme(initialTheme);
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("travel-vibes-theme", nextTheme);
    } catch {
      // Keep the current selection for this page even without persistent storage.
    }
  });
}

const heroBackdrop = document.querySelector(".hero-backdrop");
if (heroBackdrop) {
  const heroTitle = document.querySelector("#hero-title");
  let selectedHeroImage = heroBackdrop.src;
  let selectedHeroAlt = heroBackdrop.alt;
  let heroImageRequest = 0;
  const applyHeroImage = (src, alt) => {
    const requestId = ++heroImageRequest;
    const nextImage = new Image();
    nextImage.onload = () => {
      if (requestId !== heroImageRequest) return;
      heroBackdrop.src = nextImage.src;
      heroBackdrop.alt = alt;
      heroBackdrop.classList.remove("is-changing");
      void heroBackdrop.offsetWidth;
      heroBackdrop.classList.add("is-changing");
    };
    nextImage.src = src;
  };
  const setThemeHeroImage = () => {
    const lightMode = document.documentElement.dataset.theme === "light";
    const src = lightMode ? heroBackdrop.dataset.lightSrc : heroBackdrop.dataset.darkSrc;
    const alt = lightMode ? heroBackdrop.dataset.lightAlt : heroBackdrop.dataset.darkAlt;
    if (!src || !alt) return;
    selectedHeroImage = src;
    selectedHeroAlt = alt;
    applyHeroImage(src, alt);
  };

  setThemeHeroImage();
  themeToggle?.addEventListener("click", setThemeHeroImage);

  document.querySelectorAll(".hero-title-letter").forEach((letter) => {
    const letterImage = letter.dataset.heroImage;
    const letterAlt = `${letter.getAttribute("aria-label").replace("Use ", "").replace(" as the hero background", "")} destination`;
    const previewLetterImage = () => applyHeroImage(letterImage, letterAlt);
    const selectLetterImage = () => {
      selectedHeroImage = letterImage;
      selectedHeroAlt = letterAlt;
      previewLetterImage();
    };
    letter.addEventListener("mouseenter", previewLetterImage);
    letter.addEventListener("focus", previewLetterImage);
    letter.addEventListener("click", selectLetterImage);
    letter.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectLetterImage();
      }
    });
  });

  heroTitle?.addEventListener("mouseleave", () => {
    applyHeroImage(selectedHeroImage, selectedHeroAlt);
  });
  heroTitle?.addEventListener("focusout", (event) => {
    if (!event.relatedTarget?.classList.contains("hero-title-letter")) {
      applyHeroImage(selectedHeroImage, selectedHeroAlt);
    }
  });
}

const tourBackground = document.querySelector(".tour-background");
if (tourBackground) {
  document.querySelectorAll("[data-tour-background]").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (!image) return;

      const selectedTourImage = button.dataset.tourSrc || image.currentSrc || image.src;
      tourBackground.src = selectedTourImage;
      tourBackground.alt = button.getAttribute("aria-label").replace("Use ", "").replace(" as the tour background", "");
      tourBackground.classList.remove("is-changing");
      void tourBackground.offsetWidth;
      tourBackground.classList.add("is-changing");
      document.querySelectorAll("[data-tour-background]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
    });
  });
}

const featuredDestinations = {
  Asia: {
    description: "From ancient temples to modern cities, Asia offers a unique blend of culture, history, and natural beauty. Discover breathtaking landscapes, vibrant traditions, and unforgettable experiences.",
    tags: ["Rich Culture", "Stunning Nature", "Unforgettable Moments"],
    photos: [
      ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=90", "Traditional pagoda framed by cherry blossoms in Japan"],
      ["assets/d0d37c4a8930839b1ae325ca9ba8dcdc.jpg", "Dubai skyline at dusk"],
      ["https://images.unsplash.com/photo-1635346260593-bf3bb9b695e3?auto=format&fit=crop&w=1200&q=90", "Taj Mahal reflected in its garden pool"],
      ["https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=90", "Long-tail boat in clear tropical water"],
      ["assets/garden of babur.jpg", "Golden temple architecture in Thailand"],
    ],
  },
  Australia: {
    description: "From Sydney Harbour and the Great Barrier Reef to the wide-open Outback, Australia is full of lively cities, wild coastlines, and unforgettable natural wonders.",
    tags: ["Coastal Cities", "Coral Reef", "Outback Adventures"],
    photos: [
      ["assets/27c5727109dff9e45230f9a63d64d523.jpg", "Colorful coral reef at the Great Barrier Reef"],
      ["assets/c32f1f5ebdb5c9989e6a397978592551.jpg", "Sydney Harbour at sunset"],
      ["assets/b51b343a76786b75e3f53cb882d4a4db.jpg", "Sydney Opera House and harbour"],
      ["assets/5e65f25369a99b10933709f093595b75.jpg", "Gold Coast skyline at sunrise beside the ocean"],
      ["assets/58ccc31f2cc6e341c048c271c78b647b.jpg", "Uluru rising above Australia's red desert"],
    ],
  },
  Africa: {
    description: "Meet Africa's extraordinary wildlife, explore ancient landmarks, and take in landscapes that stretch from golden savannas to dramatic mountain coasts.",
    tags: ["Wildlife Safaris", "Ancient Landmarks", "Wide Open Spaces"],
    photos: [
      ["assets/6d1f552eb5d4ecc0b66af7a734bca197.jpg", "Elephant on safari in Tanzania"],
      ["assets/d3b90df4886fcb88f95d51b939fb3c1a.jpg", "Ancient pyramids in Egypt"],
      ["assets/9b67fe4df9e263d924d8bd6bf1e9839e.jpg", "Cape Coast Castle on Ghana's coast"],
      ["assets/0f72997d20aa48c3e811942ec425508c.jpg", "Acacia trees across the Serengeti savanna"],
      ["assets/20260829_094415.jpg", "Ghana's coastline in West Africa"],
    ],
  },
  Europe: {
    description: "Wander from Parisian boulevards and Italian piazzas to alpine villages and coastal towns, with centuries of art, food, and history along the way.",
    tags: ["Historic Cities", "Alpine Escapes", "Art & Culture"],
    photos: [
      ["assets/585d174a9546e0d3f392f1dc7e66fef0.jpg", "Eiffel Tower above Paris"],
      ["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=90", "Colorful seaside village in Italy"],
      ["assets/b8a4c9161114323bee26fcbe55b8afb9.jpg", "Paris rooftops and city streets"],
      ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=90", "Alpine lake and mountain scenery"],
      ["https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=90", "Snow-covered European mountain peaks"],
    ],
  },
  America: {
    description: "From New York's bright skyline and the Grand Canyon to Yosemite and Machu Picchu, the Americas bring together iconic cities, ancient history, and dramatic landscapes.",
    tags: ["Iconic Cities", "National Parks", "Coast to Coast"],
    photos: [
      ["assets/IMG_acae28cf-8d01-4961-a081-d6f10f2ba3f7.jpg", "New York City skyline"],
      ["assets/IMG_a200d18a-7655-481c-839e-4e3874831c7a.jpg", "Layered red rock canyon landscape"],
      ["assets/97d069a008bc2bf8f412328ae5219d3a.jpg", "Waterfall and granite cliffs in Yosemite National Park"],
      ["https://images.unsplash.com/photo-1501371632240-5d60b49290e7?auto=format&fit=crop&w=900&q=90", "Machu Picchu in the Peruvian Andes"],
      ["assets/d4e4da8ec7468bd874fa3bea35119088.jpg", "Manhattan buildings at sunset"],
    ],
  },
};

const destinationTitle = document.querySelector("#featured-region-title");
const destinationDescription = document.querySelector("#featured-region-description");
const destinationMosaic = document.querySelector("#featured-region-mosaic");
if (destinationTitle && destinationDescription && destinationMosaic) {
  const mosaicImages = destinationMosaic.querySelectorAll("img");
  document.querySelectorAll("[data-region]").forEach((button) => {
    button.addEventListener("click", () => {
      const region = button.dataset.region;
      const destination = featuredDestinations[region];
      if (!destination) return;

      destinationTitle.textContent = region;
      destinationDescription.textContent = destination.description;
      destinationMosaic.setAttribute("aria-label", `${region} travel destinations`);
      const toursLink = document.querySelector("#featured-region-tours");
      if (toursLink?.firstChild) toursLink.firstChild.textContent = `View All ${region} Tours `;
      document.querySelectorAll(".destination-tags span").forEach((tag, index) => {
        if (destination.tags[index]) tag.lastChild.textContent = ` ${destination.tags[index]}`;
      });
      mosaicImages.forEach((image, index) => {
        const photo = destination.photos[index];
        if (photo) {
          image.onerror = () => {
            image.onerror = null;
            image.src = "assets/hero-lake.jpg";
            image.alt = "Scenic mountain lake";
          };
          image.src = photo[0];
          image.alt = photo[1];
          image.classList.remove("destination-photo-change");
          void image.offsetWidth;
          image.classList.add("destination-photo-change");
        }
      });
      document.querySelectorAll("[data-region]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("region-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    });
  });
}

const validateTripField = (field) => {
  field.setCustomValidity("");
  if (!field.value) return;

  if (field.matches('[name="name"]') && !field.value.trim()) {
    field.setCustomValidity("Please enter your name.");
  } else if (field.matches('[name="destination"], [name="message"]') && !field.value.trim()) {
    field.setCustomValidity("Please enter a response.");
  } else if (field.type === "email" && !field.validity.valid) {
    field.setCustomValidity("Please enter a valid email address.");
  } else if (field.type === "date" && field.value < field.min) {
    field.setCustomValidity("Please choose today or a future date.");
  } else if (field.type === "number" && !field.validity.valid) {
    field.setCustomValidity(`Please enter a number from ${field.min} to ${field.max}.`);
  }
};

document.querySelectorAll("#contact form, #booking-form").forEach((form) => {
  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach((field) => {
    field.addEventListener("input", () => validateTripField(field));
    field.addEventListener("change", () => validateTripField(field));
  });
  form.addEventListener("submit", (event) => {
    fields.forEach(validateTripField);
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    // Keep the contact form on this page instead of submitting its GET action.
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    if (status) status.textContent = "Thanks for reaching out! We’ll be in touch soon.";
    form.reset();
  });
});

const bookingDialog = document.querySelector("#book-trip");
const bookingForm = document.querySelector("#booking-form");
if (bookingDialog && bookingForm) {
  const closeButton = bookingDialog.querySelector(".booking-close");
  const openButtons = document.querySelectorAll("[data-open-booking]");
  const dateInput = bookingForm.querySelector('[name="date"]');
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localToday;

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      bookingDialog.showModal();
      bookingForm.querySelector("input")?.focus();
    });
  });
  closeButton?.addEventListener("click", () => bookingDialog.close());
  bookingDialog.addEventListener("click", (event) => {
    if (event.target === bookingDialog) bookingDialog.close();
  });
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const trip = Object.fromEntries(new FormData(bookingForm));
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
      contactForm.querySelector('[name="name"]').value = trip.name;
      contactForm.querySelector('[name="email"]').value = trip.email;
      contactForm.querySelector('[name="destination"]').value = "Somewhere else";
      contactForm.querySelector('[name="message"]').value =
        `Trip request: ${trip.destination}; ${trip.travelers} traveler(s); ` +
        `preferred departure: ${trip.date || "flexible"}; trip style: ${trip["trip-type"]}.`;
      bookingDialog.close();
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
      contactForm.querySelector('[name="message"]').focus({ preventScroll: true });
    }
  });
}

const mobileNavToggle = document.querySelector(".nav-toggle");
const navWrap = document.querySelector(".nav-wrap");
const primaryNavigation = document.querySelector("#primary-navigation");
if (mobileNavToggle && navWrap && primaryNavigation) {
  const closeMobileNavigation = () => {
    navWrap.classList.remove("is-menu-open");
    mobileNavToggle.setAttribute("aria-expanded", "false");
    mobileNavToggle.setAttribute("aria-label", "Open navigation menu");
  };

  mobileNavToggle.addEventListener("click", () => {
    const isOpen = navWrap.classList.toggle("is-menu-open");
    mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
    mobileNavToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNavigation);
  });
  navWrap.querySelector(".nav-cta")?.addEventListener("click", closeMobileNavigation);

  const menuBreakpoint = window.matchMedia("(min-width: 851px)");
  menuBreakpoint.addEventListener("change", (event) => {
    if (event.matches) closeMobileNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileNavigation();
  });
}

      document.querySelectorAll(".stories-carousel").forEach((carousel) => {
        const storiesWindow = carousel.querySelector(".stories-window");
        const arrows = [...carousel.querySelectorAll("[data-story-direction]")];
        const updateStoryArrows = () => {
          const maxScroll = storiesWindow.scrollWidth - storiesWindow.clientWidth;
          const atStart = storiesWindow.scrollLeft <= 1;
          const atEnd = storiesWindow.scrollLeft >= maxScroll - 1;
          arrows.forEach((arrow) => {
            arrow.disabled = arrow.dataset.storyDirection === "previous" ? atStart : atEnd;
          });
        };

        arrows.forEach((arrow) => {
          arrow.addEventListener("click", () => {
            const direction = arrow.dataset.storyDirection === "next" ? 1 : -1;
            const maxScroll = storiesWindow.scrollWidth - storiesWindow.clientWidth;
            const target = Math.max(0, Math.min(
              storiesWindow.scrollLeft + direction * storiesWindow.clientWidth,
              maxScroll,
            ));
            storiesWindow.scrollTo({
              left: target,
              behavior: "smooth",
            });
          });
        });
        storiesWindow.addEventListener("scroll", updateStoryArrows, { passive: true });
        window.addEventListener("resize", updateStoryArrows);
        updateStoryArrows();
      });

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!reduceMotion) {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const routeData =
          "M 46 292 C 160 232 178 58 330 76 C 472 92 428 320 592 322 C 754 324 744 74 896 75 C 1050 76 1098 229 1140 284 C 1190 340 1090 374 930 357 C 730 335 610 370 438 348 C 262 326 111 367 46 292 Z";
        const flightSections = document.querySelectorAll(
          "main > .flight-continuity-group, main > section, .site-footer",
        );
        const flightAnimations = [];

        flightSections.forEach((section) => {
          const overlay = document.createElementNS(svgNamespace, "svg");
          overlay.setAttribute("class", "scroll-flight-overlay");
          overlay.setAttribute("viewBox", "0 0 1200 400");
          overlay.setAttribute("preserveAspectRatio", "none");
          overlay.setAttribute("aria-hidden", "true");

          const route = document.createElementNS(svgNamespace, "path");
          route.setAttribute("class", "scroll-flight-path");
          route.setAttribute("d", routeData);
          overlay.appendChild(route);

          const isTourBanner = section.classList.contains("tour-banner");
          const airplane = document.createElement(
            isTourBanner ? "span" : "img",
          );
          airplane.setAttribute("class", "scroll-flight-plane");
          airplane.setAttribute("aria-hidden", "true");
          if (isTourBanner) {
            airplane.classList.add("scroll-flight-plane-tour");
            airplane.textContent = "✈";
          } else {
            airplane.setAttribute("src", "assets/scroll-plane.svg");
            airplane.setAttribute("alt", "");
          }
          section.appendChild(overlay);
          section.appendChild(airplane);

          flightAnimations.push({ section, route, airplane, overlay });
        });

        const emitFlightCloud = (section, x, y, driftX, driftY) => {
          const particle = document.createElement("span");
          particle.className = "flight-cloud-particle";
          particle.setAttribute("aria-hidden", "true");
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          particle.style.setProperty("--cloud-drift-x", `${driftX}px`);
          particle.style.setProperty("--cloud-drift-y", `${driftY}px`);
          section.appendChild(particle);

          const removeParticle = () => particle.remove();
          particle.addEventListener("animationend", removeParticle, {
            once: true,
          });
          window.setTimeout(removeParticle, 1900);
        };

        let flightFrame = 0;
        const updateFlights = () => {
          flightFrame = 0;
          const viewportHeight = window.innerHeight;
          let needsAnotherFrame = false;

          flightAnimations.forEach((flight) => {
            const { section, route, airplane } = flight;
            const bounds = section.getBoundingClientRect();
            const sectionTop = window.scrollY + bounds.top;
            const startsAtPageTop =
              section === flightSections[0] && window.scrollY < 1;
            const scrollStart = startsAtPageTop
              ? sectionTop
              : sectionTop - viewportHeight;
            const atPageBottom =
              section === flightSections[flightSections.length - 1];
            const scrollEnd = atPageBottom
              ? document.documentElement.scrollHeight - viewportHeight
              : sectionTop + bounds.height;
            const progress = Math.max(
              0,
              Math.min(
                1,
                (window.scrollY - scrollStart) / (scrollEnd - scrollStart),
              ),
            );
            if (typeof section.flightProgress !== "number") {
              section.flightProgress = progress;
            }
            section.flightProgress +=
              (progress - section.flightProgress) * 0.012;
            if (Math.abs(progress - section.flightProgress) > 0.001) {
              needsAnotherFrame = true;
            } else {
              section.flightProgress = progress;
            }

            const routeLength = route.getTotalLength();
            const distance = routeLength * section.flightProgress;
            const point = route.getPointAtLength(distance);
            const previousPoint = route.getPointAtLength(
              Math.max(0, distance - 1),
            );
            const scaleX = section.clientWidth / 1200;
            const scaleY = section.clientHeight / 400;
            const angle =
              (Math.atan2(
                (point.y - previousPoint.y) * scaleY,
                (point.x - previousPoint.x) * scaleX,
              ) *
                180) /
                Math.PI +
              90;

            const planeX = point.x * scaleX;
            const planeY = point.y * scaleY;
            const tangentX = (point.x - previousPoint.x) * scaleX;
            const tangentY = (point.y - previousPoint.y) * scaleY;
            const tangentLength = Math.hypot(tangentX, tangentY) || 1;
            const previousTrailPoint = section.flightTrailPoint;
            if (!previousTrailPoint) {
              section.flightTrailPoint = { x: planeX, y: planeY };
            } else {
              const moved = Math.hypot(
                planeX - previousTrailPoint.x,
                planeY - previousTrailPoint.y,
              );
              if (moved >= 28) {
                const sectionIsVisible =
                  bounds.bottom > 0 && bounds.top < viewportHeight;
                if (sectionIsVisible) {
                  const directionX = tangentX / tangentLength;
                  const directionY = tangentY / tangentLength;
                  emitFlightCloud(
                    section,
                    planeX - directionX * 20,
                    planeY - directionY * 20,
                    -directionX * 13,
                    -directionY * 13,
                  );
                }
                section.flightTrailPoint = { x: planeX, y: planeY };
              }
            }

            airplane.style.transform =
              `translate(${planeX}px, ${planeY}px) ` +
              `translate(-50%, -50%) rotate(${angle}deg)`;
          });
          if (needsAnotherFrame) {
            flightFrame = window.requestAnimationFrame(updateFlights);
          }
        };
        const scheduleFlightUpdate = () => {
          if (!flightFrame)
            flightFrame = window.requestAnimationFrame(updateFlights);
        };

        window.addEventListener("scroll", scheduleFlightUpdate, {
          passive: true,
        });
        window.addEventListener("resize", scheduleFlightUpdate);
        scheduleFlightUpdate();
      }
