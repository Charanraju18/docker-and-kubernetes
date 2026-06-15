module.exports = {
    id: 'k8s-ingress',
    title: '18. Ingress',
    group: 'Kubernetes Core',
    keywords: ['ingress', 'routing', 'nginx', 'ssl', 'domain'],
    content: `
        <h1>Section 18: Ingress</h1>
        <p>A <code>LoadBalancer</code> service is great, but if you have 10 different web applications in your cluster, creating 10 <code>LoadBalancer</code> services means your cloud provider will bill you for 10 expensive Cloud Load Balancers.</p>
        <p><strong>Ingress</strong> is the smart way to route external HTTP/HTTPS traffic into your cluster.</p>
        
        <h2>What is Ingress?</h2>
        <p>Ingress is an API object that manages external access to the services in a cluster, typically HTTP. Ingress can provide load balancing, SSL termination, and name-based virtual hosting.</p>

        <div class="arch-diagram">
            <div class="arch-node">Internet (Users)</div>
            <div class="arch-arrow">↓ <code>https://myapp.com</code> ↓</div>
            <div class="arch-node" style="border-color: var(--accent-primary)">Ingress Controller<br><small>(e.g., Nginx running in K8s)</small></div>
            <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 20px;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div class="arch-arrow">↓ Path: <code>/</code> ↓</div>
                    <div class="arch-node" style="border-color: var(--success)">Frontend Service<br><small>(ClusterIP)</small></div>
                    <div class="arch-arrow">↓</div>
                    <div style="background: var(--bg-tertiary); padding: 5px 15px; border-radius: 4px;">React Pods</div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div class="arch-arrow">↓ Path: <code>/api</code> ↓</div>
                    <div class="arch-node" style="border-color: var(--success)">Backend Service<br><small>(ClusterIP)</small></div>
                    <div class="arch-arrow">↓</div>
                    <div style="background: var(--bg-tertiary); padding: 5px 15px; border-radius: 4px;">Node Pods</div>
                </div>
            </div>
        </div>

        <h2>Ingress Controller vs Ingress Resource</h2>
        <ul>
            <li><strong>Ingress Controller:</strong> The actual software (like Nginx, Traefik, or HAProxy) that does the routing. You must install a controller in your cluster; K8s doesn't come with one by default.</li>
            <li><strong>Ingress Resource:</strong> The YAML file where you define your routing rules.</li>
        </ul>

        <h2>Defining an Ingress Resource</h2>

        <pre><code class="language-yaml"># my-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.com
    http:
      paths:
      # Route /api to the backend service
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-api-service
            port: 
              number: 80
      # Route everything else to the frontend service
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port: 
              number: 80</code></pre>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Forgetting to install an Ingress Controller:</strong>
                <div class="mistake-wrong">❌ "I applied my Ingress YAML but nothing is happening when I visit the IP!"</div>
                <div class="mistake-right">✅ You must install a controller (like ingress-nginx) first. The Ingress YAML is just a configuration file; without the controller, no software is actually listening for traffic.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What is the primary benefit of using an Ingress over multiple LoadBalancer services?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Ingress is more secure than a LoadBalancer.</div>
                <div class="quiz-option" data-correct="true">Ingress provides advanced path/domain-based routing and consolidates traffic through a single cloud load balancer, saving costs.</div>
                <div class="quiz-option" data-correct="false">Ingress automatically provisions a database.</div>
            </div>
        </div>
    `
};
