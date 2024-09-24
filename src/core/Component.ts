export abstract class Component {
   constructor(public element: HTMLElement) {
      this.element = element
   }

   render(): void {

   }

   onInit(): void {
      // Component initialization logic
   }

   onDestroy(): void {
      // Cleanup logic when component is destroyed
   }
}