# Terraform Deployment: next14-mixed

Deploy the Next.js 14 mixed router example to Yandex Cloud.

## What Gets Created

- **Cloud Functions** — Server-side rendering and image optimization
- **Object Storage** — Static assets bucket + ISR cache bucket
- **YDB Serverless** — ISR metadata database (revalidation tracking)
- **API Gateway** — Request routing with OpenAPI spec
- **DNS + TLS** — Custom domain with auto-managed certificate
- **KMS + Lockbox** — Encryption keys and secrets management

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install) >= 1.5.0
- [Yandex Cloud CLI](https://yandex.cloud/docs/cli/quickstart) configured
- A service account with `editor` role in your folder
- A registered domain name

## Quick Start

1. Build the application:

   ```bash
   cd ..
   npm install
   npm run build
   yc-opennext build --project . --output ./build
   ```

2. Edit `main.tf` to set your `domain_name` and adjust other parameters as needed.

3. (Optional) Configure remote state:

   ```bash
   cp backend.tf.example backend.tf
   # Edit backend.tf — set your state bucket name
   ```

4. Deploy:

   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

## Feature Notes

- **ISR is enabled** — used in both App Router (`products/[id]` with 60s) and Pages Router (`isr-example` with 30s)
- **Standalone output** mode is configured in `next.config.js`
- **Middleware** runs at the edge for custom headers and redirects
- **Server Actions** handle form submissions without API routes
- Higher server memory (768MB) is recommended due to middleware + server actions overhead

## Production Recommendations

```hcl
env          = "production"
enable_cdn   = true
enable_queue = true

function_memory = {
  server = 1024
  image  = 512
}

prepared_instances = {
  server = 2
  image  = 1
}

allowed_origins = ["https://next14.example.com"]
allowed_cidrs   = ["10.0.0.0/8"]
```

## Rollback

Deploy a previous build version by updating `manifest_path` and `build_dir` in `main.tf`:

```hcl
manifest_path = "./previous-build/deploy.manifest.json"
build_dir     = "./previous-build"
```

Then run `terraform apply`.

## Cleanup

```bash
terraform destroy
```
