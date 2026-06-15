module.exports = {
    id: 'docker-networking',
    title: '8. Docker Networking',
    group: 'Docker Core',
    keywords: ['network', 'bridge', 'host', 'overlay', 'port mapping'],
    content: `
        <h1>Section 8: Docker Networking</h1>
        <p>Containers are isolated by default. Networking allows them to talk to each other and to the outside world.</p>
        
        <h2>Network Drivers</h2>
        <p>Docker uses different "drivers" to handle networking. The most common are:</p>

        <h3>1. Bridge Network (Default)</h3>
        <p>When you run a container without specifying a network, it attaches to the default <code>bridge</code> network. Containers on the same bridge network can communicate with each other using IP addresses.</p>
        <p>However, usually, we create a <strong>User-defined Bridge Network</strong>. This provides <em>automatic DNS resolution</em>. You can ping a container by its name instead of tracking its IP address.</p>

        <div class="arch-diagram">
            <div class="arch-node">Host Machine (Laptop)</div>
            <div class="arch-arrow">⇅ Port Mapping (-p 8080:80) ⇅</div>
            <div style="border: 2px dashed var(--accent-primary); padding: 20px; border-radius: 8px; text-align: center; width: 100%;">
                <h4 style="margin-top: 0;">User-defined Bridge Network</h4>
                <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                    <div class="arch-node" style="border-color: var(--warning)">Container A<br><small>name: web-api</small></div>
                    <div class="arch-arrow">↔ ping db ↔</div>
                    <div class="arch-node" style="border-color: var(--success)">Container B<br><small>name: db</small></div>
                </div>
            </div>
        </div>

        <h3>2. Host Network</h3>
        <p>Removes network isolation between the container and the Docker host. If your container binds to port 80, the host's port 80 is immediately bound. (Not supported on Mac/Windows Docker Desktop natively).</p>

        <h3>3. Overlay Network</h3>
        <p>Used to connect multiple Docker daemons together (e.g., Docker Swarm) so containers on different physical servers can communicate.</p>

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
                <div class="cmd-text">docker network create my-net<br>docker run -d --name db --network my-net postgres<br>docker run -d --name api --network my-net node-api</div>
                <div class="cmd-explain">
                    1. Creates a user-defined bridge network called <code>my-net</code>.<br>
                    2. Starts a postgres container attached to that network.<br>
                    3. Starts a node container attached to that network. The node container can now connect to the database using the hostname <code>db</code> instead of an IP address.
                </div>
            </div>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Using 'localhost' inside a container to reach another container:</strong>
                <div class="mistake-wrong">❌ Database URL inside Node container: <code>postgres://localhost:5432/mydb</code></div>
                <div class="mistake-right">✅ Database URL inside Node container: <code>postgres://db:5432/mydb</code></div>
                <p>Inside a container, <code>localhost</code> means the container itself! To reach the database container, you must use its container name (assuming they are on the same custom bridge network).</p>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">Which feature allows containers on a user-defined bridge network to resolve each other by container name?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Port mapping (-p)</div>
                <div class="quiz-option" data-correct="true">Automatic DNS resolution</div>
                <div class="quiz-option" data-correct="false">Host networking</div>
            </div>
        </div>
    `
};
