# Deployment

This directory contains configuration files for deploying the application across different platforms.

- [`/k8s`](k8s/): Kubernetes deployment configurations.
- `/docker-compose*.yaml`: Docker Compose files for production, development and cms-only environments.
- `/nginx*.conf`: Nginx configuration files for serving the application in production and development environments.

## Kubernetes (k8s)

The Kubernetes configurations are located in the [`k8s/`](k8s/) directory and consist of the following resources:

| Resource              | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| Deployment            | Manages the application pods.                                  |
| Service               | Exposes the application to the network.                        |
| Ingress               | Manages external access to the services, typically HTTP.       |
| ConfigMap             | Stores configuration data that can be used by the application. |
| Secret                | Stores sensitive information such as passwords and API keys.   |
| PersistentVolumeClaim | Manages storage for the application.                           |

## Docker Compose

There are three types of Docker Compose files in this directory:

| File                      | Description                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| `docker-compose.yaml`     | Production environment configuration - frontend, backend (cms) and reverse proxy (nginx) with SSL. |
| `docker-compose.dev.yaml` | Development environment configuration - frontend, backend (cms) and reverse proxy (nginx).         |
| `docker-compose.cms.yaml` | Headless CMS environment configuration - backend (cms) and reverse proxy (nginx).                  |

## Nginx Configuration

> [!NOTE]
> Although the Nginx exposes the frontend and backend (cms) services, it is not used by the services to communicate with each other - this is performed directly via the docker network for docker-compose and via the Kubernetes service for k8s deployments.

There are two Nginx configuration files in this directory that are used to setup the reverse proxy for the application:

| File             | Description                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| `nginx.conf`     | Production environment configuration - serves the frontend with SSL and proxies requests to the backend (cms).     |
| `nginx.dev.conf` | Development environment configuration - serves the frontend without SSL and proxies requests to the backend (cms). |
