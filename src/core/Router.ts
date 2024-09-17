import { Component } from "./Component";

interface Route {
   path: string;
   component: new (element: HTMLElement) => Component;
}

export class Router {
   private routes: Route[] = [];
   private rootElement: HTMLElement;

   constructor(rootElement: HTMLElement) {
      this.rootElement = rootElement;

      // Listen for popstate event (triggered when the user navigates with the browser)
      window.addEventListener('popstate', () => {
        return this.loadRoute(location.pathname)
      });
   }

   addRoute(path: string, component: new (element: HTMLElement) => Component) {
      this.routes.push({ path, component });
   }

   navigate(path: string) {
      history.pushState(null, '', path);
      this.loadRoute(path);
   }

   private loadRoute(path: string) {
      const matchedRoute = this.routes.find(route => route.path === path);
      
      if (matchedRoute) {
         const componentInstance = new matchedRoute.component(this.rootElement);
         componentInstance.render();
      } else {
         this.rootElement.innerHTML = `<h2>404 - Page Not Found</h2>`;
      }
   }
}
