export interface ITemplateInterpolation {
    interpolateTemplate(templateHTML: string, instance: any): string
}

export class TemplateInterpolation implements ITemplateInterpolation{

    interpolateTemplate(templateHTML: string, instance: any): string {
        const interpolationRegex = /\{\{([^}]+)\}\}/g;
        return templateHTML.replace(interpolationRegex, (_, expression) => {
            const propertyName = expression.trim();
            const value = instance[propertyName];
            return value !== undefined ? value : '';
        });
    }
}