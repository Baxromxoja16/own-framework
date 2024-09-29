export interface ITemplateLoader {
    loadTemplate(url: string): Promise<DocumentFragment>;
}

export class TemplateLoader implements ITemplateLoader {
    async loadTemplate(url: string): Promise<DocumentFragment> {
        const response = await fetch(url);
        const html = await response.text();
        return this.stringToHTML(html);
    }

    private stringToHTML(str: string): DocumentFragment {
        const template = document.createElement('template');
        template.innerHTML = str.trim();
        return template.content;
    }
}