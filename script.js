/* =========================================================
   Nova Parts — interacciones de interfaz
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");
  const menuBackdrop = document.querySelector(".menu-backdrop");
  const navLinks = document.querySelectorAll(".main-nav a");
  const mobileNav = window.matchMedia("(max-width: 768px)");

  // Los iconos acompañan a texto visible o a etiquetas accesibles
  document.querySelectorAll("svg").forEach((icon) => {
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("focusable", "false");
  });

  // Carga visual breve, con salida garantizada aunque un recurso externo tarde
  let loadingFinished = false;
  const finishLoading = () => {
    if (loadingFinished) return;
    loadingFinished = true;
    const delay = reduceMotion ? 0 : Math.max(0, 520 - performance.now());
    window.setTimeout(() => root.classList.add("page-ready"), delay);
  };
  requestAnimationFrame(() => requestAnimationFrame(finishLoading));

  // Navegación móvil accesible: cierre exterior, Escape y control del foco
  const backgroundContent = [
    document.querySelector("main"),
    document.querySelector(".site-footer"),
    document.querySelector(".whatsapp")
  ].filter(Boolean);

  const setBackgroundInert = (inert) => {
    backgroundContent.forEach((element) => {
      element.inert = inert;
    });
  };

  const syncMenuAvailability = () => {
    const closedOnMobile = mobileNav.matches && !body.classList.contains("menu-open");
    menu.inert = closedOnMobile;
    if (closedOnMobile) menu.setAttribute("aria-hidden", "true");
    else menu.removeAttribute("aria-hidden");
  };

  const closeMenu = (restoreFocus = false) => {
    body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    setBackgroundInert(false);
    syncMenuAvailability();
    if (restoreFocus) menuButton.focus();
  };

  const openMenu = () => {
    body.classList.add("menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Cerrar menú");
    menu.inert = false;
    menu.removeAttribute("aria-hidden");
    setBackgroundInert(true);
    requestAnimationFrame(() => menu.querySelector("a").focus());
  };

  menuButton.addEventListener("click", () => {
    const open = !body.classList.contains("menu-open");
    open ? openMenu() : closeMenu();
    menuButton.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => link.addEventListener("click", () => closeMenu()));
  menuBackdrop.addEventListener("click", () => closeMenu(true));
  document.addEventListener("keydown", (event) => {
    if (!body.classList.contains("menu-open")) return;
    if (event.key === "Escape") {
      closeMenu(true);
      return;
    }
    if (event.key === "Tab") {
      const focusable = [menuButton, ...menu.querySelectorAll("a[href]")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && body.classList.contains("menu-open")) closeMenu();
  });
  mobileNav.addEventListener("change", () => {
    if (!mobileNav.matches) closeMenu();
    syncMenuAvailability();
  });
  syncMenuAvailability();

  const updateHeader = () => {
    const alwaysFixed = body.classList.contains("catalog-page");
    header.classList.toggle("is-fixed", alwaysFixed || window.scrollY > 90);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Catálogo local: datos simulados, renderizado y filtros sin backend
  const catalogRoot = document.querySelector("#catalogo");
  if (catalogRoot) {
  const createPiecePlaceholder = (name, category, index) => {
    const accents = ["#d72638", "#b61d2d", "#ef4859", "#9f1b29"];
    const accent = accents[index % accents.length];
    const initials = category.slice(0, 2).toUpperCase();
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="720" height="450" viewBox="0 0 720 450">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#111114"/>
            <stop offset="1" stop-color="#29292f"/>
          </linearGradient>
          <radialGradient id="glow" cx=".72" cy=".25" r=".7">
            <stop offset="0" stop-color="${accent}" stop-opacity=".38"/>
            <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="720" height="450" fill="url(#bg)"/>
        <rect width="720" height="450" fill="url(#glow)"/>
        <path d="M90 298c75-128 166-184 276-184 101 0 179 47 264 163" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="3"/>
        <path d="M145 293h430c22 0 40 18 40 40v13H105v-13c0-22 18-40 40-40Z" fill="none" stroke="${accent}" stroke-width="5"/>
        <circle cx="202" cy="347" r="43" fill="#17171b" stroke="#fff" stroke-opacity=".3" stroke-width="5"/>
        <circle cx="518" cy="347" r="43" fill="#17171b" stroke="#fff" stroke-opacity=".3" stroke-width="5"/>
        <text x="54" y="86" fill="#fff" fill-opacity=".14" font-family="Arial, sans-serif" font-size="54" font-weight="700">${initials}</text>
        <text x="54" y="406" fill="#fff" fill-opacity=".62" font-family="Arial, sans-serif" font-size="18">${name}</text>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const catalogParts = [
    { nombre: "Paragolpes delantero M Sport", modelo: "BMW Serie 3 G20 (2019–2024)", marca: "BMW", estado: "Restaurado", precio: 389, categoria: "Paragolpes", disponibilidad: "En stock" },
    { nombre: "Llanta Rotor 19 pulgadas", modelo: "Audi A4 / A5 B9", marca: "Audi", estado: "Reacondicionada", precio: 245, categoria: "Llantas", disponibilidad: "En stock" },
    { nombre: "Aleta delantera izquierda", modelo: "Mercedes-Benz Clase A W177", marca: "Mercedes-Benz", estado: "Restaurada", precio: 189, categoria: "Carrocería", disponibilidad: "En stock" },
    { nombre: "Faro LED derecho", modelo: "Volkswagen Golf VII (2017–2020)", marca: "Volkswagen", estado: "Verificado", precio: 329, categoria: "Iluminación", disponibilidad: "Reservada" },
    { nombre: "Retrovisor eléctrico izquierdo", modelo: "CUPRA Formentor", marca: "CUPRA", estado: "Reacondicionado", precio: 219, categoria: "Retrovisores", disponibilidad: "En stock" },
    { nombre: "Difusor trasero S line", modelo: "Audi A3 8Y", marca: "Audi", estado: "Restaurado", precio: 159, categoria: "Aerodinámica", disponibilidad: "En stock" },
    { nombre: "Capó de aluminio", modelo: "BMW Serie 5 G30", marca: "BMW", estado: "Restaurado", precio: 475, categoria: "Carrocería", disponibilidad: "Bajo pedido" },
    { nombre: "Llanta AMG 18 pulgadas", modelo: "Mercedes-Benz Clase C W205", marca: "Mercedes-Benz", estado: "Reacondicionada", precio: 275, categoria: "Llantas", disponibilidad: "En stock" },
    { nombre: "Piloto trasero izquierdo", modelo: "Porsche Macan 95B", marca: "Porsche", estado: "Verificado", precio: 295, categoria: "Iluminación", disponibilidad: "En stock" },
    { nombre: "Paragolpes trasero GTI", modelo: "Volkswagen Golf VIII", marca: "Volkswagen", estado: "Restaurado", precio: 349, categoria: "Paragolpes", disponibilidad: "En stock" },
    { nombre: "Carcasa de retrovisor", modelo: "Toyota GR Yaris", marca: "Toyota", estado: "Restaurada", precio: 89, categoria: "Retrovisores", disponibilidad: "En stock" },
    { nombre: "Talonera lateral derecha", modelo: "Ford Focus ST Mk4", marca: "Ford", estado: "Restaurada", precio: 149, categoria: "Aerodinámica", disponibilidad: "En stock" },
    { nombre: "Paragolpes delantero JCW", modelo: "MINI Cooper F56", marca: "MINI", estado: "Restaurado", precio: 315, categoria: "Paragolpes", disponibilidad: "Reservada" },
    { nombre: "Puerta delantera derecha", modelo: "SEAT León KL", marca: "SEAT", estado: "Restaurada", precio: 399, categoria: "Carrocería", disponibilidad: "Bajo pedido" },
    { nombre: "Llanta Pretoria 18 pulgadas", modelo: "Volkswagen Golf VII R", marca: "Volkswagen", estado: "Reacondicionada", precio: 229, categoria: "Llantas", disponibilidad: "En stock" },
    { nombre: "Faro Matrix LED izquierdo", modelo: "Audi Q5 FY", marca: "Audi", estado: "Verificado", precio: 549, categoria: "Iluminación", disponibilidad: "En stock" },
    { nombre: "Retrovisor calefactable derecho", modelo: "Ford Puma (2020–2024)", marca: "Ford", estado: "Reacondicionado", precio: 169, categoria: "Retrovisores", disponibilidad: "En stock" },
    { nombre: "Spoiler de portón", modelo: "CUPRA León KL", marca: "CUPRA", estado: "Restaurado", precio: 199, categoria: "Aerodinámica", disponibilidad: "En stock" },
    { nombre: "Paragolpes delantero", modelo: "Toyota Corolla E210", marca: "Toyota", estado: "Restaurado", precio: 279, categoria: "Paragolpes", disponibilidad: "En stock" },
    { nombre: "Aleta trasera derecha", modelo: "Porsche 911 (991)", marca: "Porsche", estado: "Restaurada", precio: 625, categoria: "Carrocería", disponibilidad: "Bajo pedido" }
  ].map((part, index) => ({
    ...part,
    id: index + 1,
    imagen: createPiecePlaceholder(part.nombre, part.categoria, index)
  }));

  const catalogGrid = document.querySelector("#catalog-grid");
  const catalogCount = document.querySelector("#catalog-count");
  const catalogEmpty = document.querySelector("#catalog-empty");
  const catalogSearch = document.querySelector("#catalog-search");
  const catalogCategory = document.querySelector("#catalog-category");
  const catalogBrand = document.querySelector("#catalog-brand");
  const catalogPrice = document.querySelector("#catalog-price");
  const catalogReset = document.querySelector("#catalog-reset");

  const addFilterOptions = (select, values) => {
    values
      .sort((a, b) => a.localeCompare(b, "es"))
      .forEach((value) => select.add(new Option(value, value)));
  };

  addFilterOptions(catalogCategory, [...new Set(catalogParts.map((part) => part.categoria))]);
  addFilterOptions(catalogBrand, [...new Set(catalogParts.map((part) => part.marca))]);

  const normalizeText = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const formatPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  });

  const renderCatalog = () => {
    const query = normalizeText(catalogSearch.value);
    const category = catalogCategory.value;
    const brand = catalogBrand.value;
    const [minPrice, maxPrice] = catalogPrice.value
      ? catalogPrice.value.split("-").map(Number)
      : [0, Infinity];

    const filteredParts = catalogParts.filter((part) => {
      const searchable = normalizeText(`${part.nombre} ${part.modelo} ${part.marca}`);
      return (!query || searchable.includes(query))
        && (!category || part.categoria === category)
        && (!brand || part.marca === brand)
        && part.precio >= minPrice
        && part.precio <= maxPrice;
    });

    catalogGrid.innerHTML = filteredParts.map((part) => {
      const available = part.disponibilidad === "En stock";
      return `
        <article class="catalog-card">
          <div class="catalog-card-media">
            <img src="${part.imagen}" alt="Imagen placeholder de ${part.nombre}" width="720" height="450" loading="lazy">
            <span class="catalog-availability ${available ? "is-available" : ""}">${part.disponibilidad}</span>
          </div>
          <div class="catalog-card-body">
            <div class="catalog-card-tags"><span>${part.categoria}</span><span>${part.estado}</span></div>
            <h3>${part.nombre}</h3>
            <p>${part.modelo}</p>
            <div class="catalog-card-footer">
              <strong>${formatPrice.format(part.precio)}</strong>
              <a href="#contacto" aria-label="Consultar ${part.nombre}">Consultar <span>→</span></a>
            </div>
          </div>
        </article>`;
    }).join("");

    catalogCount.textContent = `${filteredParts.length} ${filteredParts.length === 1 ? "pieza encontrada" : "piezas encontradas"}`;
    catalogEmpty.hidden = filteredParts.length > 0;
  };

  catalogSearch.addEventListener("input", renderCatalog);
  [catalogCategory, catalogBrand, catalogPrice].forEach((filter) => {
    filter.addEventListener("change", renderCatalog);
  });
  catalogReset.addEventListener("click", () => {
    catalogSearch.value = "";
    catalogCategory.value = "";
    catalogBrand.value = "";
    catalogPrice.value = "";
    renderCatalog();
    catalogSearch.focus();
  });
  renderCatalog();
  }

  // Destaca la sección activa en la navegación de escritorio
  if ("IntersectionObserver" in window) {
    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -60%" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Entrada progresiva de secciones
  const revealItems = document.querySelectorAll(".reveal");
  document.querySelectorAll(".brands-inner, .about-grid, .piece-types-header, .process-intro, .work-header, .recent-projects-header, .contact-grid, .faq-grid").forEach((group) => {
    group.querySelectorAll(":scope > .reveal").forEach((item, index) => {
      item.dataset.reveal = index % 2 ? "right" : "left";
    });
  });
  document.querySelectorAll(".brand-list, .services-grid, .piece-types-grid, .advantages-grid, .gallery, .project-grid").forEach((group) => {
    group.querySelectorAll(":scope > .reveal").forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 90}ms`);
    });
  });
  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Contadores del hero
  const counters = document.querySelectorAll("[data-count]");
  const formatCounter = (counter, value) => {
    const suffix = counter.dataset.suffix || "";
    counter.textContent = `${value.toLocaleString("es-ES")}${suffix}`;
  };

  const animateCounter = (counter) => {
    if (counter.dataset.animated === "true") return;
    counter.dataset.animated = "true";
    const target = Number(counter.dataset.count);
    if (reduceMotion) {
      formatCounter(counter, target);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      formatCounter(counter, Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const stats = document.querySelector(".hero-stats");
  if (!reduceMotion) counters.forEach((counter) => formatCounter(counter, 0));
  if (reduceMotion) {
    counters.forEach(animateCounter);
  } else if (stats && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(([entry], observer) => {
      if (!entry.isIntersecting) return;
      counters.forEach(animateCounter);
      observer.disconnect();
    });
    counterObserver.observe(stats);
  } else {
    counters.forEach(animateCounter);
  }

  // Acordeón FAQ: una respuesta abierta a la vez
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (!item.classList.contains("is-open")) item.querySelector(".faq-answer").inert = true;
  });
  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const current = button.closest(".faq-item");
      const shouldOpen = !current.classList.contains("is-open");
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector("button").setAttribute("aria-expanded", "false");
        item.querySelector(".faq-answer").inert = true;
      });
      if (shouldOpen) {
        current.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        current.querySelector(".faq-answer").inert = false;
      }
    });
  });

  // Comparadores accesibles por ratón, toque y teclado
  const lazyVisuals = document.querySelectorAll(".comparison-image, .project-media");
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-image-ready");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "250px 0px" });
    lazyVisuals.forEach((visual) => imageObserver.observe(visual));
  } else {
    lazyVisuals.forEach((visual) => visual.classList.add("is-image-ready"));
  }

  document.querySelectorAll(".comparison-image").forEach((comparison) => {
    const range = comparison.querySelector(".comparison-range");
    const updateComparison = () => {
      comparison.style.setProperty("--position", `${range.value}%`);
      range.setAttribute("aria-valuetext", `${range.value}% después`);
    };
    range.addEventListener("input", updateComparison);
    updateComparison();
  });

  // Slider de testimonios
  const track = document.querySelector(".testimonial-track");
  const slides = track ? [...track.children] : [];
  const sliderButtons = [...document.querySelectorAll(".slider-controls button")];
  const sliderStatus = document.createElement("p");
  let slideIndex = 0;

  if (track) {
    track.setAttribute("role", "region");
    track.setAttribute("aria-roledescription", "carrusel");
    slides.forEach((slide, index) => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "opinión");
      slide.setAttribute("aria-label", `${index + 1} de ${slides.length}`);
    });
    sliderStatus.className = "sr-only";
    sliderStatus.setAttribute("role", "status");
    track.parentElement.appendChild(sliderStatus);
  }

  const updateSlider = () => {
    if (!track || !slides.length) return;
    const gap = 22;
    const slideWidth = slides[0].getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.floor(track.parentElement.clientWidth / slideWidth));
    const maxIndex = Math.max(0, slides.length - visible);
    slideIndex = Math.min(slideIndex, maxIndex);
    track.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    sliderButtons.forEach((button) => {
      const direction = Number(button.dataset.dir);
      button.disabled = direction < 0 ? slideIndex === 0 : slideIndex === maxIndex;
    });
    sliderStatus.textContent = `Mostrando opinión ${slideIndex + 1} de ${slides.length}`;
  };

  sliderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.dir);
      const slideWidth = slides[0].getBoundingClientRect().width + 22;
      const visible = Math.max(1, Math.floor(track.parentElement.clientWidth / slideWidth));
      const maxIndex = Math.max(0, slides.length - visible);
      slideIndex = Math.max(0, Math.min(maxIndex, slideIndex + direction));
      updateSlider();
    });
  });
  const scheduleSliderUpdate = () => requestAnimationFrame(updateSlider);
  window.addEventListener("resize", scheduleSliderUpdate);
  window.addEventListener("orientationchange", scheduleSliderUpdate);
  if (document.fonts?.ready) document.fonts.ready.then(updateSlider);
  updateSlider();

  // Validación visual del formulario (demo frontend)
  const form = document.querySelector("#quote-form");
  if (form) {
  const status = form.querySelector(".form-status");
  const getMessage = (field) => {
    if (field.validity.valueMissing) return "Este campo es obligatorio.";
    if (field.validity.typeMismatch) return "Introduce un correo válido.";
    if (field.validity.patternMismatch) return "Introduce un teléfono válido.";
    return "Revisa este campo.";
  };

  const clearFieldError = (field) => {
    field.classList.remove("field-error");
    field.removeAttribute("aria-invalid");
    const message = field.closest("label")?.querySelector(".field-message");
    if (message) message.remove();
    field.removeAttribute("aria-describedby");
  };

  const showFieldError = (field) => {
    clearFieldError(field);
    field.classList.add("field-error");
    field.setAttribute("aria-invalid", "true");
    const message = document.createElement("small");
    message.className = "field-message";
    message.id = `${field.name || "consent"}-error`;
    message.textContent = getMessage(field);
    field.closest("label")?.appendChild(message);
    field.setAttribute("aria-describedby", message.id);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("input, select, textarea")];
    fields.forEach(clearFieldError);
    const invalid = fields.filter((field) => !field.checkValidity());

    if (invalid.length) {
      invalid.forEach(showFieldError);
      invalid[0].focus();
      status.className = "form-status is-error";
      status.textContent = "Revisa los campos obligatorios.";
      return;
    }

    status.className = "form-status is-success";
    status.textContent = "Solicitud preparada. Conecta el formulario a tu servicio de correo.";
    form.reset();
  });

  form.addEventListener("input", (event) => {
    if (event.target.checkValidity()) clearFieldError(event.target);
    if (!form.querySelector('[aria-invalid="true"]') && status.classList.contains("is-error")) {
      status.className = "form-status";
      status.textContent = "";
    }
  });
  }

  // Año automático
  document.querySelector("#year").textContent = new Date().getFullYear();
});
