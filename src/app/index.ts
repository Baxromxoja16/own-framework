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

   // Handle manual navigation using links
   document.querySelectorAll('a[data-link]').forEach(link => {
      link.addEventListener('click', (event) => {
         event.preventDefault();
         const target = event.target as HTMLAnchorElement;
         router.navigate(target.getAttribute('href')!);
      });
   });
}