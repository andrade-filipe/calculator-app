# CalculatorApp - Front-End
This is the Front-end for my Calculator Project, the back-end is in: https://github.com/andrade-filipe/calculator-back-end

Front-end is made with Angular and has 4 main components

## Components
### 1. Calculator Component
This component is used to organize the others, also is the parent for the other components, wich means that will use it to pass data with @Input and @Output decorators

Has a method called refreshDisplay that captures an event from PadComponent and tell the DisplayComponent to Refresh Information
Variable "refresh" it's what the method updates

### 2. Display Component
Component created to GET the mathematical expression from the API and show to the user.

Has 3 methods:
ngOnInit: to call the getExpression() method in inicialization.
ngOnChanges: to call the getExpression() method when the user clicks in something.
getExpression: calls the GET http Request from the service that communicates with my API.

### 3.PadComponent
Component created to map the keyboard of my calculator and send consistent values to the API when the User clicks in any button

Has 5 methods:
ngOnInit(): Calls the clearExpression method on inicialization to make sure that the expected value will be displayed (zero)
expressionParser(): makes the communication with the HTML, giving to the buildExpression method the right values
buildExpression(): makes a post request with the respective value of the button the user clicked and emits an event to the CalculatorComponent
solveExpression(): makes a request to the API calling a method that solves the expression the user has written and emits an event to the CalculatorComponent
clearExpression(): makes a request to the API calling a method that restarts the display and emits an event to the CalculatorComponent

Observation: the event emitted makes the display refresh, showing to the user the expression he is building

### 4.AppComponent
This is the defaut component that angular creates, in my application i only need him to do a "loading screen", it's between quotation marks because there's actually no screen, but the application sucessfully displays the current state with a json on the top of the screen, what can be attached to a component later, providing a loading screen.

## Service

### Calculator Service
This is what makes all the communication with the API, i opted to make a Reactive aproach using variables with pipe from RxJS.

## Other

### data-state.enum.ts, app-state.ts(interface)
created to help displaying the current data loading state

### custom-response.ts(interface)
created to send and recieve data in a specific template, i use the same template inside my back-end, wich is very usefull and keeps the data I/O consistent, reliable and constant
