module.exports = {
    id: 'docker-containers',
    title: '6. Docker Containers Lifecycle',
    group: 'Docker Core',
    keywords: ['container', 'run', 'stop', 'rm', 'exec', 'logs'],
    content: `
        <h1>Section 6: Docker Containers</h1>
        <p>Once you have an image, you can instantiate it into a running process called a Container. Understanding the container lifecycle is essential for daily Docker usage.</p>
        
        <h2>The Read-Write Layer</h2>
        <p>As we learned, images are read-only layers. When Docker creates a container, it adds a thin <strong>read-write layer</strong> on top of the image stack.</p>
        <p>Any changes the container makes while running (creating new files, modifying existing ones) are written to this thin read-write layer. If you delete the container, this layer is destroyed, and the changes are lost (unless you use Volumes, which we cover later!).</p>

        <h2>Container Lifecycle Commands</h2>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">docker run -d --name my-nginx nginx:latest</div>
                <div class="cmd-explain">
                    <strong>docker run:</strong> Creates and starts the container.<br>
                    <strong>-d:</strong> Detached mode. Runs the container in the background, freeing up your terminal.<br>
                    <strong>--name my-nginx:</strong> Assigns a friendly name instead of a random hash.
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
                <div class="cmd-text">docker ps</div>
                <div class="cmd-explain">
                    Lists only the <strong>currently running</strong> containers. Use <code>docker ps -a</code> to see all containers, including stopped ones.
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
                <div class="cmd-text">docker logs my-nginx</div>
                <div class="cmd-explain">
                    Shows the standard output (stdout/stderr) from the container. Add <code>-f</code> (follow) to stream the logs live.
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
                <div class="cmd-text">docker exec -it my-nginx /bin/bash</div>
                <div class="cmd-explain">
                    <strong>docker exec:</strong> Runs a new command in a <em>running</em> container.<br>
                    <strong>-it:</strong> Interactive + TTY. Connects your terminal to the container's terminal.<br>
                    <strong>/bin/bash:</strong> Starts a bash shell inside the container so you can look around. (Use <code>/bin/sh</code> if bash is missing, common in Alpine images).
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
                <div class="cmd-text">docker stop my-nginx<br>docker rm my-nginx</div>
                <div class="cmd-explain">
                    <strong>stop:</strong> Sends a SIGTERM signal to gracefully shut down the container.<br>
                    <strong>rm:</strong> Deletes the container and its read-write layer completely.
                </div>
            </div>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Treating containers like VMs:</strong>
                <div class="mistake-wrong">❌ "I'll exec into the container and install some new software using apt-get, then leave it running."</div>
                <div class="mistake-right">✅ "Containers are ephemeral. If I need new software, I update the Dockerfile and build a new image."</div>
                <p>If you modify a running container, those changes will vanish the moment the container is deleted.</p>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What command is used to get an interactive shell inside an already running container?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">docker shell</div>
                <div class="quiz-option" data-correct="false">docker run -it</div>
                <div class="quiz-option" data-correct="true">docker exec -it</div>
            </div>
        </div>
    `
};
