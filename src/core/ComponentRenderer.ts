import { ITemplateLoader } from './TemplateLoader';

export class ComponentRenderer {
    constructor(private rootElement: HTMLElement, private templateLoader: ITemplateLoader) { }

    async renderComponent(instance: any, selector?: string): Promise<void> {
        const templateUrl = instance.templateUrl;
        if (!templateUrl) {
            throw new Error('Component must have a templateUrl');
        }

        const nodeHTML = await this.templateLoader.loadTemplate(templateUrl);
        this.appendToRoot(nodeHTML, selector);

        if (instance.imports) {
            this.renderImportedComponents(instance);
        }
    }

    private appendToRoot(nodeHTML: DocumentFragment, selector?: string): void {
        if (!selector) {
            this.rootElement.append(nodeHTML);
        } else {
            const appElements = Array.from(this.rootElement.getElementsByTagName('*'))
                .filter(el => el.tagName.startsWith('APP-'));

            appElements.forEach((item) => {
                if (selector.toUpperCase() === item.tagName) {
                    item.appendChild(nodeHTML);
                }
            });
        }
    }

    private renderImportedComponents(instance: any): void {
        if (instance.imports) {
            instance.imports.forEach(async (component: any) => {
                const childInstance = new component();
                await this.renderComponent(childInstance, childInstance.selector);
            });
        }
    }
}
