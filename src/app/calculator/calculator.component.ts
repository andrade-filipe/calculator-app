import { CalculatorService } from './../services/calculator-service/calculator.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, share, switchMap } from 'rxjs';
import { CustomResponse } from '../interfaces/custom-response';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
    constructor(private calculatorService: CalculatorService) {}

    private subscription !: Subscription;

    private expression$!: Observable<CustomResponse>;

    inputExpression$!: Observable<string>;

    ngOnInit(): void {
        this.expression$ = this.calculatorService.getExpression();
        this.inputExpression$ = this.expression$.pipe(
            switchMap((expression) => {
                return expression.data.expression;
            }), share()
        );
    }

    checkExpression(expression: string): boolean {
        if (
            expression?.includes('%%') ||
            expression?.includes('//') ||
            expression?.includes('()') ||
            expression?.includes('**') ||
            expression?.match(new RegExp('[a-zA-z]'))
        ) {
            return false;
        }
        return true;
    }

    /*DISPLAY INTERACTION */
    clickedEvent(event: string) {
        if (event == 'clear') {
            this.subscription = this.calculatorService.clearExpression().subscribe();
        } else if (event == 'solve') {
            this.subscription = this.calculatorService.solveExpression().subscribe();
        } else {
        }
    }

    fromDisplay(event: string) {
    }
}

export function Observe<T>(observedKey: string): PropertyDecorator {
    // `target` defines the target class prototype that the property decorator
    // is attached to.
    return (target: any, key: string | symbol): void => {
        // Declare all the active subjects for a given target class instance.
        const subjects = new WeakMap<any, BehaviorSubject<T | undefined>>();

        // Return the associated subject for a given target class instance.
        // In case none is available yet, create one.
        const getSubject = (
            instance: any
        ): BehaviorSubject<T | undefined> | undefined => {
            if (!subjects.has(instance)) {
                subjects.set(
                    instance,
                    new BehaviorSubject<T | undefined>(undefined)
                );
            }
            return subjects.get(instance);
        };

        // Transform the decorated property into an `Observable` that propagates
        // the changes of the internal subject.
        Object.defineProperty(target, key, {
            get(): Observable<T | undefined> | undefined {
                // `this` is the current instance of the class
                return getSubject(this);
            },
        });

        // Transform the definition of the observed property so that we can propagate
        // its value changes to the internal subject.
        Object.defineProperty(target, observedKey, {
            get(): T | undefined {
                return getSubject(this)?.getValue();
            },
            set(instanceNewValue: T): void {
                getSubject(this)?.next(instanceNewValue);
            },
        });
    };
}
