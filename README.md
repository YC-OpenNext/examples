# YC-Next Examples

Example Next.js projects demonstrating deployment to Yandex Cloud with [YC-Next](https://github.com/YC-Next/cli).

## Examples

| Directory | Next.js | Router | Features | Terraform |
|-----------|---------|--------|----------|-----------|
| `next12-pages-isr/` | 12.3.7 | Pages | ISR, catch-all routes, API routes, i18n | ISR enabled |
| `next13-app-router/` | 13.5.11 | App | Server Components, parallel routes, streaming | Minimal (no ISR) |
| `next14-mixed/` | 14.2.35 | App + Pages | Middleware, Server Actions, mixed routing | ISR enabled, higher memory |
| `next15-modern/` | 15.5.12 | App | React 19, Server Actions, partial prerendering | Minimal (no ISR) |

Each example includes a `terraform/` directory with deployment configuration for Yandex Cloud.

## Getting Started

```bash
cd next14-mixed
npm install
npm run build
npm run dev
```

## Deploy to Yandex Cloud

```bash
cd next14-mixed

# Build
npm install && npm run build
yc-next build --project . --output ./build

# Deploy
cd terraform
# Edit main.tf to set your domain_name and other parameters
terraform init && terraform apply
```

## License

MIT
