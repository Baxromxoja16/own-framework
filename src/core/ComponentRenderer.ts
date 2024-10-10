import { OnInit } from './Lifecycle';
import { ITemplateInterpolation } from './TemplateInterpolation';
import { ITemplateLoader } from './TemplateLoader';

export class ComponentRenderer {
    constructor(
        private rootElement: HTMLElement, 
        private templateLoader: ITemplateLoader, 
        private templateInterpolation: ITemplateInterpolation) { }

    async renderComponent(instance: any, selector?: string): Promise<void> {
        const templateUrl = instance.templateUrl;
        if (!templateUrl) {
            throw new Error('Component must have a templateUrl');
        }

        let templateHTML = await this.templateLoader.loadTemplate(templateUrl);

        // Apply template interpolation
        templateHTML = this.templateInterpolation.interpolateTemplate(templateHTML, instance);


        // Convert the interpolated string into a DocumentFragment
        const nodeHTML = this.stringToHTML(templateHTML); // This method converts the string to HTML nodes

        // Call ngOnInit if the component implements it
        if (this.isOnInit(instance)) {
            instance.ngOnInit();
        }
        
        
        // Append to the DOM
        this.appendToRoot(nodeHTML, selector);

        if (instance.imports) {
            this.renderImportedComponents(instance);
        }
    }

    private isOnInit(instance: any): instance is OnInit {
        return typeof instance.ngOnInit === 'function';
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

    // Helper method to convert a string to DocumentFragment
    private stringToHTML(str: string): DocumentFragment {
        const template = document.createElement('template');
        template.innerHTML = str.trim();
        return template.content;
    }
}
