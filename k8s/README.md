# Deployment to Kubernetes (k8s)

Deploying the application to a Kubernetes cluster is done in two steps:

1. Apply resources
2. Patch certain resources with updated values (e.g., secrets, images, etc.)
3. Restart the deployments to pick up the new values

Pre-requisites:

- Setup a Kubernetes cluster
- Setup a certificate manager (see this [guide](https://www.oliverrr.net/notes/enabling-tls-on-your-k8-cluster))
- Install `kubectl` and configure it to connect to your cluster

## Step 1: Apply Resources

To apply the resources, run the following command:

```bash
# Apply the resources for the desired environment
kubectl apply -k env/dev/ --namespace=oliverrr
# or for production
kubectl apply -k env/prod/ --namespace=oliverrr
# Apply shared/common resources
kubectl apply -k common/ --namespace=oliverrr
```

## Step 2: Update Resources

Some resources need to be updated with values that should not be hard-coded (i.e. secrets) or may change over time (e.g., image tags). To update these resources, you can use `kubectl patch` or `kubectl edit`.

### Secret - Registry

To update registry credential secrets, you can use the following command:

```bash
kubectl create secret docker-registry regcred \
  --docker-server=ghcr.io \
  --docker-username=<your-username> \
  --docker-password=<your-token> \
  --namespace=oliverrr
```

Replace `<your-username>` and `<your-token>` with your actual registry credentials.

### Secret - Generic

To update generic secrets (see `common/secrets.yaml` for reference), use the following commands:

**Backend secrets:**

```bash
kubectl create secret generic backend \
  --from-literal=BACKEND_ADMIN_JWT_SECRET='your-admin-jwt-secret' \
  --from-literal=BACKEND_API_TOKEN_SALT='your-api-token' \
  --from-literal=BACKEND_APP_KEYS='your-app-keys' \
  --from-literal=BACKEND_JWT_SECRET='your-jwt-secret' \
  --from-literal=BACKEND_ENCRYPTION_KEY='your-encryption-key' \
  --from-literal=BACKEND_TRANSFER_TOKEN_SALT='your-transfer-token' \
  --namespace=oliverrr
```

**Frontend secrets:**

```bash
kubectl create secret generic frontend --from-literal=FRONTEND_NUXT_CMS_API_TOKEN='your-api-token' --namespace=oliverrr
```

Replace the values with your actual secrets. The keys should match those defined in `common/secrets.yaml` for backend and frontend components.

### Image Tags

To update image tags in deployments, run the following command:

```bash
kubectl set image deployment/frontend frontend=ghcr.io/this-oliver/this-oliver:v1.0.0 --namespace=oliverrr
```

- `frontend` is the deployment name (see `common/deployment.yaml`)
- `frontend` is the container name in the deployment spec
- `ghcr.io/this-oliver/this-oliver:v1.0.0` is the new image and tag

## Step 3: Restart deployment

Once the resources have been updated, run the following command to update the application:

```bash
kubectl rollout restart deployment/frontend --namespace=oliverrr
kubectl rollout restart deployment/backend --namespace=oliverrr
```
