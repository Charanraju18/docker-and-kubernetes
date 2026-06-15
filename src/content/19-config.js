module.exports = {
    id: 'k8s-config',
    title: '19. ConfigMaps and Secrets',
    group: 'Kubernetes Core',
    keywords: ['configmap', 'secret', 'env vars', 'configuration', 'security'],
    content: `
        <h1>Section 19: ConfigMaps and Secrets</h1>
        <p>Twelve-Factor App methodology states that you should store configuration in the environment, not in the code. If your database URL or API keys are hardcoded in your image, you have to build a new image just to change a password. K8s solves this with ConfigMaps and Secrets.</p>
        
        <h2>ConfigMaps</h2>
        <p>A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.</p>

        <pre><code class="language-yaml"># my-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  THEME_COLOR: "dark"</code></pre>

        <h2>Secrets</h2>
        <p>A Secret is similar to a ConfigMap but is specifically intended to hold confidential data, such as passwords, OAuth tokens, and SSH keys. Storing confidential data in a Secret is safer and more flexible than putting it verbatim in a Pod definition or in a container image.</p>
        
        <p><em>Note:</em> By default, K8s Secrets are only base64 encoded, <strong>not encrypted</strong>. They just prevent casual snooping in the UI/CLI. You should configure etcd encryption or use tools like HashiCorp Vault or AWS Secrets Manager for real production security.</p>

        <pre><code class="language-yaml"># my-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  # Values must be base64 encoded!
  username: YWRtaW4=        # "admin" in base64
  password: c3VwZXJzZWNyZXQ= # "supersecret" in base64</code></pre>

        <h2>Injecting into a Deployment</h2>
        <p>Now, let's inject these into our Node.js Pod.</p>

        <pre><code class="language-yaml"># inside your deployment.yaml spec.containers
containers:
  - name: node-api
    image: myorg/node-api:v1.0
    env:
      # Inject from ConfigMap
      - name: LOG_LEVEL
        valueFrom:
          configMapKeyRef:
            name: app-config
            key: LOG_LEVEL
      
      # Inject from Secret
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            name: db-credentials
            key: password</code></pre>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Committing Secrets to GitHub:</strong>
                <div class="mistake-wrong">❌ Pushing <code>my-secret.yaml</code> (with base64 encoded production passwords) to a public or team Git repo.</div>
                <div class="mistake-right">✅ Use GitOps tools like SealedSecrets, SOPS, or an external Secrets Manager to safely manage secrets in Git.</div>
                <p>Base64 is not encryption. Anyone can decode it instantly by typing <code>echo "YWRtaW4=" | base64 --decode</code>.</p>
            </div>
            <div class="mistake-item">
                <strong>Expecting Pods to restart automatically:</strong>
                <div class="mistake-wrong">❌ Updating a ConfigMap and wondering why the Node.js app hasn't picked up the new config.</div>
                <div class="mistake-right">✅ Pods <em>do not</em> automatically restart when a ConfigMap or Secret changes. You must trigger a rollout: <code>kubectl rollout restart deployment/node-api</code></div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">Which object should you use to store a third-party API Key?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">ConfigMap</div>
                <div class="quiz-option" data-correct="true">Secret</div>
                <div class="quiz-option" data-correct="false">Hardcode it in the Dockerfile</div>
            </div>
        </div>
    `
};
