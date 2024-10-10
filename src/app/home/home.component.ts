import {Component} from "../../core/Component";
import { OnInit } from "../../core/Lifecycle";
import { ButtonComponent } from "../button/button.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: '#app', // The DOM element where this component will be rendered
    templateUrl: '/src/app/home/home.component.html',
    styleUrls: ['/src/app/home/home.component.css'],
    imports: [NavbarComponent, ButtonComponent],
 })
export class HomeComponent implements OnInit {
    text = "adaw ad awd ad aw   ";

    constructor(){
        console.log("constructor");
    }

    ngOnInit() {
        console.log('Component initialized');
    }
}