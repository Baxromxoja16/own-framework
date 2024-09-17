export abstract class Component {
    constructor(public element: HTMLElement) {}
 
    abstract render(): void;
 
    onInit(): void {
       // Component initialization logic
    }
 
    onDestroy(): void {
       // Cleanup logic when component is destroyed
    }
 }