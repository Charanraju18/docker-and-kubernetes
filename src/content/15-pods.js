module.exports = {
    id: 'k8s-pods',
    title: '15. Pods Deep Dive',
    group: 'Kubernetes Core',
    keywords: ['pod', 'container', 'yaml', 'kubectl', 'multi-container'],
    content: `
        <h1>Section 15: Pods Deep Dive</h1>
        <p>In Kubernetes, you <strong>do not run containers directly</strong>. The smallest deployable unit in Kubernetes is a <strong>Pod</strong>.</p>
        
        <h2>What is a Pod?</h2>
        <p>A Pod is a wrapper around one or more containers. Think of a Pod as a "logical host" or an abstract wrapper that K8s uses to manage containers.</p>

        <div class="glass-panel">
            <h3>💡 Real-world Analogy: The Pea Pod</h3>
            <p>If your application container is a pea, Kubernetes doesn't manage individual peas. It manages the <strong>Pod</strong>. A Pod can contain one pea (the most common pattern) or multiple peas that need to share the same environment.</p>
        </div>

        <h2>Characteristics of a Pod</h2>
        <ul>
            <li><strong>Shared Network:</strong> All containers in a Pod share the same IP address and port space. They can communicate with each other using <code>localhost</code>.</li>
            <li><strong>Shared Storage:</strong> You can specify shared storage volumes that all containers in the Pod can access.</li>
            <li><strong>Ephemeral:</strong> Pods are mortal. They are not meant to live forever. If a Pod dies, K8s creates a brand new one (with a new IP address) to replace it.</li>
        </ul>

        <h2>Defining a Pod in YAML</h2>
        <p>We define Kubernetes objects using YAML. Let's create a simple Nginx Pod.</p>

        <pre><code class="language-yaml"># nginx-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
  labels:
    app: webserver
spec:
  containers:
    - name: nginx-container
      image: nginx:latest
      ports:
        - containerPort: 80</code></pre>

        <h2>kubectl: The K8s CLI</h2>
        <p>Just like you use <code>docker</code> for Docker, you use <code>kubectl</code> (kube-control) to interact with the K8s API.</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">kubectl apply -f nginx-pod.yaml</div>
                <div class="cmd-explain">
                    Sends the YAML file to the K8s API Server to create the Pod.
                </div>
            </div>
        </div>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">kubectl get pods<br>kubectl describe pod my-nginx-pod</div>
                <div class="cmd-explain">
                    <strong>get pods:</strong> Lists all pods in the current namespace.<br>
                    <strong>describe:</strong> Shows incredibly detailed information about a specific pod, including the event log (vital for debugging why a pod won't start).
                </div>
            </div>
        </div>

        <h2>Multi-Container Pods (Sidecar Pattern)</h2>
        <p>Sometimes you need two containers to run tightly coupled. Example: A Node.js web server container, and a Logging container that reads the Node logs and ships them to a central server. Because they share the same Pod, they can share a disk volume seamlessly.</p>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Putting your entire stack in one Pod:</strong>
                <div class="mistake-wrong">❌ Creating a single Pod that contains a Node container, a React container, and a Postgres container.</div>
                <div class="mistake-right">✅ Creating three separate Pods.</div>
                <p>Containers in a Pod scale together. If your frontend gets high traffic, K8s scales the entire Pod. You don't want to spin up new database instances just because your frontend needs more CPU! Keep them decoupled.</p>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">How do two different containers inside the SAME Pod communicate with each other?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Through external DNS resolution.</div>
                <div class="quiz-option" data-correct="true">Over localhost.</div>
                <div class="quiz-option" data-correct="false">They cannot communicate; they are isolated.</div>
            </div>
        </div>
    `
};
