# Custom TypeScript Frontend Framework

This is a lightweight frontend framework built using TypeScript, inspired by Angular's core principles such as components, decorators, and Dependency Injection (DI). The framework provides a modular structure for building web applications with a clean and maintainable codebase.

## Features

- **Component-Based Architecture**: Create reusable components with a powerful `@Component` decorator that handles template and style rendering.
- **Dependency Injection (DI)**: Supports standalone services and components with a robust DI system, allowing you to easily manage dependencies across your application.
- **Routing System**: A custom client-side routing solution that dynamically loads components without reloading the page, just like Angular.
- **CSS and Template Loading**: Automatically load component-specific templates and styles through the `@Component` decorator.
- **SOLID Principles and OOP**: The framework is designed following Object-Oriented Programming (OOP) and SOLID principles to ensure scalable and maintainable code.

## Getting Started

### Installation

To get started, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/your-username/custom-ts-framework.git
cd framework
npm install
npm start
`````


###Usage
Create a Component: Components are the building blocks of the application. Define a component using the @Component decorator, providing the HTML template and styles.

```typescript
import { Component } from "./core/Component";
import { MyService } from "./services/MyService";
import { DIContainer } from "./src/core/DIContainer";

@Component({
    selector: '#app',
    templateUrl: '/src/app/home/home.component.html',
    styleUrls: ['/src/app/home/home.component.css']
})
export class HomeComponent {
    myService: MyService
    constructor() {
        DIContainer.resolve(myService);
        this.myService.log(); // Use the injected service
    }
}
`````
Register a Service: Services are injected into components via the Dependency Injection system. Register services in the DIContainer and they will automatically be resolved when required.

```typescript
import { DIContainer } from "./core/DIContainer";
import { MyService } from "./services/MyService";

// Register the service
DIContainer.register(MyService, MyService);
`````
Define Routes: Use the Router to define routes and navigate between components.

```typescript
import { Router } from "./core/Router";
import { HomeComponent } from "./app/home/home.component";

// Initialize the router
const router = new Router(document.getElementById('root'));

// Add routes
router.addRoute('/', HomeComponent);

// Navigate to route
router.navigate('/');
`````

Project Structure
```bash
Copy code
/src
  /app
    /home
      home.component.ts
      home.component.html
      home.component.css
  /core
    Component.ts
    ComponentDecorator.ts
    DIContainer.ts
    Router.ts
  /services
    MyService.ts
    `````

app/: Contains your application's components.
core/: Contains the core framework logic such as the Component decorator, DI container, and routing system.
services/: Contains the services that can be injected into components.

## Contributing
Feel free to submit issues or pull requests if you want to contribute to improving the framework!

