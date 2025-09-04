# Testing Strategy

## Unit Testing (Jest + RTL)
- Components: render states, ARIA roles, interactions.
- Hooks: `useAuth`, `useFeedback`, `useApi` with mocked services.
- Utilities: validators, formatters.

## Integration Testing
- Critical flows: login, form fill (autosave + submit), analytics filters, role-guarded routes.
- Mock API with MSW; test routing with React Router.

## E2E Testing (Cypress)
- Happy paths per role; accessibility checks with cypress-axe.
- Visual regression on key pages.

## Coverage Goals
- Overall >= 70%; auth/form flows >= 85%.

## CI Integration
- GitHub Actions: run unit/integration on PR; nightly E2E on main; upload coverage.

## Test Data & Fixtures
- Factory utilities per `__tests__/__mocks__/` and MSW handlers mirroring `services/api/`.
