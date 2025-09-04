# Deployment Guide (MongoDB-based Stack)

This guide describes deployment options and environment configuration for the College Feedback Portal using React (frontend), Node.js/Express (backend), and MongoDB Atlas.

## Environments
- Development: local Docker or native installs
- Staging: managed cluster with feature flags enabled
- Production: autoscaling containers, managed MongoDB Atlas, CDN fronting static assets

## Environment Variables
Backend (`backend/.env`)
- `NODE_ENV=production`
- `PORT=3000`
- `MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/college_feedback?retryWrites=true&w=majority`
- `JWT_ACCESS_TTL=15m`
- `JWT_REFRESH_TTL=30d`
- `JWT_SECRET=<secure-random>`
- `CORS_ORIGIN=https://app.example.edu`
- `REDIS_URL=redis://user:pass@host:6379`
- `S3_BUCKET=college-feedback-exports`
- `S3_REGION=us-east-1`
- `S3_ACCESS_KEY_ID=...`
- `S3_SECRET_ACCESS_KEY=...`
- `EMAIL_PROVIDER=ses|sendgrid`
- `EMAIL_FROM=noreply@example.edu`
- `RATE_LIMIT_WINDOW_MS=60000`
- `RATE_LIMIT_MAX=100`

Frontend (`frontend/.env`)
- `VITE_API_BASE_URL=https://api.example.edu/api/v1`
- `VITE_ENABLE_SSE=true`
- `VITE_SENTRY_DSN=` (optional)

## Build & Package
Frontend
```bash
npm ci && npm run build
# Output: /dist (if Vite) or /build (CRA)
```
Backend
```bash
npm ci && npm run build
# Output: /dist
```

## Docker (Production)
`docker-compose.yml`
```yaml
version: '3.8'
services:
  backend:
    image: college-feedback/backend:latest
    ports: ['3000:3000']
    env_file: ./backend/.env
    depends_on: ['redis']
    restart: unless-stopped
  frontend:
    image: college-feedback/frontend:latest
    ports: ['80:80']
    environment:
      - NGINX_PORT=80
    depends_on: ['backend']
    restart: unless-stopped
  redis:
    image: redis:7-alpine
    ports: ['6379:6379']
    command: ["redis-server", "--appendonly", "yes"]
```

Nginx for SPA
```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;

  location /api/ {
    proxy_pass http://backend:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location / {
    try_files $uri /index.html;
  }
}
```

## CI/CD (GitHub Actions)
- CI: on PR — install, lint, test, typecheck, build
- CD: on tag — build Docker images, push to registry, deploy to environment

Example CI workflow (abridged)
```yaml
name: ci
on: [push, pull_request]
jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: npm ci
        working-directory: backend
      - run: npm run lint && npm test && npm run build
        working-directory: backend
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: npm ci
        working-directory: frontend
      - run: npm run lint && npm test && npm run build
        working-directory: frontend
```

## Realtime (Socket.io / SSE)
- Expose WebSocket upgrades on backend service
- For SSE endpoints, ensure proxies do not buffer responses

## Observability
- Centralized logs (JSON) with correlation IDs
- Metrics: request duration, throughput, error rates
- Tracing: optional OpenTelemetry exporter

## Zero-Downtime Deployments
- Use rolling updates on container orchestrator (ECS/Kubernetes)
- Sticky sessions not required (JWT) unless using server sessions; otherwise use Redis session store

## Data & Backups
- Atlas backups with PITR enabled
- Scheduled exports of reports to S3 with signed URLs

## Security
- Restrict CORS to trusted origins
- WAF on edge/CDN
- Secrets from secret manager (not in repo)

## Post-Deployment Checklist
- Health checks returning 200
- DB connection stable, indexes created
- Background workers consuming queues
- Realtime channels working (dashboards, notifications)
- Error tracking receiving events
