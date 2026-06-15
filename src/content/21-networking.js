module.exports = {
    id: 'k8s-networking',
    title: '21. Kubernetes Networking',
    group: 'Kubernetes Core',
    keywords: ['networking', 'cni', 'network policy', 'dns', 'coreDNS'],
    content: `
        <h1>Section 21: Kubernetes Networking</h1>
        <p>Kubernetes networking is often considered the most complex part of the system. Let's simplify the core rules K8s enforces.</p>
        
        <h2>The Three Rules of K8s Networking</h2>
        <p>Kubernetes mandates that any network plugin (CNI - Container Network Interface) must satisfy these fundamental rules:</p>
        <ol>
            <li><strong>All Pods can communicate with all other Pods without NAT.</strong> (Even if they are on different Worker Nodes).</li>
            <li><strong>All Nodes can communicate with all Pods without NAT.</strong></li>
            <li><strong>A Pod's IP address is exactly the same from its own perspective as it is from any other Pod's perspective.</strong></li>
        </ol>

        <p>This creates a massive, flat, cluster-wide network. You don't have to worry about port mapping conflicts like you do in Docker (e.g., mapping port 8080:80). Every Pod gets its own IP address, so two Pods on the same node can both listen on port 80 without clashing.</p>

        <h2>CoreDNS: The Phonebook</h2>
        <p>Kubernetes comes with a built-in DNS server called <strong>CoreDNS</strong>. When you create a Service named <code>backend-api</code>, CoreDNS adds a record for it.</p>
        <p>When a Frontend Pod makes an HTTP request to <code>http://backend-api</code>, the request goes to CoreDNS, which resolves it to the Service's ClusterIP, which then routes it to a healthy Backend Pod.</p>

        <div class="arch-diagram" style="flex-direction: row; justify-content: space-around; gap: 20px;">
            <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
                <h4>FQDN (Fully Qualified Domain Name)</h4>
                <p>The full internal DNS name for a service looks like this:</p>
                <code style="display:block; padding:10px; background:var(--bg-tertiary);">service-name.namespace.svc.cluster.local</code>
                <p style="font-size: 0.9rem; margin-top: 10px;">If Pods are in the <em>same namespace</em>, they can just use <code>service-name</code>. If they are in <em>different namespaces</em>, they must use the FQDN.</p>
            </div>
        </div>

        <h2>Network Policies (The Firewall)</h2>
        <p>By default, the K8s network is flat: <strong>Any Pod can talk to Any Pod.</strong></p>
        <p>In a multi-tenant cluster, this is a massive security risk. What if a compromised frontend container connects directly to the database container?</p>
        <p>We restrict this using <strong>NetworkPolicies</strong>. They act as internal firewalls.</p>

        <pre><code class="language-yaml"># Let's secure the Database!
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-network-policy
spec:
  podSelector:
    matchLabels:
      app: postgres        # Apply this policy to the DB pods
  policyTypes:
  - Ingress                # We are filtering INCOMING traffic
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: backend-api # ONLY allow traffic from the Backend API Pods!
    ports:
    - protocol: TCP
      port: 5432</code></pre>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Assuming namespaces provide network isolation:</strong>
                <div class="mistake-wrong">❌ "I put my dev apps in the 'dev' namespace and production in the 'prod' namespace. They are isolated."</div>
                <div class="mistake-right">✅ K8s Namespaces provide logical grouping, NOT network isolation! By default, a Pod in the 'dev' namespace can freely ping a Pod in the 'prod' namespace. You MUST use NetworkPolicies to enforce actual network isolation.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What is the default networking behavior between any two Pods in a Kubernetes cluster (assuming no NetworkPolicies)?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">They cannot communicate unless they are in the same namespace.</div>
                <div class="quiz-option" data-correct="true">Any Pod can communicate with any other Pod across the entire cluster.</div>
                <div class="quiz-option" data-correct="false">They must communicate through an external LoadBalancer.</div>
            </div>
        </div>
    `
};
