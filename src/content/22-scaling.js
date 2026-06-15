module.exports = {
    id: 'k8s-scaling',
    title: '22. Kubernetes Scaling',
    group: 'Kubernetes Core',
    keywords: ['scaling', 'hpa', 'vpa', 'cluster autoscaler', 'metrics'],
    content: `
        <h1>Section 22: Kubernetes Scaling</h1>
        <p>The main reason companies adopt Kubernetes is its ability to handle sudden surges in traffic automatically. K8s provides three distinct layers of autoscaling.</p>
        
        <h2>1. Horizontal Pod Autoscaler (HPA)</h2>
        <p>This is the most common type of scaling. The HPA monitors the CPU or RAM usage of your Pods. If the average CPU usage exceeds a target threshold (e.g., 70%), the HPA tells the Deployment to increase the number of replicas.</p>

        <div class="arch-diagram">
            <div class="arch-node">Sudden Traffic Spike</div>
            <div class="arch-arrow">↓ CPU hits 90% ↓</div>
            <div class="arch-node" style="border-color: var(--accent-primary)">HPA notices CPU > Target (70%)</div>
            <div class="arch-arrow">↓ Triggers Deployment Scale-out ↓</div>
            <div style="display: flex; gap: 10px;">
                <div class="arch-node" style="padding: 10px; font-size: 0.8rem;">Pod 1</div>
                <div class="arch-node" style="padding: 10px; font-size: 0.8rem; border-color: var(--success);">Pod 2 (New)</div>
                <div class="arch-node" style="padding: 10px; font-size: 0.8rem; border-color: var(--success);">Pod 3 (New)</div>
            </div>
        </div>

        <pre><code class="language-yaml"># Example HPA Definition
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: node-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: node-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70</code></pre>

        <h2>2. Vertical Pod Autoscaler (VPA)</h2>
        <p>Instead of adding <em>more</em> Pods (Horizontal), the VPA assigns <em>more resources</em> (CPU/RAM) to existing Pods (Vertical). If your database pod is running out of memory, the VPA will restart the pod with a higher memory limit. (Note: You generally cannot use HPA and VPA on the same metrics simultaneously).</p>

        <h2>3. Cluster Autoscaler</h2>
        <p>What happens if the HPA requests 50 new Pods, but your Worker Nodes are completely full and have no CPU left?</p>
        <p>The Pods will be stuck in a <code>Pending</code> state. The <strong>Cluster Autoscaler</strong> monitors for Pending pods. When it sees them, it talks to your Cloud Provider's API (e.g., AWS EC2, Google Compute Engine) and automatically boots up a brand new physical/virtual Worker Node and adds it to the cluster!</p>

        <div class="glass-panel">
            <h3>💡 The Perfect Scaling Storm</h3>
            <p><strong>Traffic Spike:</strong> HPA adds Pods → Nodes get full → Pods go Pending → Cluster Autoscaler adds a new Node → Pods get scheduled on the new Node.</p>
            <p><strong>Traffic Drops:</strong> HPA removes Pods → Node becomes empty → Cluster Autoscaler deletes the Node to save money.</p>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Forgetting Resource Requests/Limits:</strong>
                <div class="mistake-wrong">❌ Creating an HPA without setting CPU <code>requests</code> in the Deployment YAML.</div>
                <div class="mistake-right">✅ You MUST define Resource Requests. The HPA calculates the percentage (70%) based on the requested CPU. If K8s doesn't know how much CPU you requested, the math fails, and the HPA will not work.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">Which autoscaler is responsible for communicating with AWS/GCP to add brand new virtual machines to your cluster?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Horizontal Pod Autoscaler (HPA)</div>
                <div class="quiz-option" data-correct="false">Vertical Pod Autoscaler (VPA)</div>
                <div class="quiz-option" data-correct="true">Cluster Autoscaler</div>
            </div>
        </div>
    `
};
