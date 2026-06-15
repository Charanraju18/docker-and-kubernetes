module.exports = {
    id: 'interviews',
    title: '31. Interview Questions',
    group: 'Capstone Concepts',
    keywords: ['interview', 'questions', 'senior', 'system design', 'answers'],
    content: `
        <h1>Section 31: Interview Questions & Answers</h1>
        <p>If you are interviewing for a Backend, DevOps, or SRE role, you <em>will</em> be asked these questions. Hide the answers to test yourself!</p>

        <h2>Beginner Level</h2>
        
        <div class="glass-panel">
            <h3>Q: What is the difference between a Container and a Virtual Machine?</h3>
            <details style="margin-top: 10px; cursor: pointer; color: var(--accent-primary);">
                <summary>Show Answer</summary>
                <div style="color: var(--text-primary); margin-top: 10px;">
                    VMs run a full Guest OS on top of a Hypervisor, making them heavyweight, slow to boot, and resource-intensive. Containers share the Host OS kernel and only package the application code and its dependencies, making them lightweight, fast, and resource-efficient.
                </div>
            </details>
        </div>

        <div class="glass-panel">
            <h3>Q: What is a Dockerfile?</h3>
            <details style="margin-top: 10px; cursor: pointer; color: var(--accent-primary);">
                <summary>Show Answer</summary>
                <div style="color: var(--text-primary); margin-top: 10px;">
                    A Dockerfile is a text document containing all the sequential commands needed to assemble a Docker Image. It is the blueprint used by the <code>docker build</code> command.
                </div>
            </details>
        </div>

        <h2>Intermediate Level</h2>

        <div class="glass-panel">
            <h3>Q: Why should you arrange instructions in a Dockerfile in a specific order?</h3>
            <details style="margin-top: 10px; cursor: pointer; color: var(--accent-primary);">
                <summary>Show Answer</summary>
                <div style="color: var(--text-primary); margin-top: 10px;">
                    To optimize Docker's layer caching. Instructions that change frequently (like <code>COPY . .</code> for source code) should go at the bottom. Instructions that rarely change (like installing OS dependencies or copying <code>package.json</code> and running <code>npm install</code>) should go at the top. This prevents Docker from rebuilding slow layers unnecessarily.
                </div>
            </details>
        </div>

        <div class="glass-panel">
            <h3>Q: What happens if a Pod dies in Kubernetes? Does K8s restart it?</h3>
            <details style="margin-top: 10px; cursor: pointer; color: var(--accent-primary);">
                <summary>Show Answer</summary>
                <div style="color: var(--text-primary); margin-top: 10px;">
                    If the Pod was created directly (bare Pod), no, it is gone forever. If the Pod is managed by a controller like a ReplicaSet or Deployment, the controller will notice the actual state no longer matches the desired state, and it will create a <strong>brand new Pod</strong> (with a new IP address) to replace it.
                </div>
            </details>
        </div>

        <div class="glass-panel">
            <h3>Q: What is the difference between ClusterIP, NodePort, and LoadBalancer services?</h3>
            <details style="margin-top: 10px; cursor: pointer; color: var(--accent-primary);">
                <summary>Show Answer</summary>
                <div style="color: var(--text-primary); margin-top: 10px;">
                    <strong>ClusterIP:</strong> Internal only. <br>
                    <strong>NodePort:</strong> Exposes the service on a static port on every Worker Node's IP. <br>
                    <strong>LoadBalancer:</strong> Provisions an external load balancer from the cloud provider (AWS/GCP) to route public internet traffic into the cluster.
                </div>
            </details>
        </div>

        <h2>Senior & System Design Level</h2>

        <div class="glass-panel">
            <h3>Q: How would you achieve zero-downtime deployments for a database schema change in Kubernetes?</h3>
            <details style="margin-top: 10px; cursor: pointer; color: var(--accent-primary);">
                <summary>Show Answer</summary>
                <div style="color: var(--text-primary); margin-top: 10px;">
                    You cannot simply run a rolling update if the new code relies on a new schema, because K8s runs both v1 and v2 of the code simultaneously during the rollout. <br><br>
                    <strong>The Expand and Contract Pattern:</strong><br>
                    1. <em>Expand:</em> Run a database migration that adds the new columns (but doesn't delete old ones). The schema is now compatible with both v1 and v2.<br>
                    2. <em>Deploy:</em> Run the K8s Deployment Rolling Update. v1 reads old columns, v2 writes to new columns.<br>
                    3. <em>Contract:</em> Once v1 is completely phased out, run a final database migration to delete the old columns.
                </div>
            </details>
        </div>

        <div class="glass-panel">
            <h3>Q: Our Kubernetes cluster is running out of IP addresses. What architectural mistake might have caused this, and how do we fix it?</h3>
            <details style="margin-top: 10px; cursor: pointer; color: var(--accent-primary);">
                <summary>Show Answer</summary>
                <div style="color: var(--text-primary); margin-top: 10px;">
                    Every Pod gets a unique IP address. If the cluster subnet (CIDR block) was configured too small initially (e.g., a /24 subnet only gives 256 IPs), you will hit a hard limit on the number of Pods you can run.<br><br>
                    <em>Fix:</em> This is notoriously difficult to fix without cluster recreation in many CNI plugins. You must design the VPC and K8s subnet CIDRs carefully during initial cluster bootstrapping (using /16 or /18 subnets), or use a CNI that supports secondary CIDR blocks (like AWS VPC CNI custom networking).
                </div>
            </details>
        </div>
    `
};
