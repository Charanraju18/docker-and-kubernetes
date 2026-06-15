module.exports = {
    id: 'multi-environments',
    title: '28. Multi-Environment Deployments',
    group: 'Production & Operations',
    keywords: ['environments', 'development', 'staging', 'production', 'namespaces', 'clusters'],
    content: `
        <h1>Section 28: Multi-Environment Deployments</h1>
        <p>A professional software team never pushes code directly to production. You need distinct environments to test code safely. How do we model Development, Staging, and Production in Kubernetes?</p>
        
        <h2>Strategy 1: Namespace Isolation (Single Cluster)</h2>
        <p>You can run all environments inside a single Kubernetes cluster and separate them using <strong>Namespaces</strong>.</p>

        <div class="arch-diagram" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 20px;">
            <div style="border: 2px dashed var(--accent-primary); padding: 20px; border-radius: 8px; width: 250px; text-align: center;">
                <h3 style="color: var(--accent-primary);">Namespace: dev</h3>
                <small><code>dev.myapp.com</code></small><br><br>
                <div class="arch-node" style="padding: 10px; margin-bottom: 5px;">React (v2.1-beta)</div>
                <div class="arch-node" style="padding: 10px; margin-bottom: 5px;">Node (v2.1-beta)</div>
                <div class="arch-node" style="padding: 10px; border-color: var(--danger);">Small DB (1GB)</div>
            </div>
            
            <div style="border: 2px dashed var(--warning); padding: 20px; border-radius: 8px; width: 250px; text-align: center;">
                <h3 style="color: var(--warning);">Namespace: staging</h3>
                <small><code>staging.myapp.com</code></small><br><br>
                <div class="arch-node" style="padding: 10px; margin-bottom: 5px;">React (v2.0-rc1)</div>
                <div class="arch-node" style="padding: 10px; margin-bottom: 5px;">Node (v2.0-rc1)</div>
                <div class="arch-node" style="padding: 10px; border-color: var(--danger);">Copy of Prod DB</div>
            </div>
            
            <div style="border: 2px dashed var(--success); padding: 20px; border-radius: 8px; width: 250px; text-align: center;">
                <h3 style="color: var(--success);">Namespace: prod</h3>
                <small><code>www.myapp.com</code></small><br><br>
                <div class="arch-node" style="padding: 10px; margin-bottom: 5px;">React (v1.9)</div>
                <div class="arch-node" style="padding: 10px; margin-bottom: 5px;">Node (v1.9)</div>
                <div class="arch-node" style="padding: 10px; border-color: var(--danger);">Prod DB (HA)</div>
            </div>
        </div>

        <p><strong>Pros:</strong> Very cheap. Maximizes resource usage because idle dev pods use almost no CPU, leaving it for prod.<br>
        <strong>Cons:</strong> A developer making a mistake in <code>dev</code> (like a CPU leak) could crash the physical Worker Node, taking down <code>prod</code> Pods running on the same node. Security boundaries are weaker.</p>

        <h2>Strategy 2: Cluster Isolation (Multi-Cluster)</h2>
        <p>Create entirely separate Kubernetes clusters for different environments.</p>
        <ul>
            <li><strong>Cluster A:</strong> Non-Prod (Dev, QA, Staging)</li>
            <li><strong>Cluster B:</strong> Production</li>
        </ul>

        <p><strong>Pros:</strong> Absolute physical and network isolation. Zero chance of dev code taking down prod. Strict IAM access (devs don't even have credentials for the prod cluster).<br>
        <strong>Cons:</strong> Expensive. You are paying for the Master Node control plane multiple times, and leaving idle compute capacity in the non-prod cluster.</p>
        
        <div class="glass-panel">
            <h3>💡 The Industry Standard</h3>
            <p>Most mid-to-large companies use <strong>Strategy 2</strong>. The security and stability guarantees of keeping Production in its own isolated cluster far outweigh the infrastructure costs.</p>
        </div>

        <h2>Managing Configurations (Kustomize or Helm)</h2>
        <p>If you have multiple environments, your YAML files will look 90% identical, but with different database passwords, replica counts, and image tags. Do not copy/paste YAML!</p>
        <p>Use <strong>Kustomize</strong> (built into kubectl) or <strong>Helm</strong>. You maintain a single "Base" YAML, and create "Overlays" or "Values" for each environment.</p>

        <pre><code class="language-plaintext">k8s/
├── base/
│   ├── deployment.yaml   # Contains the core structure
│   └── service.yaml
├── overlays/
│   ├── dev/
│   │   ├── kustomization.yaml # Overrides replicas to 1
│   │   └── patch.yaml
│   └── prod/
│       ├── kustomization.yaml # Overrides replicas to 10
│       └── secret.yaml        # Adds production secrets</code></pre>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Testing against the wrong environment:</strong>
                <div class="mistake-wrong">❌ Running <code>kubectl delete db</code> thinking you were logged into the Dev cluster, but your kubeconfig was still set to Prod.</div>
                <div class="mistake-right">✅ Use tools like <code>kubectx</code> and strictly color-code your terminal prompts so you always know which cluster you are interacting with.</div>
            </div>
        </div>
    `
};
