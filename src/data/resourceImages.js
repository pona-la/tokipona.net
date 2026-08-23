// src/data/resourceImages.js
export const resourceImages = import.meta.glob(
	"/src/assets/sitelen/resources/*.{jpeg,jpg,png,gif,svg,webp}",
	{ eager: true },
);
