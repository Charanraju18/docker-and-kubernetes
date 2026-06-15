module.exports = {
    id: 'k8s-real-world',
    title: '29. Real World Kubernetes',
    group: 'Production & Operations',
    keywords: ['real world', 'netflix', 'uber', 'spotify', 'openai', 'case study'],
    content: `
        <h1>Section 29: Real World Kubernetes</h1>
        <p>To truly grasp the power of container orchestration, let's look at how the biggest tech companies in the world use these technologies at a massive scale.</p>
        
        <h2>Spotify: The Microservices Pioneer</h2>
        <p>Spotify has over a thousand microservices. When you press "play", dozens of backend services are queried (user auth, playlist data, recommendation engine, ad tracking).</p>
        <ul>
            <li><strong>The Problem:</strong> Managing virtual machines for 1000+ services was too slow for developers.</li>
            <li><strong>The K8s Solution:</strong> They migrated to K8s. Now, developers define their service requirements in YAML, and the cluster handles placement. </li>
            <li><strong>Scale:</strong> They run thousands of nodes. They heavily rely on K8s Namespaces to give each squad (team) their own isolated environment within massive shared clusters.</li>
        </ul>

        <h2>OpenAI: AI at K8s Scale</h2>
        <p>OpenAI (creators of ChatGPT) operates some of the largest Kubernetes clusters on Earth.</p>
        <ul>
            <li><strong>The Workload:</strong> Machine learning training jobs require massive bursts of compute power. They aren't traditional long-running web servers; they are batch jobs that need 10,000 GPUs for a week, and then stop.</li>
            <li><strong>The K8s Solution:</strong> They use K8s to orchestrate these massive training jobs. They scaled K8s up to <strong>7,500 nodes</strong> in a single cluster (pushing the software to its absolute limits).</li>
            <li><strong>Custom Controllers:</strong> They wrote custom K8s Operators to handle network topology so that Pods doing ML training are physically located on the same network switches to minimize latency.</li>
        </ul>

        <h2>Uber: Global Routing</h2>
        <p>Uber manages trips globally in real-time. Downtime is not an option.</p>
        <ul>
            <li><strong>The K8s Solution:</strong> Uber uses multiple K8s clusters deployed across different physical regions (e.g., US-East, Europe). </li>
            <li><strong>Federation:</strong> They built systems on top of K8s to route traffic. If a K8s cluster in US-East goes down completely, global load balancers instantly shift traffic to the US-West K8s cluster. K8s HPA in US-West detects the traffic surge and scales up the Pods automatically to absorb the load.</li>
        </ul>

        <div class="glass-panel">
            <h3>💡 The Common Thread: Custom Resource Definitions (CRDs)</h3>
            <p>None of these companies just use K8s out-of-the-box. The true power of Kubernetes is that it is <strong>extensible</strong>.</p>
            <p>If you need K8s to manage something it doesn't understand (like a database cluster, or an AI training job, or an SSL certificate), you can write a <strong>CRD (Custom Resource Definition)</strong>.</p>
            <p>You define a new YAML kind (e.g., <code>kind: AITrainingJob</code>), and you write a custom Controller (often in Go) that watches the K8s API for that YAML and executes your custom logic. This is how K8s evolved from a container manager into a universal cloud control plane.</p>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Cargo Culting:</strong>
                <div class="mistake-wrong">❌ "Netflix uses 1000 microservices on K8s, so my startup with 3 engineers should also split our app into 20 microservices."</div>
                <div class="mistake-right">✅ Start with a Majestic Monolith. Netflix built microservices because they had thousands of engineers stepping on each other's toes, not because microservices are inherently "better code". Only adopt massive K8s microservice architectures when your organizational size demands it.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What K8s feature allows companies to extend the API and create custom K8s objects (like 'kind: SSL Certificate' or 'kind: AIJob')?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">ConfigMaps</div>
                <div class="quiz-option" data-correct="true">Custom Resource Definitions (CRDs)</div>
                <div class="quiz-option" data-correct="false">Namespaces</div>
            </div>
        </div>
    `
};
