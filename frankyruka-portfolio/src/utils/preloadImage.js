// Caché para no recrear Image() ya cargadas
const _cache = new Map();

export async function preloadImage(src) {
  if (_cache.has(src)) return _cache.get(src);
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  const p = img.decode?.().catch(() => {});
  _cache.set(src, p);
  return p;
}