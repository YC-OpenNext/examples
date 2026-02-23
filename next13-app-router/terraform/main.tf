# Deploy next13-app-router to Yandex Cloud
#
# Next.js 13 with App Router, Server Components, parallel routes, and streaming.
# No ISR pages — all content is server-rendered or static.
# Server Components and streaming may benefit from higher memory in production.

module "nextjs" {
  source = "github.com/YC-Next/terraform-yandex-nextjs//modules/nextjs_yc?ref=v1.0.0"

  app_name       = "next13-app-router"
  env            = "dev"
  domain_name    = "next13.example.com"
  manifest_path  = "../build/deploy.manifest.json"
  build_dir      = "../build"
  nodejs_version = 18

  enable_isr     = false
  enable_cdn     = false
  enable_queue   = false
  cache_ttl_days = 30

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
    example  = "next13-app-router"
    nextjs   = "13"
    router   = "app"
    features = "server-components-streaming"
  }
}
