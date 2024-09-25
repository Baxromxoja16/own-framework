import { ComponentDecorator } from "./ComponentDecorator";


export class Router {
   private routes: { [key: string]: any } = {};
   private rootElement: HTMLElement;

   constructor(rootElement: HTMLElement) {
      this.rootElement = rootElement;

      // Listen for popstate event (triggered when the user navigates with the browser)
      window.addEventListener('popstate', () => {
         this.navigate(location.pathname, false); // Don't pushState on back/forward
      });
   }

   addRoute(path: string, component: any) {
      this.routes[path] = component;
   }

   async navigate(path: string, pushState: boolean = true) {
      const component = this.routes[path];
      
      if (component) {
         // Clear the root element before rendering the new component
         this.rootElement.innerHTML = ''; 

         // Create an instance of the component
         const instance = new component(this.rootElement);

         // Load the template and styles
         await this.loadTemplate(instance);

         // Use pushState to update the URL without reloading
         if (pushState) {
            history.pushState({}, '', path);
         }
      } else {
         console.error(`No component found for the path: ${path}`);
      }
   }

   private async loadTemplate(instance: any) {
      // Assuming the instance has a templateUrl property set in the decorator
      const templateUrl = instance.templateUrl;
      const response = await fetch(templateUrl);
      const html = await response.text();

      // Set the HTML content
      this.rootElement.innerHTML = html;
   }
}
