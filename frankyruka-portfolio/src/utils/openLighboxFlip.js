import gsap from "gsap";

// Duraciones centralizadas (toca aquí si quieres cambiar velocidades)
const DURATION_OPEN = 0.35;
const DURATION_CLOSE = 0.2;
const DURATION_SLIDE = 0.22;

export function openLightboxFLIPGallery({
  images,
  startIndex = 0,
  originEl,
  originEls,
  maxWidth = 1600,
  vwRatio = 0.92,
  vhRatio = 0.9,
}) {
  if (!images?.length || !originEl) return;

  const body = document.body;
  const prevOverflow = body.style.overflow;
  body.style.overflow = "hidden";

  let index = startIndex;

  const vw = () => window.innerWidth;
  const vh = () => window.innerHeight;

  // Backdrop blanco
  const backdrop = document.createElement("div");
  Object.assign(backdrop.style, {
    position: "fixed",
    inset: "0",
    background: "white",
    opacity: "0",
    zIndex: "48",
    pointerEvents: "none", // <-- para que no “se coma” los clicks
  });
  body.appendChild(backdrop);

  // Stage
  const stage = document.createElement("div");
  Object.assign(stage.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "49",
    pointerEvents: "auto",
  });
  body.appendChild(stage);

  //contexto de gsap para agrupar todos los tweens de este lightbox
  const ctx = gsap.context(() => { }, stage);

  // Overlay translúcido (como tu overlay)
  const overlayDiv = document.createElement("div");
  overlayDiv.className = "overlay";
  Object.assign(overlayDiv.style, {
    position: "fixed",
    inset: "0",
    background: "white",
    opacity: "0",
    zIndex: "49",
    pointerEvents: "none",
  });
  stage.appendChild(overlayDiv);

  // Imagen visible (clon)
  const img = document.createElement("img");
  img.alt = "";
  Object.assign(img.style, {
    position: "fixed",
    objectFit: "contain",
    willChange: "left, top, width, height, opacity, transform",
    pointerEvents: "auto",
    zIndex: "50",
  });
  stage.appendChild(img);

  // Ocultar thumbnail original para evitar doble
  const originalImg =
    originEl.tagName?.toLowerCase?.() === "img"
      ? originEl
      : originEl.querySelector?.("img");
  const restoreOriginal = () => {
    if (originalImg) originalImg.style.visibility = "";
  };
  if (originalImg) originalImg.style.visibility = "hidden";

  // --- Helpers ---
  const getOriginRectForIndex = (i) => {
    if (originEls?.[i]) return originEls[i].getBoundingClientRect();
    if (i === startIndex) return originEl.getBoundingClientRect();
    return originEl.getBoundingClientRect();
  };

  const fit = (naturalW, naturalH) => {
    const maxW = Math.min(vw() * vwRatio, maxWidth);
    const maxH = vh() * vhRatio;
    const sc = Math.min(maxW / naturalW, maxH / naturalH);
    const w = naturalW * sc;
    const h = naturalH * sc;
    return { w, h, left: (vw() - w) / 2, top: (vh() - h) / 2 };
  };

  const loadImage = (src) =>
    new Promise((resolve) => {
      const tmp = new Image();
      tmp.onload = () => resolve({ w: tmp.naturalWidth, h: tmp.naturalHeight });
      tmp.onerror = () => resolve({ w: 1000, h: 600 });
      tmp.src = src;
    });

  // --- Mouse UI (usa tu #mouse y sus iconos internos) ---
  const mouseEl = document.getElementById("mouse");
  const openIcon = document.getElementById("open-icon");
  const closeIcon = document.getElementById("close-icon");
  const leftIcon = document.getElementById("arrow-left-icon");
  const rightIcon = document.getElementById("arrow-right-icon");

  // Oculta el open-icon mientras el lightbox está activo
  if (openIcon) gsap.set(openIcon, { opacity: 0, scale: 0.8 });

  const showMouseUI = () => {
    if (mouseEl) gsap.to(mouseEl, { scale: 6, duration: 0.3 });
    gsap.to(overlayDiv, { opacity: 0.3, duration: 0.3 });
    if (openIcon) gsap.to(openIcon, { opacity: 0, scale: 0.8, duration: 0.2 }); // asegúrate de apagarlo
  };

  const hideMouseUI = () => {
    if (mouseEl) gsap.to(mouseEl, { scale: 1, duration: 0.3 });
    gsap.to(overlayDiv, { opacity: 0, duration: 0.3 });
    // apaga iconos del cursor
    if (closeIcon)
      gsap.to(closeIcon, { opacity: 0, scale: 0.9, duration: 0.2 });
    if (leftIcon) gsap.to(leftIcon, { opacity: 0, scale: 0.9, duration: 0.2 });
    if (rightIcon)
      gsap.to(rightIcon, { opacity: 0, scale: 0.9, duration: 0.2 });
    if (openIcon) gsap.to(openIcon, { opacity: 0, scale: 0.8, duration: 0.2 });
  };

  // Región por TERCIOS DE LA PANTALLA (no de la imagen)
  const hasMany = images.length > 1;
  const regionFromEvent = (e) => {
    const w = window.innerWidth;
    const ratio = e.clientX / w;
    if (!hasMany) return "close";
    if (ratio < 0.33) return "prev";
    if (ratio > 0.67) return "next";
    return "close";
  };

  const turnOn = (el) =>
    el && gsap.to(el, { opacity: 1, scale: 1, duration: 0.2 });
  const turnOff = (el) =>
    el && gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.2 });

  let hovering = false;
  const updateMouseIcons = (kind) => {
    if (kind === "prev") {
      turnOn(leftIcon);
      turnOff(rightIcon);
      turnOff(closeIcon);
      if (mouseEl) mouseEl.style.cursor = "w-resize";
    } else if (kind === "next") {
      turnOn(rightIcon);
      turnOff(leftIcon);
      turnOff(closeIcon);
      if (mouseEl) mouseEl.style.cursor = "e-resize";
    } else {
      turnOn(closeIcon);
      turnOff(leftIcon);
      turnOff(rightIcon);
      if (mouseEl) mouseEl.style.cursor = "zoom-out";
    }
  };

  // LISTENERS EN TODA LA PANTALLA (stage)
  const onStageMove = (e) => {
    const kind = regionFromEvent(e);
    if (!hovering) {
      hovering = true;
      showMouseUI();
    }
    updateMouseIcons(kind);
  };
  const onStageLeave = () => {
    hovering = false;
    hideMouseUI();
  };
  const onStageClick = (e) => {
    const region = regionFromEvent(e);
    if (region === "prev") return prev();
    if (region === "next") return next();
    return close();
  };

  // --- Apertura FLIP (con transform, sin cambiar left/top en la animación) ---
  // --- Apertura FLIP (sin flashes) ---
  const openFromOrigin = async () => {
    const src = images[index];

    // 1) Medimos ORIGEN ya (antes de cargar)
    const originRect = getOriginRectForIndex(startIndex);

    // 2) Colocamos el clon EXACTAMENTE en el origen y oculto
    Object.assign(img.style, {
      left: `${originRect.left}px`,
      top: `${originRect.top}px`,
      width: `${originRect.width}px`,
      height: `${originRect.height}px`,
      transformOrigin: "top left",
      transform: "translateZ(0)",
      visibility: "hidden",
      opacity: "0",
    });

    // 3) Cargamos/decodificamos la imagen ANTES de pintar
    //    (así evitamos el frame con imagen borrosa/estirada)
    const { w: natW, h: natH } = await loadImage(src);
    img.src = src;

    // 4) Calculamos el rect destino (centrado)
    const to = fit(natW, natH);

    // 5) Pintamos backdrop (puede empezar ya)
    gsap.to(backdrop, { opacity: 1, duration: 0.2, ease: "power1.out" });

    // 6) Preparamos el FLIP con transform, sin tocar left/top DURANTE la animación
    //    (primero llevamos el clon al rect final pero con transform "desde" el origen)
    const dx = originRect.left - to.left;
    const dy = originRect.top - to.top;
    const sx = originRect.width / to.w;
    const sy = originRect.height / to.h;

    Object.assign(img.style, {
      left: `${to.left}px`,
      top: `${to.top}px`,
      width: `${to.w}px`,
      height: `${to.h}px`,
      // seguimos ocultos: vamos a hacer doble RAF para evitar flash
    });

    // 7) Doble RAF para asegurar layout antes de mostrar y animar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // mostramos y fijamos estado inicial del tween
        gsap.set(img, {
          visibility: "visible",
          opacity: 1,
          x: dx,
          y: dy,
          scaleX: sx,
          scaleY: sy,
          force3D: true,
          willChange: "transform",
        });

        // 8) Animamos a estado final
        gsap.to(img, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: DURATION_OPEN,
          ease: "power2.out",
          onComplete: () => gsap.set(img, { willChange: "auto" }),
        });
      });
    });
  };

  // --- Navegación (slide) ---
  let sliding = false;
  const goTo = async (nextIndex, dir = 1) => {
    if (!hasMany || sliding) return;
    sliding = true;

    const current = img;
    const old = current.cloneNode(true);
    stage.appendChild(old);

    gsap.to(old, {
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      duration: DURATION_SLIDE,
      ease: "power2.inOut",
      onComplete: () => old.remove(),
    });

    index = (nextIndex + images.length) % images.length;
    const src = images[index];
    current.src = src;

    const { w: natW, h: natH } = await loadImage(src);
    const to = fit(natW, natH);

    gsap.set(current, {
      left: to.left + (dir > 0 ? 80 : -80),
      top: to.top,
      width: to.w,
      height: to.h,
      opacity: 0,
    });
    gsap.to(current, {
      x: 0,
      left: to.left,
      top: to.top,
      width: to.w,
      height: to.h,
      opacity: 1,
      duration: DURATION_SLIDE,
      ease: "power2.inOut",
      onComplete: () => {
        sliding = false;
      },
    });
  };
  const prev = () => goTo(index - 1, -1);
  const next = () => goTo(index + 1, 1);

  // --- Cierre (FLIP inverso) ---
  // --- Cierre (FLIP inverso con transform) ---
  const close = () => {
    hideMouseUI();

    // Thumbnail destino: si navegaste, puede ser diferente al inicial
    const destRect = getOriginRectForIndex(index);

    // Oculta el thumbnail destino para evitar "doble" durante el vuelo
    let destImgEl = null;
    const destEl = originEls?.[index] || originEl;
    if (destEl) {
      destImgEl =
        destEl.tagName?.toLowerCase?.() === "img"
          ? destEl
          : destEl.querySelector?.("img");
      if (destImgEl) destImgEl.style.visibility = "hidden";
    }

    // Asegura que no arrastremos x de los slides
    gsap.set(img, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "top left",
    });

    // Rect actual (ya centrado) y del destino
    const currentRect = img.getBoundingClientRect();
    // deltas (usamos transform, no tocamos left/top/width/height durante la animación)
    const dx = destRect.left - currentRect.left;
    const dy = destRect.top - currentRect.top;
    const sx = destRect.width / currentRect.width;
    const sy = destRect.height / currentRect.height;

    const tl = gsap.timeline({
      onComplete: () => {
        // limpiamos y mostramos thumbnails
        if (destImgEl) destImgEl.style.visibility = "";
        // el de origen (inicial) lo restauras en cleanup()
        cleanup();
      },
    });

    tl.to(
      img,
      {
        x: dx,
        y: dy,
        scaleX: sx,
        scaleY: sy,
        duration: DURATION_CLOSE,
        ease: "power2.in",
        willChange: "transform",
      },
      0
    ).to(backdrop, { opacity: 0, duration: 0.22, ease: "power1.in" }, 0.05);
  };

  // --- Eventos globales ---
  const onKey = (e) => {
    if (e.key === "Escape") return close();
    if (!hasMany) return;
    if (e.key === "ArrowLeft") return prev();
    if (e.key === "ArrowRight") return next();
  };
  const onResize = () => close();

  window.addEventListener("keydown", onKey);
  window.addEventListener("resize", onResize);
  stage.addEventListener("mousemove", onStageMove);
  stage.addEventListener("mouseleave", onStageLeave);
  stage.addEventListener("click", onStageClick);

  // Swipe móvil
  let sx = null;
  const onTouchStart = (e) => {
    if (hasMany) sx = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (!hasMany || sx == null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) dx > 0 ? prev() : next();
    sx = null;
  };
  stage.addEventListener("touchstart", onTouchStart, { passive: true });
  stage.addEventListener("touchend", onTouchEnd);

  // Limpieza
  const cleanup = () => {
    ctx.revert(); // 1) mata tweens y restaura estilos

    backdrop.remove();
    stage.remove();
    restoreOriginal();
    body.style.overflow = prevOverflow;
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("resize", onResize);
    stage.removeEventListener("touchstart", onTouchStart);
    stage.removeEventListener("touchend", onTouchEnd);
    stage.removeEventListener("mousemove", onStageMove);
    stage.removeEventListener("mouseleave", onStageLeave);
    stage.removeEventListener("click", onStageClick);
  };


  // Abrir
  openFromOrigin();
}
