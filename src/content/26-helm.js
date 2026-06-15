module.exports = {
    id: 'k8s-helm',
    title: '26. Helm Charts',
    group: 'Production & Operations',
    keywords: ['helm', 'chart', 'package manager', 'templates', 'values.yaml'],
    content: `
        <h1>Section 26: Helm Charts</h1>
        <p>If you want to install a complex application like Redis or Prometheus into Kubernetes, writing 15 different YAML files (Deployments, Services, ConfigMaps, PVCs, RBAC rules) by hand is exhausting. What if you want to deploy it to both 'Staging' and 'Production' with slightly different configurations?</p>
        <p>Enter <strong>Helm</strong>, the Package Manager for Kubernetes.</p>
        
        <h2>What is Helm?</h2>
        <p>Helm allows you to package all K8s YAML files for an application into a single bundle called a <strong>Chart</strong>. It uses templating to make these YAML files highly reusable.</p>

        <div class="glass-panel">
            <h3>💡 Real-world Analogy: NPM or apt-get</h3>
            <p>If Docker is the software container, and Kubernetes is the operating system running those containers, then <strong>Helm is the App Store (or package manager)</strong> like <code>npm install</code> or <code>apt-get</code>.</p>
        </div>

        <h2>How Helm Works</h2>
        <p>A Helm Chart consists of two main parts: Templates and Values.</p>

        <h3>1. The Template (e.g., deployment.yaml)</h3>
        <p>Instead of hardcoding the replica count, Helm uses Go templating syntax.</p>
        <pre><code class="language-yaml"># templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-api
spec:
  replicas: {{ .Values.replicaCount }}  # Inject value here!
  template:
    spec:
      containers:
        - name: app
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"</code></pre>

        <h3>2. The values.yaml File</h3>
        <p>You define the variables in a clean, simple file.</p>
        <pre><code class="language-yaml"># values.yaml
replicaCount: 3
image:
  repository: myorg/node-api
  tag: "v2.0"</code></pre>

        <p>When you run <code>helm install</code>, Helm merges the <code>values.yaml</code> with the templates, generates the final pure K8s YAML, and sends it to the API Server.</p>

        <h2>Important Commands</h2>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">helm repo add bitnami https://charts.bitnami.com/bitnami<br>helm install my-db bitnami/postgresql</div>
                <div class="cmd-explain">
                    1. Adds the public Bitnami Helm repository.<br>
                    2. Installs a production-ready PostgreSQL database cluster in one command! It automatically provisions the StatefulSet, Services, Secrets, and PVCs.
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
                <div class="cmd-text">helm upgrade my-db bitnami/postgresql -f prod-values.yaml</div>
                <div class="cmd-explain">
                    Upgrades an existing installation, overriding the default configurations with your custom <code>prod-values.yaml</code>.
                </div>
            </div>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Reinventing the wheel:</strong>
                <div class="mistake-wrong">❌ Writing your own complex YAML for standard software like Redis, Nginx Ingress, or Cert-Manager.</div>
                <div class="mistake-right">✅ Using public Helm charts maintained by the community (e.g., Artifact Hub). They include years of edge-case bug fixes and best practices.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What is the primary purpose of the 'values.yaml' file in a Helm Chart?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">It stores the encrypted passwords and secrets for the cluster.</div>
                <div class="quiz-option" data-correct="true">It provides the user-configurable variables that get injected into the YAML templates.</div>
                <div class="quiz-option" data-correct="false">It defines the Go code that runs the Helm CLI.</div>
            </div>
        </div>
    `
};
