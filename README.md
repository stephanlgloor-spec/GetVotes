# GetVotes
Display the votes online on on page from the whole year always up to date

Angular 19 + TypeScript 5 application with Angular Material UI.

## Setup

```bash
cd GetVotes
npm install
npx playwright install
```

## Run locally

```bash
npm start
```

The app will be served at `http://localhost:8000`.

## Unit tests

```bash
npm test
```

## End-to-end tests

```bash
npm run test:e2e
```

## GitHub & CI/CD Pipeline

This project includes GitHub Actions workflows that automatically run tests on push and pull requests.

### Workflows

- **`.github/workflows/test.yml`** — Runs unit tests (Jasmine/Karma) and e2e tests (Playwright) on Node.js 18.x and 20.x

### GitHub Setup

1. Push your code to a GitHub repository:
   ```bash
   git init
   git remote add origin https://github.com/your-username/get-votes.git
   git add .
   git commit -m "Initial commit: Angular GetVotes app"
   git push -u origin main
   ```

2. GitHub Actions will automatically run tests on every push and pull request.

3. View test results in the **Actions** tab of your GitHub repository.

### Code Coverage

Coverage reports are uploaded to [Codecov](https://codecov.io) (requires free account integration).
