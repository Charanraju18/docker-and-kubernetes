module.exports = {
    id: 'k8s-monitoring',
    title: '23. Monitoring Kubernetes',
    group: 'Production & Operations',
    keywords: ['monitoring', 'prometheus', 'grafana', 'loki', 'alertmanager', 'observability'],
    content: `
        <h1>Section 23: Monitoring Kubernetes</h1>
        <p>In a dynamic Kubernetes environment, Pods are constantly dying and restarting across dozens of nodes. If an application crashes, the K8s logs disappear with the dead Pod. How do you know what's going on?</p>
        <p>You need <strong>Observability</strong>: Metrics, Logs, and Alerts.</p>
        
        <h2>The Standard Stack (PLG/Prometheus)</h2>
        <p>The industry standard for Kubernetes monitoring is entirely open-source.</p>

        <div class="arch-diagram">
            <div style="display: flex; justify-content: space-around; width: 100%; align-items: flex-start;">
                
                <div style="flex: 1; text-align: center; padding: 10px;">
                    <div class="arch-node" style="border-color: #e6522c;">1. Prometheus<br><small>Metrics Database</small></div>
                    <p style="font-size: 0.8rem; margin-top: 10px;">Pulls CPU, RAM, and HTTP request metrics from all Pods and Nodes every 15 seconds.</p>
                </div>

                <div style="flex: 1; text-align: center; padding: 10px;">
                    <div class="arch-node" style="border-color: #f15a24;">2. Grafana<br><small>Visual Dashboards</small></div>
                    <p style="font-size: 0.8rem; margin-top: 10px;">Connects to Prometheus to display beautiful, real-time graphs. (e.g., "Show me the 99th percentile API response time").</p>
                </div>

                <div style="flex: 1; text-align: center; padding: 10px;">
                    <div class="arch-node" style="border-color: #3b82f6;">3. Loki / Promtail<br><small>Log Aggregation</small></div>
                    <p style="font-size: 0.8rem; margin-top: 10px;">Promtail ships logs from dead and living Pods to Loki. Grafana reads Loki to display logs securely in one place.</p>
                </div>

            </div>
            
            <div class="arch-arrow">↓ Triggers ↓</div>
            <div class="arch-node" style="border-color: var(--warning);">4. AlertManager<br><small>If CPU > 90%, ping Slack/PagerDuty</small></div>
        </div>

        <h2>How Prometheus Pulls Metrics</h2>
        <p>Most traditional monitoring tools use a "push" model (your app pushes data to a central server). Prometheus uses a <strong>"pull"</strong> model.</p>
        <p>Your Node.js app must expose a <code>/metrics</code> endpoint. Prometheus automatically discovers your Pods and hits that endpoint periodically, scraping the data.</p>

        <div class="glass-panel">
            <h3>JavaScript Example: Prom-Client</h3>
            <p>To expose metrics in Node.js, you use the <code>prom-client</code> library:</p>
            <pre><code class="language-javascript">const client = require('prom-client');
const express = require('express');
const app = express();

// Enable default metrics (CPU, RAM of the Node process)
client.collectDefaultMetrics();

// Expose the endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});</code></pre>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Relying on kubectl logs:</strong>
                <div class="mistake-wrong">❌ Waiting for a user complaint, then rushing to type <code>kubectl logs &lt;pod&gt;</code> to find the error.</div>
                <div class="mistake-right">✅ Using Loki to aggregate logs and AlertManager to notify you <em>before</em> the user notices the outage. If a Pod crashes in a restart loop, <code>kubectl logs</code> often shows nothing, but Loki captured the final crash trace.</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What is the primary function of Grafana in the K8s monitoring stack?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">It stores all the raw log files on a persistent volume.</div>
                <div class="quiz-option" data-correct="false">It scrapes the /metrics endpoint of your Pods.</div>
                <div class="quiz-option" data-correct="true">It provides visual dashboards by querying databases like Prometheus and Loki.</div>
            </div>
        </div>
    `
};
