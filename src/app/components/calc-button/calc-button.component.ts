import { Component, Input } from "@angular/core";
import { CalculatorService } from "../../services/calculator.service";

@Component({
    selector: "calc-button",
    templateUrl: "./calc-button.component.html",
    styleUrls: ["./calc-button.component.scss"]
})
export class CalcButtonComponent {
    @Input() text: string;
    @Input() icon: string = null;
    @Input() value: string | number;

    get isIcon() { return this.icon !== null; }

    constructor(private calc: CalculatorService) { }

    click() {
        this.calc.buttonClicked(this.value);
    }
}