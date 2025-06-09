terraform {
  backend "s3" {
    bucket = "my-aarish-tf-test-bucket"
    key    = "terraform.tfstate"
    region = "ap-south-1"
  }
}


provider "aws" {
    region = var.aws.region
  
}