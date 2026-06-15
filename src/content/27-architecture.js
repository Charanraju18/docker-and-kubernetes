module.exports = {
    id: 'prod-architecture',
    title: '27. Production Architecture',
    group: 'Production & Operations',
    keywords: ['architecture', 'design', 'react', 'node', 'redis', 'postgres', 'cloudflare'],
    content: `
        <h1>Section 27: Production Architecture</h1>
        <p>Now that we know the individual components, let's look at the complete mental model of a modern, production-grade cloud-native architecture.</p>
        
        <h2>The Full Stack Overview</h2>
        <p>We are deploying a SaaS application with a React frontend, a Node.js API backend, Redis for caching/sessions, and PostgreSQL as the main database.</p>

        <div class="arch-diagram" style="max-width: 1000px; padding: 2rem 1rem;">
            <!-- External Layer -->
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <div class="arch-node" style="border-color: #f38020; width: 80%;">
                    <h3>1. Cloudflare / CDN</h3>
                    <small>DDoS Protection, Web Application Firewall (WAF), Edge Caching</small>
                </div>
                <div class="arch-arrow">↓ Public Internet ↓</div>
                
                <div class="arch-node" style="border-color: #3b82f6; width: 60%;">
                    <h3>2. Cloud Load Balancer (AWS ALB / GCP HTTPS LB)</h3>
                    <small>Provisioned by K8s Service type: LoadBalancer</small>
                </div>
                <div class="arch-arrow">↓ Enters Kubernetes Cluster ↓</div>
            </div>

            <!-- K8s Cluster Layer -->
            <div style="border: 2px dashed var(--accent-primary); border-radius: 12px; padding: 30px 15px; width: 100%; position: relative;">
                <span style="position: absolute; top: -15px; left: 30px; background: var(--bg-secondary); padding: 0 10px; font-weight: bold; color: var(--accent-primary);">Kubernetes Cluster</span>
                
                <!-- Ingress -->
                <div style="display: flex; flex-direction: column; align-items: center; width: 100%; margin-bottom: 30px;">
                    <div class="arch-node" style="border-color: var(--warning); width: 50%;">
                        <h3>3. Ingress Controller (Nginx)</h3>
                        <small>Handles SSL Termination and Path Routing</small>
                    </div>
                </div>

                <!-- Services Row -->
                <div style="display: flex; justify-content: space-around; width: 100%; margin-bottom: 20px;">
                    <div style="display: flex; flex-direction: column; align-items: center; width: 45%;">
                        <div class="arch-arrow" style="margin-top: 0;">↙ Path: <code>/</code></div>
                        <div class="arch-node" style="border-color: var(--success); width: 100%;">
                            <h4>Frontend Service</h4>
                            <small>ClusterIP</small>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; width: 45%;">
                        <div class="arch-arrow" style="margin-top: 0;">↘ Path: <code>/api</code></div>
                        <div class="arch-node" style="border-color: var(--success); width: 100%;">
                            <h4>Backend Service</h4>
                            <small>ClusterIP</small>
                        </div>
                    </div>
                </div>

                <!-- Pods Row -->
                <div style="display: flex; justify-content: space-around; width: 100%; margin-bottom: 40px;">
                    <div style="border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; width: 45%; text-align: center; background: rgba(0,0,0,0.1);">
                        <strong>React Pods (Nginx)</strong><br>
                        <small>Managed by Deployment (HPA: 2-10 replicas)</small>
                    </div>
                    <div style="border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; width: 45%; text-align: center; background: rgba(0,0,0,0.1);">
                        <strong>Node.js API Pods</strong><br>
                        <small>Managed by Deployment (HPA: 3-15 replicas)</small>
                    </div>
                </div>

                <!-- Database Layer -->
                <div style="display: flex; justify-content: space-around; width: 100%;">
                    <div style="display: flex; flex-direction: column; align-items: center; width: 45%;">
                        <div class="arch-arrow">↓ Cache ↓</div>
                        <div class="arch-node" style="border-color: #ef4444; width: 100%;">
                            <h4>Redis (StatefulSet)</h4>
                            <small>Session Storage / Caching</small>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; width: 45%;">
                        <div class="arch-arrow">↓ Persistent Data ↓</div>
                        <div class="arch-node" style="border-color: #3b82f6; width: 100%;">
                            <h4>PostgreSQL (StatefulSet)</h4>
                            <small>Primary Database with PVC attached</small>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <h2>Component Breakdown</h2>
        <ol>
            <li><strong>Cloudflare:</strong> Stops bad actors before they even reach your cloud provider. Highly recommended.</li>
            <li><strong>Cloud Load Balancer:</strong> Provides the single public IP address. It spreads traffic across the nodes in your K8s cluster that run the Ingress Controller.</li>
            <li><strong>Ingress Controller:</strong> Decrypts HTTPS traffic. It looks at the URL. If it starts with <code>/api</code>, it sends it to the Backend Service. Otherwise, it sends it to the Frontend Service.</li>
            <li><strong>Services:</strong> Keep track of the constantly changing IP addresses of the Pods. They load balance internally.</li>
            <li><strong>Pods:</strong> Managed by Deployments. The Horizontal Pod Autoscaler (HPA) monitors CPU and automatically adds more Node/React pods if traffic surges.</li>
            <li><strong>Databases:</strong> Managed by StatefulSets, not Deployments, ensuring they have stable network IDs and persistent storage (PVCs). <em>(Note: Many companies choose to use managed databases like AWS RDS instead of running databases inside K8s to reduce operational overhead).</em></li>
        </ol>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Frontend API Calls:</strong>
                <div class="mistake-wrong">❌ React code fetching from <code>http://backend-service:3000/api/users</code>.</div>
                <div class="mistake-right">✅ React code fetching from <code>/api/users</code> (relative path).</div>
                <p>Remember, the React code executes in the User's Browser (outside the cluster). The browser cannot resolve internal K8s DNS (<code>backend-service</code>). By using a relative path, the browser sends the request to the main domain (e.g., <code>https://myapp.com/api/users</code>), hits K8s Ingress, and the Ingress routes it internally to the backend!</p>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">In this architecture, which component makes the decision to route '/api/users' to the Node.js pods, and '/index.html' to the React pods?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">The Cloud Load Balancer</div>
                <div class="quiz-option" data-correct="true">The Ingress Controller</div>
                <div class="quiz-option" data-correct="false">The Frontend Service</div>
            </div>
        </div>
    `
};
