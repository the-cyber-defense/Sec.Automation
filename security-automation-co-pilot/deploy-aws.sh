#!/bin/bash

# Configuration - Replace with your values
S3_BUCKET="your-app-bucket-name"
CLOUDFRONT_DISTRIBUTION_ID="your-cloudfront-id"
AWS_REGION="us-east-1"

echo "🏗️  Building the application..."
npm run build

echo "📦 Deploying to S3..."
aws s3 sync dist/ s3://$S3_BUCKET --delete --cache-control "max-age=86400"

echo "🌐 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "✅ Deployment complete!"
echo "🔗 Your app should be available at your CloudFront URL" 