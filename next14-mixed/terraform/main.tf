# Deploy next14-mixed to Yandex Cloud
#
# Next.js 14 with mixed App + Pages Router, Middleware, Server Actions, and ISR.
# ISR is used in both routers: App Router products/[id] (60s) and Pages Router
# isr-example (30s). Standalone output mode. Higher server memory recommended
# due to middleware + server actions overhead.

module "nextjs" {
  source = "github.com/YC-OpenNext/terraform-yandex-nextjs//modules/nextjs_yc?ref=v1.0.0"

  app_name       = "next14-mixed"
  env            = "dev"
  domain_name    = "next14.example.com"
  manifest_path  = "../build/deploy.manifest.json"
  build_dir      = "../build"
  nodejs_version = 20

  enable_isr     = true
  enable_cdn     = false
  enable_queue   = false
  cache_ttl_days = 30

  function_memory = {
    server = 768
    image  = 256
  }

  function_timeout = {
    server = 30
    image  = 30
  }

  prepared_instances = {
    server = 0
    image  = 0
  }

  allowed_origins = ["http://localhost:3000", "*"]
  allowed_cidrs   = []

  create_dns_zone = true
  dns_zone_id     = ""

  tags = {
    example  = "next14-mixed"
    nextjs   = "14"
    router   = "mixed"
    features = "middleware-server-actions-isr-standalone"
  }
}
