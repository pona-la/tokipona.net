import yamlResources from "@/data/resources.yaml";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export type Resource = {
	name: string;
	category: string;
	description: string | AstroComponentFactory;
	link: string;
	img: string;
};

for (let resource of yamlResources) {
	if (resource.descriptionMdx) {
		let { Content } = await import(`./resources/${resource.descriptionMdx}.mdx`);
		resource.description = Content;
		console.log(resource.description);
		delete resource.descriptionImport;
	}
}

export const resources = yamlResources;
