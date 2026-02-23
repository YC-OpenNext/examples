# Deploy next12-pages-isr to Yandex Cloud
#
# Next.js 12 with Pages Router, ISR, catch-all routes, API routes, and i18n.
# ISR is the core feature — enables YDB database and cache bucket for
# incremental static regeneration with revalidate intervals.

module "nextjs" {
  source = "github.com/YC-Next/terraform-yandex-nextjs//modules/nextjs_yc?ref=v1.0.0"

  app_name       = "next12-pages-isr"
  env            = "dev"
  domain_name    = "next12.example.com"
  manifest_path  = "../build/deploy.manifest.json"
  build_dir      = "../build"
  nodejs_version = 18

  enable_isr     = true
  enable_cdn     = false
  enable_queue   = false
  cache_ttl_days = 7

  function_memory = {
    server = 512
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

  allowed_origins = ["*"]
  allowed_cidrs   = []

  create_dns_zone = true
  dns_zone_id     = ""

  tags = {
    example  = "next12-pages-isr"
    nextjs   = "12"
    router   = "pages"
    features = "isr-i18n-api-routes"
  }
}
