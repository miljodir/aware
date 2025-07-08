# Web Frontend

React application that serves as the frontend for the Aware monitoring dashboard.

## Docker Image

The web application is containerized using a multi-stage Docker build:

1. **Build Stage**: Uses `node:lts-alpine` to build the React application with yarn
2. **Production Stage**: Uses `nginxinc/nginx-unprivileged:stable-alpine-otel` to serve static files

## Features

- Serves static React build files via nginx 
- Configured for Single Page Application (SPA) routing
- Optimized caching headers for static assets
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Gzip compression enabled
- Runs on port 8080 (nginx unprivileged default)

## Configuration

The nginx configuration is defined in `nginx.conf` and includes:
- SPA routing support (`try_files` directive)
- Static asset caching (1 year for `/static/` files)
- Security and compression headers