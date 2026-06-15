module.exports = {
    id: 'mistakes',
    title: '32. Common Mistakes & Anti-Patterns',
    group: 'Capstone Concepts',
    keywords: ['mistakes', 'anti-patterns', 'huge images', 'root', 'limits', 'health checks'],
    content: `
        <h1>Section 32: Common Mistakes & Anti-Patterns</h1>
        <p>We've sprinkled common mistakes throughout the course, but let's aggregate the most critical anti-patterns that plague production systems.</p>
        
        <div class="mistakes-block">
            <h3>❌ 1. Gigantic Docker Images</h3>
            <p><strong>The Mistake:</strong> Using <code>FROM ubuntu</code> or <code>FROM node:18</code> for production. These images are hundreds of megabytes, containing compilers, package managers, and OS utilities that your app doesn't need.</p>
            <p><strong>The Fix:</strong> Use <code>alpine</code> or <code>distroless</code> images. A Node.js app on Alpine is often ~50MB. Smaller images pull faster, boot faster, and critically, have a vastly smaller attack surface for hackers.</p>
        </div>

        <div class="mistakes-block">
            <h3>❌ 2. Running K8s Pods without Resource Requests and Limits</h3>
            <p><strong>The Mistake:</strong> Deploying Pods without specifying CPU/RAM.</p>
            <pre><code class="language-yaml"># BAD! No resources defined.
containers:
  - name: api
    image: my-api</code></pre>
            <p><strong>The Fix:</strong> K8s uses "requests" to schedule Pods. If you don't define them, K8s might schedule 10 heavy Java apps on a tiny Node, crashing the Node. Furthermore, if a Node.js app has a memory leak and no "limits" are set, it will consume all the RAM on the Worker Node until the whole node dies (OOM). <strong>Always set requests and limits.</strong></p>
        </div>

        <div class="mistakes-block">
            <h3>❌ 3. Missing Liveness and Readiness Probes</h3>
            <p><strong>The Mistake:</strong> Assuming that because the Docker container process started, the application is ready to serve traffic.</p>
            <p><strong>The Fix:</strong> A Node.js app might take 10 seconds to connect to the database. If traffic is sent before that, users get errors. Use <strong>Readiness Probes</strong> to tell K8s: "Don't send traffic until my <code>/healthz</code> endpoint returns HTTP 200." Use <strong>Liveness Probes</strong> to tell K8s: "If my app deadlocks and <code>/healthz</code> times out, kill the Pod and restart it."</p>
        </div>

        <div class="mistakes-block">
            <h3>❌ 4. Using 'latest' Tags in Production</h3>
            <p><strong>The Mistake:</strong> <code>image: my-api:latest</code></p>
            <p><strong>The Fix:</strong> The <code>latest</code> tag is a pointer that moves. If K8s evicts a Pod and reschedules it on a new node, it pulls <code>latest</code> again. If a developer pushed a new version in the meantime, you suddenly have different versions of your app running simultaneously in the same Deployment! Always use immutable, specific tags (like Git commit hashes: <code>image: my-api:a1b2c3d</code>).</p>
        </div>

        <div class="mistakes-block">
            <h3>❌ 5. Storing State in Containers</h3>
            <p><strong>The Mistake:</strong> Saving user uploads (like profile pictures) or SQLite databases directly to the container's file system.</p>
            <p><strong>The Fix:</strong> Containers are ephemeral. When the Deployment updates or K8s reschedules the Pod, all local files are destroyed. Store files in S3/Cloud Storage, and use managed Databases or PersistentVolumes for structured data.</p>
        </div>

        <div class="mistakes-block">
            <h3>❌ 6. Hardcoding Configuration</h3>
            <p><strong>The Mistake:</strong> Baking the API URL or database credentials into the Docker image during the build process.</p>
            <p><strong>The Fix:</strong> The exact same Docker image (with the exact same hash) should be deployed to Dev, Staging, and Production. It should read its environment entirely from K8s ConfigMaps and Secrets at runtime.</p>
        </div>
    `
};
