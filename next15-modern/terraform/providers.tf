provider "yandex" {
  zone = var.zone

  # cloud_id and folder_id are read from environment variables:
  # export YC_CLOUD_ID=b1g...
  # export YC_FOLDER_ID=b1g...
  #
  # Authentication via environment:
  # export YC_SERVICE_ACCOUNT_KEY_FILE=path/to/key.json
  # or
  # export YC_TOKEN=$(yc iam create-token)
}
