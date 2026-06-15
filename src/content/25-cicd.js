module.exports = {
    id: 'k8s-cicd',
    title: '25. CI/CD for Kubernetes (GitOps)',
    group: 'Production & Operations',
    keywords: ['ci/cd', 'gitops', 'argocd', 'fluxcd', 'github actions', 'pipeline'],
    content: `
        <h1>Section 25: CI/CD for Kubernetes</h1>
        <p>In the old days, developers merged code, and a DevOps engineer manually SSH'd into a server to pull the code and restart the app. Today, we automate this entirely. The modern standard for K8s deployments is <strong>GitOps</strong>.</p>
        
        <h2>Continuous Integration (CI)</h2>
        <p>The CI phase happens when a developer pushes code to GitHub.</p>
        <ol>
            <li><strong>Build:</strong> GitHub Actions runs <code>npm run build</code> and unit tests.</li>
            <li><strong>Dockerize:</strong> If tests pass, GitHub Actions runs <code>docker build</code> to create a new Image (e.g., tagged <code>v1.2.3</code>).</li>
            <li><strong>Scan:</strong> A tool like Trivy scans the image for vulnerabilities.</li>
            <li><strong>Push:</strong> The Image is pushed to a Registry (like Docker Hub or AWS ECR).</li>
        </ol>

        <h2>Traditional CD vs GitOps</h2>
        <p><strong>Traditional CD (Push):</strong> The CI pipeline finishes by running <code>kubectl set image ...</code> from GitHub Actions to your K8s cluster. This is bad because GitHub needs admin access to your cluster firewall.</p>
        
        <p><strong>GitOps (Pull):</strong> You have a second Git repository just for Kubernetes YAML files. When the CI pipeline finishes, it updates the YAML in that repo to say "Use image v1.2.3". A tool running <em>inside</em> your cluster constantly watches that Git repo and pulls the changes.</p>

        <div class="arch-diagram">
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <div class="arch-node">1. App Repo<br><small>Code pushed</small></div>
                <div class="arch-arrow">→</div>
                <div class="arch-node">2. GitHub Actions<br><small>Builds & Pushes Image</small></div>
                <div class="arch-arrow">→</div>
                <div class="arch-node" style="border-color: var(--accent-primary)">3. Config Repo<br><small>YAML updated to v1.2.3</small></div>
            </div>
            
            <div style="height: 40px; border-left: 2px dashed var(--text-secondary); margin: 10px 0 10px 80%;"></div>
            
            <div style="display: flex; justify-content: flex-end; width: 100%;">
                <div class="arch-node" style="border-color: var(--success); width: 400px;">
                    <h4>Kubernetes Cluster</h4>
                    <div class="arch-node" style="margin: 10px auto; width: 80%; border-color: var(--warning);">ArgoCD / FluxCD<br><small>(Watches Config Repo & Applies changes)</small></div>
                </div>
            </div>
        </div>

        <h2>ArgoCD & FluxCD</h2>
        <p>ArgoCD and FluxCD are the two leading GitOps controllers. They sit inside your cluster, constantly comparing the live state of the cluster to the YAML files in your Git repository.</p>
        <ul>
            <li>If someone manually uses <code>kubectl</code> to edit a deployment, ArgoCD instantly overwrites their change, forcing the cluster to match Git. <strong>Git is the absolute source of truth.</strong></li>
            <li>If you need to rollback, you just <code>git revert</code> the commit in your config repo. ArgoCD sees the change and rolls the cluster back automatically.</li>
        </ul>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Manual kubectl edits in production:</strong>
                <div class="mistake-wrong">❌ SSHing in to run <code>kubectl edit deployment</code> to fix a bug quickly.</div>
                <div class="mistake-right">✅ Making the change in the Git repository and letting ArgoCD sync it. Manual edits cause "Configuration Drift", where the cluster state no longer matches your source code, leading to terrifying mysteries during the next deployment.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">In a GitOps workflow, how do new changes reach the Kubernetes cluster?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">The CI server (like Jenkins) uses admin credentials to push the changes to K8s.</div>
                <div class="quiz-option" data-correct="true">A controller inside the cluster (like ArgoCD) monitors a Git repo and pulls the changes in.</div>
                <div class="quiz-option" data-correct="false">Developers manually run kubectl apply from their laptops.</div>
            </div>
        </div>
    `
};
