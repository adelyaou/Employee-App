# employee-manifest

This folder contains Kubernetes manifests and Kustomize overlays used to deploy the Employee Management System (frontend, backend, database). Use this README when you want to deploy or inspect Kubernetes configuration for each environment.

Purpose

- Keep environment-agnostic base manifests in `base/`.
- Provide per-environment overrides in `overlays/{dev,stag,prod}`.
- Support GitOps (ArgoCD) or manual `kubectl apply -k` deployments.

Layout

- `base/` — core Deployments, Services, ConfigMap, Secret (example), RBAC, NetworkPolicies, DB PVC
- `overlays/` — environment folders (`dev`, `stag`, `prod`) each with `kustomization.yaml` and `patch-deployment.yaml`

Quick start (local)

Prerequisites: `kubectl` configured for your cluster and access to the target namespace.

Apply the dev overlay:

```bash
cd employee-manifest
kubectl apply -k overlays/dev
```

Check resources:

```bash
kubectl get all
kubectl get configmap,secret -o wide
```

Port-forward examples (dev overlay uses `dev-` namePrefix)

```bash
# Backend
kubectl port-forward svc/dev-backend-service 4000:4000

# Frontend
kubectl port-forward svc/dev-frontend-service 8080:8080

# Database
kubectl port-forward svc/dev-db 3306:3306
```

Config & Secrets

- `configmap.yaml` holds non-sensitive configuration values (DB name/host/port, frontend URL).
- `secret.yaml` in `base/` contains example base64-encoded credentials. Replace these with secure values or use an external secret manager in production.

Updating images (CI integration)

- The Jenkins pipeline in the app repo updates image tags in each overlay's `patch-deployment.yaml` using `yq` and pushes changes to the manifest repository branches for each environment. Ensure your CI has credentials to push to the manifest repo.

Best practices

- Do not commit production secrets in plaintext; use sealed secrets or a vault for production.
- Keep `base/` environment-agnostic; make environment-specific tweaks only in overlays.
- Use readiness/liveness probes and resource requests/limits as provided in `base/`.

Troubleshooting

- Pod crash or CrashLoopBackOff: `kubectl describe pod <pod>` and `kubectl logs <pod>`.
- Service not reachable: confirm Service selector labels match Pod labels and check NetworkPolicies.
- Image pull errors: confirm image exists in the registry and registry credentials (if private).

More information

- See the top-level `README.md` in the repository root for full developer and CI/CD instructions.

Last updated: November 2025
