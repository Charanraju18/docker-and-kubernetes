module.exports = {
    id: 'k8s-deployments',
    title: '16. Deployments & ReplicaSets',
    group: 'Kubernetes Core',
    keywords: ['deployment', 'replicaset', 'scaling', 'rolling update', 'rollback'],
    content: `
        <h1>Section 16: Deployments & ReplicaSets</h1>
        <p>In production, you <strong>almost never create individual Pods</strong> directly like we did in the last section. Pods are ephemeral. If a node dies, the Pod dies, and K8s will NOT recreate an individually launched Pod.</p>
        <p>To ensure high availability, you use a <strong>Deployment</strong>.</p>
        
        <h2>The ReplicaSet</h2>
        <p>A ReplicaSet's only job is to ensure that a specified number of pod replicas are running at any given time. If you want 3 pods, the ReplicaSet constantly monitors. If one crashes, it instantly starts a new one to maintain the count of 3.</p>

        <h2>The Deployment</h2>
        <p>A Deployment provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.</p>
        <p><strong>You create Deployments. Deployments create ReplicaSets. ReplicaSets create Pods.</strong></p>

        <pre><code class="language-yaml"># api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: node-api
  template:         # Everything below here is exactly the same as a Pod definition!
    metadata:
      labels:
        app: node-api
    spec:
      containers:
        - name: api-container
          image: myorg/node-api:v1.0
          ports:
            - containerPort: 3000</code></pre>

        <h2>Zero-Downtime Rolling Updates</h2>
        <p>The superpower of Deployments is updating your app without downtime. Suppose we want to update the image from <code>v1.0</code> to <code>v2.0</code>.</p>
        
        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">kubectl set image deployment/node-api-deployment api-container=myorg/node-api:v2.0</div>
                <div class="cmd-explain">
                    Updates the image used by the deployment. K8s will trigger a Rolling Update.
                </div>
            </div>
        </div>

        <p><strong>How the Rolling Update works:</strong> K8s creates a new ReplicaSet. It starts 1 new Pod with v2.0. Once that Pod is healthy, it terminates 1 old Pod with v1.0. It repeats this process until all Pods are v2.0. Your users never experience downtime.</p>

        <h2>Rollbacks</h2>
        <p>Did v2.0 introduce a critical bug? K8s keeps a history of your Deployments.</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">kubectl rollout undo deployment/node-api-deployment</div>
                <div class="cmd-explain">
                    Instantly stops the current pods and rolls back to the previous stable ReplicaSet (v1.0).
                </div>
            </div>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>No Liveness/Readiness Probes:</strong>
                <div class="mistake-wrong">❌ Relying on Docker just to start the process.</div>
                <p>If your Node.js app connects to a DB and the DB is down, the process might still be running, but the app is returning 500 errors. During a Rolling Update, K8s assumes the new Pod is ready because the process started, and kills the old ones, causing an outage. <strong>Always configure Readiness Probes</strong> so K8s actually tests an HTTP endpoint (like <code>/healthz</code>) before routing traffic to it.</p>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">If you manually delete a Pod that was created by a Deployment, what happens?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">The Pod is gone forever and your app capacity is permanently reduced.</div>
                <div class="quiz-option" data-correct="true">The underlying ReplicaSet notices the missing Pod and instantly starts a new one to maintain the desired replica count.</div>
                <div class="quiz-option" data-correct="false">The entire Deployment crashes and deletes itself.</div>
            </div>
        </div>
    `
};
