# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 20 application called "chinook-frontendd" built with Angular CLI. The project uses Angular Material, Bootstrap, and ng-bootstrap for UI components.

## Development Commands

### Essential Commands
- `npm start` or `ng serve` - Start development server (localhost:4200)
- `npm run build` or `ng build` - Build for production 
- `npm test` or `ng test` - Run unit tests with Karma
- `npm run watch` or `ng build --watch --configuration development` - Build with file watching

### Code Quality
- **Prettier**: Configured with 100 character line width, single quotes, and Angular HTML parser
- **No Linting**: Project currently has no ESLint or other linting configuration

### Angular CLI Commands
- `ng generate component component-name` - Generate new component
- `ng generate service service-name` - Generate new service
- `ng generate --help` - See all available schematics

## Project Architecture

### Core Structure
- **Entry Point**: `src/main.ts` bootstraps `AppModule` 
- **Root Module**: `src/app/app-module.ts` - Main NgModule with SharedModule, LayoutModule, and NgBootstrap
- **Root Component**: `src/app/app.ts` - Uses signals for reactive state (title signal)
- **Routing**: `src/app/app-routing-module.ts` - Nested routing with Layout component wrapping pages
- **Shared Module**: `src/app/shared/shared.module.ts` - Exports Angular Material modules, forms, HTTP client, and shared components (Spinner, FeatureCard)
- **Layout Module**: `src/app/layout/layout.module.ts` - Contains header, footer, and main layout components
- **Error Handling**: Global error listeners configured via `provideBrowserGlobalErrorListeners()`

### Key Configuration Details
- **Non-standalone Components**: Project is configured with `standalone: false` for all generated components
- **Test Files Disabled**: Angular schematics configured to skip test file generation (`skipTests: true`)
- **Strict TypeScript**: Enabled with comprehensive strict options in `tsconfig.json`
- **Angular Material Theme**: Custom theme in `src/custom-theme.scss` using Azure/Blue palette
- **Bootstrap Integration**: Bootstrap CSS included in build configuration alongside Angular Material

### Styling Setup
- **Global Styles**: `src/styles.css` 
- **Material Theme**: `src/custom-theme.scss` with Material 3 design system
- **Bootstrap**: Included via node_modules in build configuration
- **Google Fonts**: Roboto font and Material Icons loaded via CDN

### Build Configuration
- **Assets**: Located in `public/` directory
- **Polyfills**: zone.js and @angular/localize included
- **Bundle Budgets**: 500kB warning, 1MB error for initial bundle
- **Development**: Source maps enabled, optimization disabled

## Development Guidelines

### Module Architecture
- **SharedModule**: Import this in feature modules to access Angular Material, forms, and HTTP client
- **Feature Modules**: Create separate modules for major features (admin-panel, login, home)
- **Component Organization**: Group components by feature in their respective modules

### Component Generation
When generating new components, they will automatically:
- Be non-standalone (module-based)
- Skip test file generation
- Use the `app` prefix

### Shared Resources
- **Components**: Reusable components (Spinner, FeatureCard) are declared and exported by SharedModule
- **Guards**: Place route guards in `src/app/shared/guards/`
- **Interfaces**: Define TypeScript interfaces in `src/app/shared/interfaces/`
- **Validators**: Custom form validators in `src/app/shared/validators/`
- **Services**: Shared services should be provided in SharedModule or individual feature modules

### Styling Approach
- Leverage Angular Material's system-level CSS variables
- Use Bootstrap classes for layout and utilities
- Custom theming through `custom-theme.scss`
- Light color scheme is default (configurable in custom-theme.scss)

### TypeScript Configuration
- Strict mode enabled with comprehensive checks
- Experimental decorators enabled for Angular
- ES2022 target with module preservation
- Isolated modules for build performance