export function templateUrl(templatePath: string) {
   return function (target: any) {
      const originalRender = target.prototype.render;

      target.prototype.render = async function () {
         try {
            const response = await fetch("/src/app/" + templatePath);

            if (!response.ok) throw new Error('Failed to load template');
            const template = await response.text();

            this.element.innerHTML = template;

            if (originalRender) {
               originalRender.apply(this);
            }
         } catch (error) {
            console.error('Error loading template:', error);
            this.element.innerHTML = '<h2>Error loading template</h2>';
         }
      };
   };

}