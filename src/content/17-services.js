module.exports = {
    id: 'k8s-services',
    title: '17. Services',
    group: 'Kubernetes Core',
    keywords: ['service', 'clusterip', 'nodeport', 'loadbalancer', 'networking'],
    content: `
        <h1>Section 17: Services</h1>
        <p>Because Pods are mortal, they die and are reborn with <strong>new IP addresses</strong>. If your React Frontend Pods need to talk to your Node Backend Pods, they cannot rely on IP addresses. How do they find each other?</p>
        <p>The answer is a <strong>Service</strong>.</p>
        
        <h2>What is a Service?</h2>
        <p>A Service is a stable, permanent IP address and DNS name that routes traffic to a set of underlying Pods. It acts as an internal load balancer.</p>
        <p>If you have 3 API Pods, you create 1 API Service. The frontend sends traffic to the Service name (<code>http://api-service:3000</code>), and the Service forwards the request to one of the 3 healthy Pods.</p>

        <h2>Types of Services</h2>

        <div class="glass-panel">
            <h3>1. ClusterIP (Default)</h3>
            <p>Exposes the Service on an internal IP in the cluster. This makes the Service only reachable <strong>from within the cluster</strong>. This is perfect for Backends and Databases.</p>
        </div>

        <div class="glass-panel">
            <h3>2. NodePort</h3>
            <p>Exposes the Service on each Worker Node's IP at a static port (between 30000-32767). If you hit <code>NodeIP:30000</code>, you reach the service. Useful for quick debugging, but rarely used in production for routing public traffic.</p>
        </div>

        <div class="glass-panel">
            <h3>3. LoadBalancer</h3>
            <p>Exposes the Service externally using a cloud provider's load balancer (like AWS ALB or Google Cloud Load Balancer). The cloud provider provisions a real, public IP address that routes into your cluster. Essential for public-facing apps.</p>
        </div>

        <div class="glass-panel">
            <h3>4. ExternalName</h3>
            <p>Maps a Service to a DNS name. Useful if you want your Pods to talk to an external database hosted outside K8s (like AWS RDS), but you want to refer to it as an internal Service.</p>
        </div>

        <h2>Defining a ClusterIP Service</h2>

        <pre><code class="language-yaml"># api-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service    # This becomes the DNS name!
spec:
  type: ClusterIP
  selector:
    app: node-api      # Matches the labels on your Pods
  ports:
    - port: 80         # Port the Service listens on
      targetPort: 3000 # Port the Pod is listening on</code></pre>

        <p>K8s looks for all Pods with the label <code>app: node-api</code> and automatically adds their changing IP addresses to the <code>api-service</code> routing table.</p>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Label Mismatches:</strong>
                <div class="mistake-wrong">❌ Service selector says <code>app: backend</code>, but Pod labels say <code>app: node-api</code>.</div>
                <p>The Service will silently accept traffic and drop it, because it thinks there are 0 Pods available. <strong>Always ensure the Service selector exactly matches the Pod labels!</strong></p>
            </div>
            <div class="mistake-item">
                <strong>Using LoadBalancer for everything:</strong>
                <div class="mistake-wrong">❌ Exposing your Database to the internet via a LoadBalancer service.</div>
                <div class="mistake-right">✅ Databases should always use ClusterIP so they are completely hidden from the public internet.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">Which Service type is the default and only allows communication from INSIDE the Kubernetes cluster?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">NodePort</div>
                <div class="quiz-option" data-correct="true">ClusterIP</div>
                <div class="quiz-option" data-correct="false">LoadBalancer</div>
            </div>
        </div>
    `
};
