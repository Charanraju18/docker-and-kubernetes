module.exports = {
    id: 'docker-prod',
    title: '12. Docker in Production',
    group: 'Docker Core',
    keywords: ['production', 'nginx', 'reverse proxy', 'ssl', 'scaling'],
    content: `
        <h1>Section 12: Docker in Production</h1>
        <p>Running Docker on your laptop is easy. Running Docker in production requires thinking about scaling, SSL certificates, load balancing, and zero-downtime deployments.</p>
        
        <h2>The Reverse Proxy</h2>
        <p>In production, you never expose your Node.js or internal apps directly to the internet on ports like 3000. Instead, you put a <strong>Reverse Proxy</strong> in front of your containers. The most popular are Nginx, Traefik, or HAProxy.</p>

        <div class="arch-diagram">
            <div class="arch-node">Internet (Users)</div>
            <div class="arch-arrow">↓ HTTPS (Port 443) ↓</div>
            <div class="arch-node" style="border-color: var(--accent-primary)">Reverse Proxy<br><small>(Nginx / Traefik)</small><br><small>Handles SSL & Load Balancing</small></div>
            <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 20px;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div class="arch-arrow">↓ HTTP ↓</div>
                    <div class="arch-node">Frontend Container<br><small>(React static files)</small></div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div class="arch-arrow">↓ HTTP ↓</div>
                    <div class="arch-node">Backend Container 1<br><small>(Node API)</small></div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div class="arch-arrow">↓ HTTP ↓</div>
                    <div class="arch-node">Backend Container 2<br><small>(Node API)</small></div>
                </div>
            </div>
        </div>

        <h3>Why use a Reverse Proxy?</h3>
        <ul>
            <li><strong>SSL Termination:</strong> The proxy holds the SSL certificates (e.g., Let's Encrypt). The traffic from proxy to the containers is unencrypted, saving CPU.</li>
            <li><strong>Load Balancing:</strong> If you scale your backend to 3 containers, the proxy distributes incoming traffic evenly across them.</li>
            <li><strong>Security:</strong> The proxy hides the internal network structure of your application.</li>
        </ul>

        <h2>Scaling Containers</h2>
        <p>With Docker Compose, you can scale a specific service easily.</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">docker-compose up -d --scale backend=3</div>
                <div class="cmd-explain">
                    This spins up 3 identical instances of the backend container. <em>Note:</em> You cannot have hardcoded port mappings (like "3000:3000") in your compose file if you scale, because multiple containers cannot bind to the same host port. You must let Docker assign random host ports or use a reverse proxy.
                </div>
            </div>
        </div>

        <h2>When Docker Compose isn't enough</h2>
        <p>Docker Compose is fantastic for single-server deployments (like a $5 DigitalOcean droplet). However, what happens when:</p>
        <ul>
            <li>Your single server crashes? All containers die.</li>
            <li>You need 100 containers and they won't fit on one server's RAM?</li>
            <li>You want to deploy an update without <em>any</em> downtime?</li>
        </ul>
        <p>When you outgrow a single server, you enter the realm of <strong>Container Orchestration</strong>. And that brings us to the next massive topic: <strong>Kubernetes</strong>.</p>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>No Restart Policies:</strong>
                <div class="mistake-wrong">❌ A Node.js container crashes due to an unhandled exception, and the site goes down until you wake up.</div>
                <div class="mistake-right">✅ Adding <code>restart: always</code> or <code>restart: unless-stopped</code> to your docker-compose.yml services so Docker restarts them automatically.</div>
            </div>
        </div>
    `
};
