export const faqImages = Object.fromEntries(Object.entries(import.meta.glob(
  "/src/assets/sitelen/faq/*.png",
  { eager: true }
)).map(([name, module]) => [name.split("/").pop(), module.default]));
