export async function preloadImage(src) {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    return img.decode?.().catch(() =>{});
}