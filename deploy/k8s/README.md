# Kubernetes Deployment

This directory contains the Kubernetes deployment files for the application.

- [deployment.yaml](deployment.yaml) - defines environment variables and the container image that will be used for the application.
- [service.yaml](service.yaml) - defines a interface that will be used to communicate with the application.
- [ingress.yaml](ingress.yaml) - defines which domain can access the application.
- [kustomization.yaml](kustomization.yaml) - defines the resources that will be deployed.
