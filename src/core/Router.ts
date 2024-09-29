import { ComponentDecorator } from "./ComponentDecorator";
import { ComponentRenderer } from "./ComponentRenderer";


export class Router {
   private routes: { [key: string]: any } = {};
   private rootElement: HTMLElement;
   private renderer: ComponentRenderer;

   constructor(rootElement: HTMLElement, renderer: ComponentRenderer) {
      this.rootElement = rootElement;
      this.renderer = renderer;

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
         await this.renderer.renderComponent(instance);

         // Use pushState to update the URL without reloading
         if (pushState) {
            history.pushState({}, '', path);
         }
      } else {
         console.error(`No component found for the path: ${path}`);
      }
   }
}
