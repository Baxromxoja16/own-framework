import { Router } from "../core/Router";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";

// Mount the component on a DOM element
const rootElement = document.getElementById("app");
if (rootElement) {

   const router = new Router(rootElement);

   // Define routes
   router.addRoute('/', HomeComponent);
   router.addRoute('/about', AboutComponent);

   // Load the initial route
   router.navigate(location.pathname);

   rootElement.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // Check if the clicked element or any of its parents have routerLink
      const link = target.closest('a[routerLink]');
      console.log(link);
      if (link) {
         event.preventDefault();
         const path = link.getAttribute('routerLink');
         if (path) {
            router.navigate(path);
         }
      }
   });
}