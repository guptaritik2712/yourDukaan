# Kubernetes Cluster Setup Guide

## Prerequisites

- GCP Account with billing enabled
- `gcloud` CLI installed
- `kubectl` installed

## Step 1: Install Required Tools

### Install gcloud CLI (if not installed)
```bash
# Download and install from: https://cloud.google.com/sdk/docs/install
# After installation, initialize:
gcloud init
```

### Install kubectl (if not installed)
```bash
gcloud components install kubectl
```

## Step 2: Set Up GCP Project

```bash
# Set your project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable container.googleapis.com
gcloud services enable compute.googleapis.com
```

## Step 3: Create GKE Cluster (Auto-configured)

### Option A: Standard GKE Cluster (Recommended for Production)

```bash
# Create cluster with auto-configuration
gcloud container clusters create yourdukaan-cluster \
  --zone=us-central1-a \
  --num-nodes=2 \
  --machine-type=e2-medium \
  --disk-size=20GB \
  --enable-autorepair \
  --enable-autoupgrade \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=3

# Get credentials (auto-connects kubectl)
gcloud container clusters get-credentials yourdukaan-cluster \
  --zone=us-central1-a
```

### Option B: Autopilot GKE Cluster (Fully Managed - Easier)

```bash
# Create autopilot cluster (Google manages everything)
gcloud container clusters create-auto yourdukaan-autopilot \
  --region=us-central1

# Get credentials (auto-connects kubectl)
gcloud container clusters get-credentials yourdukaan-autopilot \
  --region=us-central1
```

### Option C: Budget-Friendly Development Cluster

```bash
# Smaller cluster for development/testing
gcloud container clusters create yourdukaan-dev \
  --zone=us-central1-a \
  --num-nodes=1 \
  --machine-type=e2-small \
  --disk-size=10GB \
  --preemptible \
  --enable-autorepair

# Get credentials
gcloud container clusters get-credentials yourdukaan-dev \
  --zone=us-central1-a
```

## Step 4: Verify Cluster Connection

```bash
# Check cluster info
kubectl cluster-info

# List nodes
kubectl get nodes

# Check current context
kubectl config current-context
```

## Step 5: Deploy yourDukaan Application

### Create namespace
```bash
kubectl create namespace yourdukaan
```

### Apply Kubernetes manifests
```bash
# From project root
cd "D:\DevOps Projects\yourDukaan"

# Create secrets
kubectl apply -f k8s/secrets.yaml

# Deploy database
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/postgres-pv.yaml

# Wait for postgres to be ready
kubectl wait --for=condition=ready pod -l app=postgres -n yourdukaan --timeout=300s

# Deploy backend
kubectl apply -f k8s/server-deployment.yaml

# Deploy frontend
kubectl apply -f k8s/client-deployment.yaml

# Check deployments
kubectl get all -n yourdukaan
```

## Step 6: Set Up ArgoCD (GitOps)

```bash
# Create ArgoCD namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD to be ready
kubectl wait --for=condition=available --timeout=300s \
  deployment/argocd-server -n argocd

# Get ArgoCD admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d

# Port-forward to access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Access at: https://localhost:8080
# Username: admin
# Password: (from command above)
```

### Create ArgoCD Application

```bash
# Apply ArgoCD application manifest
kubectl apply -f argocd-application.yaml
```

## Step 7: Access Your Application

### Get External IP (for LoadBalancer services)
```bash
# Check services
kubectl get svc -n yourdukaan

# Wait for external IP
kubectl get svc client-service -n yourdukaan -w
```

### Using NodePort (if not using LoadBalancer)
```bash
# Get external IP of any node
kubectl get nodes -o wide

# Get NodePort
kubectl get svc -n yourdukaan

# Access at: http://<NODE_EXTERNAL_IP>:<NODE_PORT>
```

## Step 8: Update Application (GitOps with ArgoCD)

```bash
# Make changes to your code
# Commit and push to GitHub
git add .
git commit -m "Update application"
git push origin main

# ArgoCD will automatically detect changes and sync
# Or manually sync:
argocd app sync yourdukaan-app
```

## Troubleshooting

### Check pod logs
```bash
kubectl logs -f deployment/server-deployment -n yourdukaan
kubectl logs -f deployment/client-deployment -n yourdukaan
```

### Check pod status
```bash
kubectl get pods -n yourdukaan
kubectl describe pod <pod-name> -n yourdukaan
```

### Restart deployments
```bash
kubectl rollout restart deployment/server-deployment -n yourdukaan
kubectl rollout restart deployment/client-deployment -n yourdukaan
```

### Delete and recreate resources
```bash
kubectl delete -f k8s/server-deployment.yaml
kubectl apply -f k8s/server-deployment.yaml
```

## Clean Up (Delete Cluster)

```bash
# Delete GKE cluster
gcloud container clusters delete yourdukaan-cluster \
  --zone=us-central1-a
```

## Cost Optimization Tips

1. **Use Preemptible Nodes**: 80% cheaper but can be terminated
2. **Use Autopilot**: Pay only for pods, not nodes
3. **Set Resource Limits**: Prevent over-provisioning
4. **Enable Cluster Autoscaler**: Scale down when not needed
5. **Use Regional Clusters for Production**: Better availability

## Automatic Reconnection

The `gcloud container clusters get-credentials` command automatically:
- ✅ Updates your kubeconfig file
- ✅ Sets the current context to the new cluster
- ✅ Configures authentication
- ✅ No manual config needed!

## Multi-Cluster Management

```bash
# List all clusters
gcloud container clusters list

# Switch between clusters
gcloud container clusters get-credentials cluster-1 --zone=us-central1-a
gcloud container clusters get-credentials cluster-2 --zone=us-east1-b

# View all contexts
kubectl config get-contexts

# Switch context
kubectl config use-context gke_project_zone_cluster-name
```
