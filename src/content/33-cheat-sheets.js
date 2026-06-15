module.exports = {
    id: 'cheat-sheets',
    title: '33. Cheat Sheets',
    group: 'Final Deliverables',
    keywords: ['cheat sheet', 'docker', 'kubectl', 'yaml', 'helm', 'docker-compose'],
    content: `
        <h1>Section 33: Ultimate Cheat Sheets</h1>
        <p>Bookmark this page. These are the essential commands you will use daily.</p>
        
        <h2>1. Docker CLI Cheat Sheet</h2>
        <div class="glass-panel">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <tr style="border-bottom: 1px solid var(--border-color);"><th>Command</th><th>Description</th></tr>
                <tr><td style="padding: 10px;"><code>docker build -t app:v1 .</code></td><td>Build image from Dockerfile in current dir.</td></tr>
                <tr><td style="padding: 10px;"><code>docker run -d -p 80:80 nginx</code></td><td>Run container in background, map port 80.</td></tr>
                <tr><td style="padding: 10px;"><code>docker ps -a</code></td><td>List all containers (running and stopped).</td></tr>
                <tr><td style="padding: 10px;"><code>docker stop &lt;id&gt;</code></td><td>Gracefully stop a container.</td></tr>
                <tr><td style="padding: 10px;"><code>docker rm -f &lt;id&gt;</code></td><td>Force delete a container.</td></tr>
                <tr><td style="padding: 10px;"><code>docker logs -f &lt;id&gt;</code></td><td>Tail/stream the logs of a container.</td></tr>
                <tr><td style="padding: 10px;"><code>docker exec -it &lt;id&gt; sh</code></td><td>Open an interactive shell inside a container.</td></tr>
                <tr><td style="padding: 10px;"><code>docker system prune -a</code></td><td>Delete all unused images, containers, and networks.</td></tr>
            </table>
        </div>

        <h2>2. Docker Compose Cheat Sheet</h2>
        <div class="glass-panel">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <tr style="border-bottom: 1px solid var(--border-color);"><th>Command</th><th>Description</th></tr>
                <tr><td style="padding: 10px;"><code>docker-compose up -d</code></td><td>Start all services in the background.</td></tr>
                <tr><td style="padding: 10px;"><code>docker-compose up -d --build</code></td><td>Rebuild images and start.</td></tr>
                <tr><td style="padding: 10px;"><code>docker-compose down -v</code></td><td>Stop services, remove containers, networks, and volumes.</td></tr>
                <tr><td style="padding: 10px;"><code>docker-compose logs -f</code></td><td>Tail logs for all services combined.</td></tr>
            </table>
        </div>

        <h2>3. kubectl Cheat Sheet</h2>
        <div class="glass-panel">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <tr style="border-bottom: 1px solid var(--border-color);"><th>Command</th><th>Description</th></tr>
                <tr><td style="padding: 10px;"><code>kubectl apply -f app.yaml</code></td><td>Create/Update resources defined in the YAML file.</td></tr>
                <tr><td style="padding: 10px;"><code>kubectl get pods -A</code></td><td>List all pods in all namespaces.</td></tr>
                <tr><td style="padding: 10px;"><code>kubectl describe pod &lt;name&gt;</code></td><td>Show detailed info and event logs for a pod.</td></tr>
                <tr><td style="padding: 10px;"><code>kubectl logs -f &lt;pod&gt;</code></td><td>Stream logs from a pod.</td></tr>
                <tr><td style="padding: 10px;"><code>kubectl port-forward svc/api 3000:80</code></td><td>Temporarily route local port 3000 to the K8s service port 80.</td></tr>
                <tr><td style="padding: 10px;"><code>kubectl get events --sort-by=.metadata.creationTimestamp</code></td><td>List recent cluster events (great for debugging).</td></tr>
                <tr><td style="padding: 10px;"><code>kubectl rollout restart deployment/api</code></td><td>Trigger a zero-downtime restart of all pods in a deployment.</td></tr>
            </table>
        </div>

        <h2>4. Helm Cheat Sheet</h2>
        <div class="glass-panel">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <tr style="border-bottom: 1px solid var(--border-color);"><th>Command</th><th>Description</th></tr>
                <tr><td style="padding: 10px;"><code>helm search repo nginx</code></td><td>Search your added repos for a chart.</td></tr>
                <tr><td style="padding: 10px;"><code>helm install my-release bitnami/nginx</code></td><td>Install a chart into the cluster.</td></tr>
                <tr><td style="padding: 10px;"><code>helm upgrade my-release bitnami/nginx -f values.yaml</code></td><td>Upgrade a release with new config.</td></tr>
                <tr><td style="padding: 10px;"><code>helm list -A</code></td><td>List all helm releases in all namespaces.</td></tr>
                <tr><td style="padding: 10px;"><code>helm uninstall my-release</code></td><td>Delete the release and all associated K8s resources.</td></tr>
            </table>
        </div>

        <h2>5. K8s YAML Skeleton Cheat Sheet</h2>
        <div class="glass-panel">
            <pre><code class="language-yaml"># Almost EVERY Kubernetes YAML file has these 4 root keys:
apiVersion: apps/v1  # 1. Which API to use
kind: Deployment     # 2. What object to create
metadata:            # 3. Data that helps uniquely identify the object
  name: my-app
  labels:
    tier: frontend
spec:                # 4. The desired state of the object
  replicas: 3
  ...</code></pre>
        </div>
    `
};
