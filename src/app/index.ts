import { Router } from "../core/Router";
import { AboutComponent } from "./AboutComponent";
import { HomeComponent } from "./HomeComponent";
import { MyComponent } from "./MyComponent";

// Mount the component on a DOM element
const rootElement = document.getElementById("app");
if (rootElement) {
//    const myComponent = new MyComponent(rootElement);
//    myComponent.render();
   
   const router = new Router(rootElement);

   // Define routes
   router.addRoute('/', MyComponent);
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