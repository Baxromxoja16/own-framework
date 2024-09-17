import { Component } from "../core/Component";

export class HomeComponent extends Component {
   render(): void {
      this.element.innerHTML = `<h1>Welcome to the Home Page!</h1>`;
   }
}

