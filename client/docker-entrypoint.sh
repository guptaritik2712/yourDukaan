#!/bin/sh

# Replace placeholder with actual environment variable value
if [ ! -z "$VITE_SERVER_URL" ]; then
  echo "Injecting VITE_SERVER_URL: $VITE_SERVER_URL"
  find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__VITE_SERVER_URL__|$VITE_SERVER_URL|g" {} +
fi

# Start nginx
nginx -g 'daemon off;'
