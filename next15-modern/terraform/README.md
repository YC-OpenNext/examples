# Terraform Deployment: next15-modern

Deploy the Next.js 15 modern example with React 19 to Yandex Cloud.

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
   yc-next build --project . --output ./build
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

- **ISR is disabled** — this example uses Server Actions for data mutations instead
- No YDB database or cache bucket is provisioned
- React 19 hooks (`useActionState`, `useOptimistic`) work through the server function
- Server Actions body size limit is 2MB (configured in `next.config.js`)

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

allowed_origins = ["https://next15.example.com"]
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
