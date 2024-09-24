import { Component } from "../../core/Component";
import { templateUrl } from "../../core/templateLoader";

// Apply the decorator to specify the HTML file
@templateUrl('/about/about.component.html')
export class AboutComponent extends Component {

}