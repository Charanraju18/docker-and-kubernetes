module.exports = {
    id: 'roadmaps',
    title: '34. Learning Roadmaps & Tools (2026)',
    group: 'Final Deliverables',
    keywords: ['roadmap', 'devops', 'cloud native', 'tools', 'open source'],
    content: `
        <h1>Section 34: Learning Roadmaps & Modern Tools</h1>
        <p>You have finished the core course, but the Cloud Native ecosystem is vast. Here is your structured path forward.</p>
        
        <h2>1. The Kubernetes Mastery Roadmap</h2>
        <ol>
            <li><strong>Core Concepts (Completed):</strong> Pods, Deployments, Services, ConfigMaps.</li>
            <li><strong>Storage & State:</strong> Deep dive into StatefulSets, PVs, PVCs, and CSI drivers.</li>
            <li><strong>Security:</strong> RBAC, Network Policies, OIDC Authentication.</li>
            <li><strong>Observability:</strong> Deploy the Prometheus/Grafana/Loki stack via Helm.</li>
            <li><strong>GitOps:</strong> Set up ArgoCD to manage your cluster declaratively.</li>
            <li><strong>Service Mesh:</strong> Learn Istio or Linkerd for advanced mTLS, tracing, and traffic routing (A/B testing, Canary releases).</li>
        </ol>

        <h2>2. The DevOps Engineer Roadmap</h2>
        <ol>
            <li><strong>OS & Linux:</strong> Master Bash scripting, Linux networking, permissions, and systemd.</li>
            <li><strong>Networking:</strong> Understand DNS, OSI Model, TCP/IP, Load Balancing, and Firewalls.</li>
            <li><strong>Infrastructure as Code (IaC):</strong> Learn <strong>Terraform</strong>. Do not click around the AWS UI. Define your VPCs, EC2s, and EKS clusters in code.</li>
            <li><strong>CI/CD:</strong> Master GitHub Actions, GitLab CI, or Jenkins pipelines.</li>
            <li><strong>Containers & K8s (Completed):</strong> Docker, Docker Compose, Kubernetes.</li>
            <li><strong>Cloud Provider:</strong> Pick one (AWS, GCP, Azure) and master their core networking, IAM, and managed services.</li>
        </ol>

        <h2>3. Best Tools & Stack in 2026</h2>
        <div class="glass-panel">
            <ul>
                <li><strong>Local K8s Testing:</strong> <code>k3d</code> or <code>kind</code> (Kubernetes in Docker). Much faster than Minikube.</li>
                <li><strong>Terminal UI for K8s:</strong> <code>k9s</code>. A massive productivity booster over typing kubectl constantly.</li>
                <li><strong>Infrastructure as Code:</strong> <code>Terraform</code> or <code>Pulumi</code>.</li>
                <li><strong>Secrets Management:</strong> <code>External Secrets Operator</code> (syncs AWS/GCP secrets directly into K8s) or <code>SOPS</code>.</li>
                <li><strong>Ingress:</strong> <code>Gateway API</code> (the modern replacement for the traditional Ingress object) using <code>Envoy</code> or <code>Cilium</code>.</li>
                <li><strong>Networking / CNI:</strong> <code>Cilium</code> (eBPF-based networking, replacing older iptables-based routing).</li>
                <li><strong>GitOps:</strong> <code>ArgoCD</code> or <code>Flux</code>.</li>
            </ul>
        </div>

        <h2>4. Production Deployment Checklist</h2>
        <div class="mistakes-block" style="border-left-color: var(--accent-primary); background: rgba(59, 130, 246, 0.1);">
            <h3 style="color: var(--accent-primary);">Before you go live:</h3>
            <ul style="color: var(--text-primary);">
                <li><input type="checkbox" disabled> Are CPU/RAM requests and limits set on ALL containers?</li>
                <li><input type="checkbox" disabled> Are Liveness and Readiness probes configured and accurate?</li>
                <li><input type="checkbox" disabled> Are containers running as a non-root user?</li>
                <li><input type="checkbox" disabled> Are all images pinned to a specific SHA or version tag (no 'latest')?</li>
                <li><input type="checkbox" disabled> Is the database outside the cluster, or strictly managed via StatefulSets + PVCs with backups enabled?</li>
                <li><input type="checkbox" disabled> Are secrets managed securely (e.g., via Vault) and NOT in git?</li>
                <li><input type="checkbox" disabled> Is the cluster configured to autoscale (HPA and Cluster Autoscaler)?</li>
                <li><input type="checkbox" disabled> Do you have metrics (Prometheus) and log aggregation (Loki/Elastic) set up?</li>
            </ul>
        </div>
    `
};
