import { Metadata } from "./Component";

export class ComponentDecorator {
    private templateUrl: string;
    private styleUrls?: string[];
    private selector: string;

    constructor(config: Metadata) {
        this.selector = config.selector;
        this.templateUrl = config.templateUrl;
        this.styleUrls = config.styleUrls;
    }
    apply(constructor: any) {
        const original = constructor;

        const context = this;

        // Create a new constructor to extend behavior
        const newConstructor: any = function (...args: any[]) {
            const instance = new original(...args);
            instance.templateUrl = context.templateUrl; // Store the template URL in the instance

            // Load styles if provided
            context.loadStyles(instance);

            return instance;
        };

        newConstructor.prototype = original.prototype;
        return newConstructor;
    }

    private loadStyles(instance: any) {
        if (this.styleUrls) {
            this.styleUrls.forEach(styleUrl => {
                const linkTag = document.createElement('link');
                linkTag.rel = 'stylesheet';
                linkTag.href = styleUrl; // Directly use the style URL
                document.head.appendChild(linkTag);
            });
        }
    }

}
