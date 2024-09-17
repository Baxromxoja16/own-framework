export function templateUrl(templatePath: string) {
    return function (target: any) {
       // Save the original `render` function
       const originalRender = target.prototype.render;
 
       target.prototype.render = async function () {
          // Fetch the HTML template
          const response = await fetch(templatePath);
          const template = await response.text();
 
          // Insert the template into the element
          this.element.innerHTML = template;
 
          // Call the original render function (optional, if you have other logic)
          if (originalRender) {
             originalRender.apply(this);
          }
       };
    };
 }