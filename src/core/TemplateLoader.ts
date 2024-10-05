export interface ITemplateLoader {
    loadTemplate(url: string): Promise<string>;
}

export class TemplateLoader implements ITemplateLoader {
    async loadTemplate(url: string): Promise<string> {
        const response = await fetch(url);
        const html = await response.text();
        return html;
    }
}