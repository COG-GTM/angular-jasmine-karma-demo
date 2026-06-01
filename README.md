# Angular Jasmine Karma Demo

An educational project demonstrating unit testing best practices in Angular applications using Jasmine and Karma.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Testing Patterns](#testing-patterns)
- [Running Tests](#running-tests)
- [Further Documentation](#further-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project serves as a learning resource and reference implementation for developers who want to understand how to write effective unit tests for Angular components, services, and forms. It implements two simple business domains (shop and user management) purely to provide realistic testing scenarios.

The demo covers behavior-driven development (BDD) testing patterns with Jasmine, proper component testing with Angular's TestBed, form validation testing using reactive forms, service testing with HTTP mocking, and the AAA (Arrange-Act-Assert) testing pattern.

## Requirements

This project requires Node.js version 12.14.1 or 14.x and npm version 6.x or 7.x. It was built with Angular CLI version 12.1.3 and uses Angular 12.1.x, Jasmine 3.8.x for the testing framework, and Karma 6.3.x as the test runner.

## Quick Start

Clone the repository and install dependencies:

```bash
git clone https://github.com/COG-GTM/angular-jasmine-karma-demo.git
cd angular-jasmine-karma-demo
npm install
```

Run the development server:

```bash
npm start
```

The application will be available at http://localhost:4200 and will automatically reload when source files change.

Run the unit tests:

```bash
npm test
```

This executes the unit tests via Karma. Tests can run independently of the development server.

## Project Structure

The codebase follows a domain-driven architecture with clear separation of concerns:

```
src/app/
├── shop/                              # Shop domain module
│   ├── domain/
│   │   └── item.model.ts              # Item data model interface
│   └── infrastructure/
│       └── ng-components/
│           ├── add-item/              # Form-based item creation with validation
│           ├── item/                  # Individual item display component
│           ├── item-detail/           # Detailed item view with @Input
│           └── items/                 # Item list component
├── user/                              # User domain module
│   ├── application/
│   │   ├── UsersServices.ts           # HTTP service for external API
│   │   └── UsersServices.service.spec.ts
│   └── infrastructure/
│       └── ng-components/
│           └── users/                 # User management component
├── app.module.ts                      # Root module configuration
├── app-routing.module.ts              # Application routing (/shop, /users)
└── app.component.*                    # Root component
```

Test files are co-located with their corresponding components using the `.spec.ts` naming convention, which allows Karma to discover them automatically.

## Testing Patterns

### AAA Pattern (Arrange-Act-Assert)

All tests in this project follow the AAA pattern, which provides a clear structure for organizing test code:

```typescript
// Arrange: Set up the test environment and data
fixture = TestBed.createComponent(AddItemComponent);
component = fixture.componentInstance;

// Act: Execute the code being tested
component.form.controls['name'].setValue('foo');
component.form.controls['description'].setValue('bar');
component.form.controls['price'].setValue('33');

// Assert: Verify the expected outcome
expect(component.form.valid).toBeTruthy();
```

### Test Doubles

The project demonstrates various test double patterns as defined by Gerard Meszaros:

**Test Stub** provides indirect input to the tested code. **Mock Object** verifies indirect output by defining expectations before execution. **Test Spy** verifies indirect output by asserting expectations after execution without pre-defined expectations. **Fake Object** provides a simpler implementation, such as an in-memory database. **Dummy Object** fills a required parameter without being used.

### Component Testing Examples

**Basic Component Creation** is demonstrated in `item.component.spec.ts`, showing how to use TestBed to configure and create component instances.

**Form Validation Testing** is shown in `add-item.component.spec.ts`, demonstrating reactive form testing with validation rules and button state verification.

**Parent-Child Communication with @Input** is covered in `item-detail.component.spec.ts`, showing how to test components that receive data from parent components.

**Service Integration Testing** is demonstrated in `users.component.spec.ts`, showing how to spy on service methods and mock HTTP responses using RxJS observables.

### Jasmine Lifecycle Hooks

The tests use Jasmine's lifecycle hooks for setup and teardown:

`beforeAll` runs once before all specs in a describe block, typically used to create the TestBed configuration. `beforeEach` runs before each spec, commonly used for creating component instances and initializing data. `afterEach` runs after each spec for cleanup purposes. `afterAll` runs once after all specs for shared teardown.

### Common Jasmine Assertions

```typescript
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toEqual(expected);
expect(value).toBe(expected);
expect(value).toContain(item);
expect(value).toBeDefined();
expect(value).toBeNull();
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(n);
expect(spy).toHaveBeenCalledWith(args);
```

## Running Tests

Run tests in watch mode (default):

```bash
npm test
```

Run tests once without watch mode:

```bash
npm test -- --watch=false
```

Run tests with code coverage:

```bash
npm test -- --code-coverage
```

Coverage reports are generated in the `coverage/angular-jasmine-karma-demo` directory.

## Further Documentation

For more information on Angular testing, refer to the official Angular Testing Guide at https://angular.io/guide/testing. The Jasmine documentation is available at https://jasmine.github.io/pages/docs_home.html. For Karma configuration options, see https://karma-runner.github.io/latest/config/configuration-file.html.

## Contributing

Contributions are welcome. Please feel free to submit issues and pull requests to help improve this educational resource.

## License

This project is open source and available for educational purposes.

---

_Originally written and maintained by contributors and [Devin](https://app.devin.ai), with updates from the core team._








