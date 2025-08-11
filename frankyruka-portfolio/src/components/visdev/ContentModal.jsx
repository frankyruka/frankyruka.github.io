"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";

export default function ContentModal({
  images = [],
  initialIndex = 0,
  originRect,
  onClose,
}) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(initialIndex || 0);

  const modalRef = useRef(null);
  const imageWrapRef = useRef(null);
  const startX = useRef(null);
  const lastDir = useRef("right");

  const hasMany = images.length > 1;
  const clamp = (i) => (i + images.length) % images.length;

  // ---------- helpers ----------
  const slideTo = (newIndex) => {
    if (!imageWrapRef.current) return;
    gsap.to(imageWrapRef.current, {
      x: lastDir.current === "left" ? 80 : -80,
      opacity: 0,
      duration: 0.22,
      ease: "power2.inOut",
      onComplete: () => setIndex(newIndex),
    });
  };
  const prev = () => {
    lastDir.current = "left";
    slideTo(clamp(index - 1));
  };
  const next = () => {
    lastDir.current = "right";
    slideTo(clamp(index + 1));
  };

  // ---------- mount + open FLIP ----------
  useEffect(() => {
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const animateIn = () => {
      if (!modalRef.current) return;
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.18, ease: "power1.out" }
      );

      if (imageWrapRef.current && originRect) {
        // medir después de que el wrapper tenga tamaño definitivo
        const doFlip = () => {
          const targetRect = imageWrapRef.current.getBoundingClientRect();
          const from = {
            x: originRect.left - targetRect.left,
            y: originRect.top - targetRect.top,
            scaleX: originRect.width / targetRect.width,
            scaleY: originRect.height / targetRect.height,
          };
          gsap.set(imageWrapRef.current, {
            transformOrigin: "top left",
            x: from.x,
            y: from.y,
            scaleX: from.scaleX,
            scaleY: from.scaleY,
            opacity: 1,
            willChange: "transform",
          });
          gsap.to(imageWrapRef.current, {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.32,
            ease: "power2.out",
            onComplete: () =>
              gsap.set(imageWrapRef.current, { willChange: "auto" }),
          });
        };
        // doble RAF para asegurar layout
        requestAnimationFrame(() => requestAnimationFrame(doFlip));
      } else if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { scale: 0.98, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.22, ease: "power2.out" }
        );
      }
    };

    requestAnimationFrame(animateIn);
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [originRect]);

  // ---------- slide-in tras cambiar index ----------
  useEffect(() => {
    if (!mounted || !imageWrapRef.current) return;
    gsap.fromTo(
      imageWrapRef.current,
      { x: lastDir.current === "left" ? -80 : 80, opacity: 0, scale: 0.985 },
      { x: 0, opacity: 1, scale: 1, duration: 0.22, ease: "power2.inOut" }
    );
  }, [index, mounted]);

  // ---------- close FLIP ----------
  const handleClose = () => {
    if (!modalRef.current || !imageWrapRef.current) {
      onClose?.();
      return;
    }

    if (!originRect) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.18,
        ease: "power1.in",
        onComplete: onClose,
      });
      return;
    }

    const targetRect = imageWrapRef.current.getBoundingClientRect();
    const to = {
      x: originRect.left - targetRect.left,
      y: originRect.top - targetRect.top,
      scaleX: originRect.width / targetRect.width,
      scaleY: originRect.height / targetRect.height,
    };

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(
      imageWrapRef.current,
      {
        transformOrigin: "top left",
        x: to.x,
        y: to.y,
        scaleX: to.scaleX,
        scaleY: to.scaleY,
        duration: 0.28,
        ease: "power2.in",
      },
      0
    ).to(
      modalRef.current,
      { opacity: 0, duration: 0.22, ease: "power1.in" },
      0.02
    );
  };

  // ---------- teclado ----------
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (hasMany && e.key === "ArrowLeft") prev();
      if (hasMany && e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, hasMany, index]);

  // ---------- swipe móvil ----------
  const onTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startX.current == null || !hasMany) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) dx > 0 ? prev() : next();
    startX.current = null;
  };

  if (!mounted || !images.length) return null;

  const current = images[index];
  const src = typeof current === "string" ? current : current?.src || "";

  const content = (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[49] bg-white flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      {/* close */}
      <button
        aria-label="Cerrar"
        className="absolute top-4 right-4 text-3xl text-black"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        ×
      </button>

      {/* prev */}
      {hasMany && (
        <button
          aria-label="Anterior"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-4xl md:text-5xl text-black"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        >
          ‹
        </button>
      )}

      {/* image wrapper (target del FLIP) */}
      <div
        ref={imageWrapRef}
        className="relative w-[92vw] max-w-[1600px] h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {src ? (
          <Image
            key={src}
            src={src}
            alt={`image-${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 92vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black">
            No se pudo cargar la imagen
          </div>
        )}
      </div>

      {/* next */}
      {hasMany && (
        <button
          aria-label="Siguiente"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-4xl md:text-5xl text-black"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          ›
        </button>
      )}

      {/* counter */}
      {hasMany && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-black">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}
