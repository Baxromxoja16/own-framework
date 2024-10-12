import { Metadata } from "./Component";
import { DIContainer, Token } from "../DI/DIContainer";
import 'reflect-metadata';

export class ComponentDecorator {
    private templateUrl: string;
    private styleUrls?: string[];
    private selector: string;
    private imports: any[] | undefined;

    constructor(config: Metadata) {
        this.selector = config.selector;
        this.templateUrl = config.templateUrl;
        this.styleUrls = config.styleUrls;
        this.imports = config.imports;
    }
    apply<T>(constructor: Token<T>): Token<T>{
        const original = constructor;
        const context = this;

        const newConstructor: any = function (...args: any[]) {
            const injectedDependencies = DIContainer.resolveDependencies(original);
            
            const instance: any = new original(...injectedDependencies);
            
            instance['templateUrl'] = context.templateUrl;
            instance['imports'] = context.imports;
            instance['selector'] = context.selector;

            // Load styles if provided
            context.loadStyles();

            return instance;
        };

        newConstructor.prototype = original.prototype;
        return newConstructor;
    }

    private loadStyles() {
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
