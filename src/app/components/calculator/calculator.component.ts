import { Component } from "@angular/core";
import { CalculatorService } from "../../services/calculator.service";


@Component({
    selector: "calculator",
    templateUrl: "./calculator.component.html",
    styleUrls: ["./calculator.component.scss"]
})
export class CalculatorComponent {
    output: string;

    constructor(private calc: CalculatorService) {
        this.calc.display$.subscribe(n => this.output = n);
    }
}