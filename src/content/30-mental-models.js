module.exports = {
    id: 'mental-models',
    title: '30. Complete Mental Models',
    group: 'Capstone Concepts',
    keywords: ['mental model', 'summary', 'docker', 'kubernetes', 'cluster', 'node'],
    content: `
        <h1>Section 30: Complete Mental Models</h1>
        <p>Before facing interviews or tackling production, you must have rock-solid mental models of these technologies. Memorizing commands is useless if you don't intuitively understand what the commands are doing. Let's cement everything we've learned.</p>
        
        <div class="glass-panel">
            <h2>🐳 The Docker Mental Model</h2>
            <ul>
                <li><strong>The Image:</strong> The recipe. The blueprint. A read-only stack of layers. It contains your code and the entire operating system environment needed to run it.</li>
                <li><strong>The Container:</strong> The cake. The running process. It is an Image brought to life by adding a temporary read-write layer on top. When it dies, its state dies.</li>
                <li><strong>The Volume:</strong> The external hard drive. It bypasses the container's temporary layer and writes data directly to the host machine. This is how data survives container death.</li>
                <li><strong>The Network:</strong> The invisible ethernet cables connecting containers so they can talk to each other by name instead of IP address.</li>
            </ul>
        </div>

        <div class="glass-panel" style="margin-top: 2rem;">
            <h2>☸️ The Kubernetes Mental Model</h2>
            <ul>
                <li><strong>The Cluster:</strong> The entire factory. A collection of machines working together as a single super-computer.</li>
                <li><strong>The Master Node (Control Plane):</strong> The factory manager. It doesn't do the physical work; it takes your orders (YAML), saves them in the filing cabinet (etcd), and delegates tasks to workers.</li>
                <li><strong>The Worker Node:</strong> The factory floor. A physical or virtual machine with CPU and RAM where the actual work happens.</li>
                <li><strong>The Pod:</strong> The smallest unit of work. A logical wrapper around 1 or more containers. Pods are mortal; K8s kills them and creates new ones constantly.</li>
                <li><strong>The ReplicaSet:</strong> The supervisor. Its only job is looking at a number (e.g., 3) and ensuring exactly that many Pods are running.</li>
                <li><strong>The Deployment:</strong> The HR department. It manages the ReplicaSets, handling rolling updates (firing old versions and hiring new versions) without downtime.</li>
                <li><strong>The Service:</strong> The internal switchboard. Since Pod IP addresses change constantly, the Service provides a permanent IP and DNS name, routing calls to whatever Pods are currently alive.</li>
                <li><strong>The Ingress:</strong> The front door of the factory. It takes traffic from the public internet, looks at the URL, and routes it to the correct internal Service.</li>
                <li><strong>The ConfigMap/Secret:</strong> The instruction manuals given to the workers. Keeps configuration and passwords out of the code.</li>
            </ul>
        </div>

        <h2>How it all connects</h2>
        <p>A Developer writes code and a <strong>Dockerfile</strong>.</p>
        <p>A CI pipeline builds the <strong>Image</strong> and pushes it to a Registry.</p>
        <p>A DevOps engineer writes a K8s <strong>Deployment YAML</strong> pointing to that Image.</p>
        <p>The K8s <strong>API Server</strong> receives the YAML and saves it to <strong>etcd</strong>.</p>
        <p>The <strong>Controller Manager</strong> creates a <strong>ReplicaSet</strong>.</p>
        <p>The ReplicaSet creates <strong>Pods</strong>.</p>
        <p>The <strong>Scheduler</strong> assigns the Pods to <strong>Worker Nodes</strong>.</p>
        <p>The <strong>Kubelet</strong> on the node tells Docker/containerd to pull the Image and start the <strong>Container</strong>.</p>
        <p>A K8s <strong>Service</strong> is created to give the Pods a stable internal DNS name.</p>
        <p>An <strong>Ingress</strong> is created to route public internet traffic to the Service.</p>
        <p><strong>The User visits your website, and the request flows all the way down to your running code!</strong></p>
    `
};
