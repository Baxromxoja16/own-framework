import {Component} from "../../core/Component";
import { ButtonComponent } from "../button/button.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: '#app', // The DOM element where this component will be rendered
    templateUrl: '/src/app/home/home.component.html',
    styleUrls: ['/src/app/home/home.component.css'],
    imports: [NavbarComponent, ButtonComponent],
 })
export class HomeComponent {
    text = "adaw ad awd ad aw   ";
}