import { getCollection, type CollectionEntry } from "astro:content";

export type PublishedFaqEntry = CollectionEntry<"faqEntries"> & {
	data: { published: true };
};

export async function getFaqEntries(
	group: number,
): Promise<PublishedFaqEntry[]> {
	const entries = (
		await getCollection(
			"faqEntries",
			(entry): entry is PublishedFaqEntry =>
				entry.data.published === true && entry.data.faq_group === group,
		)
	).sort((a, b) =>
		a.data.faq_index && b.data.faq_index ?
			a.data.faq_index - b.data.faq_index
		:	0,
	);
	return entries;
}
