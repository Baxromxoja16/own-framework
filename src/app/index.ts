import { ComponentRenderer } from "../core/ComponentRenderer";
import { DIContainer } from "../core/DIContainer";
import { Router } from "../core/Router";
import { TemplateLoader } from "../core/TemplateLoader";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { LoggingService } from "./services/LoggingService";

DIContainer.register(LoggingService, LoggingService);

// Mount the component on a DOM element
const rootElement = document.getElementById("app");
if (rootElement) {

   const templateLoader = new TemplateLoader();
   const componentRenderer = new ComponentRenderer(rootElement, templateLoader);

   // Pass rootElement and componentRenderer to the Router
   const router = new Router(rootElement, componentRenderer);

   // Define routes
   router.addRoute('/', HomeComponent);
   router.addRoute('/about', AboutComponent);

   // Load the initial route
   router.navigate(location.pathname);

   rootElement.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // Check if the clicked element or any of its parents have routerLink
      const link = target.closest('a[routerLink]');

      if (link) {
         event.preventDefault();
         const path = link.getAttribute('routerLink');
         if (path) {
            router.navigate(path);
         }
      }
   });
}