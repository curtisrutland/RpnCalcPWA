import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs/Rx";


@Injectable()
export class CalculatorService {

    private appending = false;
    private buffer = "0";
    private stack: number[] = [];

    get displayBuffer() {
        let [first, last] = this.buffer.split('.');
        first = parseFloat(first).toLocaleString();
        last = last == null ? "" : "." + last;
        return first + last;
    }

    get currentValue() {
        return parseFloat(this.buffer);
    }

    private displaySubject = new BehaviorSubject<string>("0");
    display$ = this.displaySubject.asObservable();

    buttonClicked(val: string | number) {
        if (typeof val === "string") {
            console.log(`string: ${val}`);
            if (val === ".")
                this.handlePeriod();
            else
                this.handleOperator(val);
        } else {
            console.log(`number: ${val}`);
            this.handleDigit(val);
        }
    }

    private updateDisplay(err?: string) {
        if (err) {
            this.displaySubject.next(err);
        } else {
            this.displaySubject.next(this.displayBuffer);
        }
    }

    private handleDigit(digit: number) {
        if (!this.appending) {
            this.buffer = "";
            this.appending = true;
        }
        this.buffer += digit.toString();
        this.updateDisplay();
    }

    private handlePeriod() {
        if (!this.appending) {
            this.buffer = "0.";
            this.appending = true;
        } else {
            if (this.buffer.indexOf(".") === -1) {
                this.buffer += ".";
                console.log(this.buffer);
            }
        }
        this.updateDisplay();
    }

    private handleOperator(operator: string) {
        switch (operator) {
            case "clear":
                this.clear();
                break;
            case "backspace":
                this.backspace();
                break;
            case "enter":
                this.enter();
                break;
            case "add":
                this.operator((a, b) => a + b);
                break;
            case "subtract":
                this.operator((a, b) => a - b);
                break;
            case "multiply":
                this.operator((a, b) => a * b);
                break;
            case "divide":
                this.operator((a, b) => a / b);
                break;
        }
    }

    private clear() {
        this.appending = false;
        this.buffer = "0";
        this.stack = [];
        this.updateDisplay();
    }

    private backspace() {
        if (!this.appending) return;
        this.buffer = this.buffer.slice(0, -1);
        if (this.buffer === "") this.buffer = "0";
        this.updateDisplay();
    }

    private enter() {
        this.stack.push(this.currentValue);
        this.appending = false;
    }

    private operator(op: (a: number, b: number) => number) {
        if (this.appending) {
            this.enter();
        }
        if (this.stack.length < 2) {
            this.clear();
            this.updateDisplay("Stack Underflow");
        } else {
            let b = this.stack.pop();
            let a = this.stack.pop();
            let r = op(a, b);
            this.stack.push(r);
            this.buffer = r.toString();
            this.updateDisplay();
        }
    }
}