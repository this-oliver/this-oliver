# Deployment to Kubernetes (k8s)

> [!NOTE]
> The deployment relies on the k8s resource files found in the [`/common`](common/), [`/dev`](dev/) and [`prod`](prod/) directories.

Pre-requisites:

- Setup a Kubernetes cluster
- Setup a certificate manager (see this [guide](https://www.oliverrr.net/notes/enabling-tls-on-your-k8-cluster))
- Install `kubectl` and configure it to connect to your cluster

Deploying the application to a Kubernetes cluster is done in two steps:

1. Apply resources
2. Patch certain resources with updated values (e.g., secrets, images, etc.)
3. Restart the deployments to pick up the new values

## Apply Resources

To apply the resources, run the following command:

```bash
# Apply the resources for the desired environment
kubectl apply -k <env>/
```

The `<env>` must be one of the following:

- `dev` - apply resources in the [`dev/`](./dev) directory
- `prod` - apply resources in the [`prod/`](./prod) directory

## Update Resources

Some resources need to be updated with values that should not be hard-coded (i.e. secrets) or may change over time (e.g., image tags). To update these resources, you can use `kubectl patch` or `kubectl edit`.

### Secret - Registry

To update registry credential secrets, you can use the following command:

```bash
# Update a registry credential secret
kubectl create secret docker-registry <resource-name> \
  --docker-server=<your-registry-server> \
  --docker-username=<your-registry-username> \
  --docker-password=<your-registry-password>
```

Replace the placeholders:

- `<resource-name>` - name of the resource (i.e. oliverrr-regcred)
- `<your-registry-server>` - registry url without http protocol (i.e. ghcr.io)
- `<your-registry-username>` - username
- `<your-registry-password>` - token or password (recommend tokens over passwords)

### Secret - Generic

To update generic secrets, use the following command:

```bash
kubectl create secret generic <resource-name> --from-literal=<key>='<secret>'
```

Replace the placeholders:

- `<resource-name>` - name of the resource (i.e. oliverrr-regcred)
- `<key>` - key of the secret
- `<secret>` - secret value

#### Image Tags

To update image tags in deployments, run the following command:

```bash
kubectl set image deployment/<resource-name> <container-name>=<image>:<tag>
```

Replace the placeholders:

- `<resource-name>` - deployment's name (e.g., oliverrr-frontend)
- `<container-name>` - container name in the deployment spec
- `<image>:<tag>` - new image and tag (e.g., ghcr.io/this-oliver/this-oliver:v1.0.0)

## Restart deployment

Once the resources have been updated, run the following command to update the application:

```bash
kubectl rollout restart oliverrr
```
