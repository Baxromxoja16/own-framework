import { Component } from "../core/Component";

export class MyComponent extends Component {
    render(): void {
        this.element.innerHTML = `<h1>Hello from MyComponent!</h1>`;
    }
}