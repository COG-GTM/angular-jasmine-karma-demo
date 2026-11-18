# AngularJasmineKarmaDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

<br />

## Setup

Requires Node.js and npm. The project pins Angular CLI 12, so on Node 17 or newer every `ng` command needs `NODE_OPTIONS=--openssl-legacy-provider`.

```bash
npm install
```

<br />

## Development server

Run `npm start` (or `npx ng serve`) for a dev server. Navigate to `http://localhost:4200/`; it redirects to `/shop`, and `/users` is the second screen. The app will automatically reload if you change any of the source files.

<br />

## Running unit tests

Run `npm test` (or `npx ng test`) to execute the unit tests via [Karma](https://karma-runner.github.io) in Chrome. You can run the tests even without the server running 😲

For a single headless run (CI, containers), set `CHROME_BIN` to a Chrome binary and run `npx ng test --no-watch --browsers=ChromeHeadless`; inside a container Chrome also needs `--no-sandbox`, which takes a `ChromeHeadless`-based custom launcher (`karma.conf.js` does not define one).

> **Known issue:** on `master`, `ng build` and `ng test` currently fail to compile because two relative imports point one directory too high. See [Known state of master](docs/architecture.md#known-state-of-master).

<br />

## Project layout

```
src/app/
├── app.module.ts, app-routing.module.ts, app.component.*   root module, routes (/shop, /users), shell
├── shop/
│   ├── domain/item.model.ts                                 Item interface
│   └── infrastructure/ng-components/
│       ├── items/        /shop page: hard-coded list with sorting
│       ├── item/         one item card (@Input)
│       ├── add-item/     reactive form (spec example only)
│       └── item-detail/  @Input example (spec example only)
└── user/
    ├── application/UsersServices.ts                         HttpClient call to jsonplaceholder /users
    └── infrastructure/ng-components/users/                  /users page
```

Every class has its `*.spec.ts` beside it. The [architecture doc](docs/architecture.md) describes the app, its data flow and the tests, with a [diagram](docs/diagrams/architecture.png).

<br />

## About this project
It is intended to be an introduction to unit testing with jasmine, providing information on the most basic concepts and sample tests. This is a work in progress, so, content will be added whenever possible.

<br />

## About Jasmine tests
> Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests. It's developed by Pivotal Labs and is open-source.

> Karma: is a test runner, it allows us to run the test suite. It's developed by Google.

> Both, Jasmine and Karma, come preinstalled and preconfigured in an Angular project created with Angular CLI.

> The Unit Tests must be coded in component-name.**spec.ts** files, so that Karma can find them.

> **There are a couple of example tests with comments on the _item_ and _add-item_ components.**

<br />

### Test doubles
Son un término genérico que hace referencia a cualquier caso en el que se reemplaza un objeto de producción con otro con el único objetivo de probar el código.

According with Gerard Meszaros there are at least 5 kinds of doubles
https://en.wikipedia.org/wiki/Test_double
- Test stub: used for providing the tested code with "indirect input".
- Mock object: used for verifying "indirect output" of the tested code, by first defining the expectations before the tested code is executed.
- Test spy: used for verifying "indirect output" of the tested code, by asserting the expectations afterwards, without having defined the expectations before the tested code is executed. It helps in recording information about the indirect object created.
- Fake object: used as a simpler implementation, e.g. using an in-memory database in the tests instead of doing real database access.
- Dummy object: used when a parameter is needed for the tested method but without actually needing to use the parameter.

<br />

### AAA Pattern: sections of a Unit Test
1. Arrange:  code required to setup a specific test. Here objects would be created, mocks setup, ...
    ``` js
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    ```
2. Act: which should be the invocation of the method being tested
    ``` js
    component.form.controls['name'].setValue('foo');
    component.form.controls['description'].setValue('bar');
    component.form.controls['price'].setValue('33');
    ``` 
3. Assert: check whether the expectations were met.
    ``` js
    expect(component.form.valid).toBeTruthy();
    ``` 
<br />

### Jasmine assertion functions
- expect(array).toContain(member);
- expect(fn).toThrow(string);
- expect(fn).toThrowError(string);
- expect(instance).toBe(instance);
- expect(mixed).toBeDefined();
- expect(mixed).toBeFalsy();
- expect(mixed).toBeNull();
- expect(mixed).toBeTruthy();
- expect(mixed).toBeUndefined();
- expect(mixed).toEqual(mixed);
- expect(mixed).toMatch(pattern);
- expect(number).toBeCloseTo(number, decimalPlaces);
- expect(number).toBeGreaterThan(number);
- expect(number).toBeLessThan(number);
- expect(number).toBeNaN();
- expect(spy).toHaveBeenCalled();
- expect(spy).toHaveBeenCalledTimes(number);
- expect(spy).toHaveBeenCalledWith(…arguments);

<br />

### Jasmine functions that can be run before or after tests
To help a test suite DRY up any duplicated setup and teardown code, Jasmine provides the global beforeEach, afterEach, beforeAll, and afterAll functions:
- beforeAll:  is called only once before all the specs in describe are run
  - e.g.: to createt the TestBed
- afterAll:  is called only once after all the specs in describe are run
  - e.g.: to run some shared teardown after each of the specs in the describe in which it is called.
- beforeEach: is called once before each spec in the describe in which it is called
  - This functionality is very useful for running the common code in the application, lie data initialization.
- afterEach: is called once after each spec in the describe in which it is called
  - Generally used to reset/clean up purposes at the end of specs

<br />

## Jasmine methods
- TestBed: modulo de angular que nos permite manipular las pruebas y configurarlas.
- SpyOn is a Jasmine feature that allows dynamically intercepting the calls to a function nd change its result.

<br />

## Testing Cases / How to test...

### Testing component creation
- You can see an example at **item.component.spec.ts**
- this is a very basic test, but it's well documented.

### Testing form validation
You can see an example at **add-item.component.spec.ts**

### Testing sharing data from parent to child (using @Input)
You can see an example at **item-detail.component.spec.ts**

### Testing calling a service from a component
You can see an example at **users.component.spec.ts**

### Testing a list component (sorting)
You can see an example at **items.component.spec.ts**

### RouterLink
// TODO: pending to code

### Testing service against rest api
You can see an example at **UsersServices.service.spec.ts**, which uses `HttpClientTestingModule` and `HttpTestingController` so no real request is sent.

### Testing service against **real** rest api
// TODO: pending to code
- documentation: 
  - https://stackoverflow.com/questions/59204306/trying-to-run-angular-httpclient-jasmine-test-against-live-rest-api-nothing-hap
