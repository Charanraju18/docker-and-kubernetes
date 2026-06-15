module.exports = {
    id: 'k8s-security',
    title: '24. Kubernetes Security',
    group: 'Production & Operations',
    keywords: ['security', 'rbac', 'network policies', 'admission controllers', 'pss'],
    content: `
        <h1>Section 24: Kubernetes Security</h1>
        <p>A default Kubernetes cluster is designed for ease of use, not maximum security. Moving to production requires locking it down at multiple layers.</p>
        
        <h2>1. Role-Based Access Control (RBAC)</h2>
        <p>RBAC dictates <strong>who</strong> can do <strong>what</strong> in the cluster. It prevents junior developers from accidentally deleting the production database.</p>

        <ul>
            <li><strong>Role:</strong> Defines permissions within a specific namespace. (e.g., "Can read Pods in the 'dev' namespace").</li>
            <li><strong>ClusterRole:</strong> Defines cluster-wide permissions. (e.g., "Can create Worker Nodes").</li>
            <li><strong>RoleBinding:</strong> Attaches a Role to a User, Group, or ServiceAccount.</li>
        </ul>

        <h2>2. Pod Security Standards (PSS)</h2>
        <p>If a hacker breaks into your Node.js container, can they escape the container and take over the underlying Worker Node? Yes, if you run the container as <code>root</code> with excessive privileges.</p>
        <p>PSS defines policies like:</p>
        <ul>
            <li>Containers must not run as the root user.</li>
            <li>Containers cannot mount sensitive host file systems.</li>
            <li>Containers cannot share the host network namespace.</li>
        </ul>

        <h2>3. Admission Controllers</h2>
        <p>Admission Controllers are K8s' ultimate gatekeepers. When you type <code>kubectl apply -f bad-pod.yaml</code>, the request hits the API Server. Before the API Server saves it to etcd, the Admission Controller intercepts it.</p>
        <p>If the Admission Controller sees the YAML requests <code>runAsRoot: true</code>, it <strong>rejects the deployment entirely</strong>.</p>
        <p>Tools like OPA Gatekeeper or Kyverno are popular third-party admission controllers.</p>

        <div class="arch-diagram">
            <div class="arch-node">Developer (kubectl)</div>
            <div class="arch-arrow">↓ Apply YAML ↓</div>
            <div class="arch-node" style="border-color: var(--accent-primary)">API Server (Authentication / RBAC)</div>
            <div class="arch-arrow">↓ If Authorized ↓</div>
            <div class="arch-node" style="border-color: var(--warning)">Admission Controller (Kyverno/OPA)</div>
            <div class="arch-arrow">↓ If Validated ↓</div>
            <div class="arch-node" style="border-color: var(--success)">etcd (Saved!)</div>
        </div>

        <h2>4. Network Security</h2>
        <p>As covered in Section 21, use NetworkPolicies to enforce a "Default Deny" network architecture, only explicitly allowing required communication paths.</p>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Sharing cluster-admin credentials:</strong>
                <div class="mistake-wrong">❌ Giving every developer the root <code>kubeconfig</code> file.</div>
                <div class="mistake-right">✅ Integrate K8s with your company's SSO (Okta/Google Workspace). Assign developers RoleBindings restricted strictly to their team's namespaces.</div>
            </div>
            <div class="mistake-item">
                <strong>Using vulnerable images:</strong>
                <div class="mistake-wrong">❌ Deploying <code>node:latest</code> directly from Docker Hub without scanning it.</div>
                <div class="mistake-right">✅ Implement a container scanning tool (like Trivy) in your CI/CD pipeline to block images with known CVEs (Common Vulnerabilities and Exposures) from ever reaching Kubernetes.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">Which Kubernetes component intercepts a request to create a Pod and can reject it if it violates security policies (like running as root)?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">NetworkPolicy</div>
                <div class="quiz-option" data-correct="true">Admission Controller</div>
                <div class="quiz-option" data-correct="false">Kube-Proxy</div>
            </div>
        </div>
    `
};
