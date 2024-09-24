import { Component } from "./Component";

interface Route {
   path: string;
   component: new (element: HTMLElement) => Component;
}

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

   navigate(path: string, pushState: boolean = true) {
      const component = this.routes[path];

      if (component) {
         const instance = new component(this.rootElement);
         instance.render(); // Render the component inside the root element

         // Use pushState to update the URL without reloading
         if (pushState) {
            history.pushState({}, '', path);
         }
      } else {
         console.error(`No component found for the path: ${path}`);
      }
   }

  
}
