output "api_gateway_domain" {
  description = "API Gateway domain"
  value       = module.nextjs.api_gateway_domain
}

output "custom_domain" {
  description = "Custom domain name"
  value       = module.nextjs.custom_domain
}

output "certificate_status" {
  description = "TLS certificate status"
  value       = module.nextjs.certificate_status
}

output "assets_bucket" {
  description = "Assets bucket name"
  value       = module.nextjs.assets_bucket
}

output "cache_bucket" {
  description = "Cache bucket name (null if ISR disabled)"
  value       = module.nextjs.cache_bucket
}

output "server_function_id" {
  description = "Server function ID"
  value       = module.nextjs.server_function_id
}

output "image_function_id" {
  description = "Image function ID"
  value       = module.nextjs.image_function_id
}

output "deployment_info" {
  description = "Deployment information"
  value       = module.nextjs.deployment_info
}

output "log_group_id" {
  description = "Log group ID for functions"
  value       = module.nextjs.log_group_id
}
