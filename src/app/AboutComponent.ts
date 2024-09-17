import { Component } from "../core/Component";

export class AboutComponent extends Component {
   render(): void {
      this.element.innerHTML = `<h1>About Us</h1>`;
   }
}