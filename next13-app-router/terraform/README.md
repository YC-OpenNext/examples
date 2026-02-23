# Terraform Deployment: next13-app-router

Deploy the Next.js 13 App Router example to Yandex Cloud.

## What Gets Created

- **Cloud Functions** — Server-side rendering and image optimization
- **Object Storage** — Static assets bucket
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

- **ISR is disabled** — this example uses Server Components with direct data fetching
- No YDB database or cache bucket is provisioned
- Streaming and parallel routes work through the server function

## Production Recommendations

```hcl
env        = "production"
enable_cdn = true

function_memory = {
  server = 1024
  image  = 512
}

prepared_instances = {
  server = 2
  image  = 1
}
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
