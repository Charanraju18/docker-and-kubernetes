module.exports = {
    id: 'docker-what',
    title: '2. What Is Docker?',
    group: 'Docker Core',
    keywords: ['container', 'image', 'engine', 'registry', 'daemon'],
    content: `
        <h1>Section 2: What Is Docker?</h1>
        <p>Docker is an open-source platform that allows developers to build, deploy, run, update, and manage containers. But what exactly does that mean?</p>
        
        <h2>Core Concepts</h2>
        <p>To understand Docker, you must master its four foundational components.</p>

        <h3>1. Docker Image</h3>
        <p>An Image is a read-only template with instructions for creating a Docker container. Think of it as a blueprint or a snapshot. It contains the application code, runtime (like Node.js), libraries, environment variables, and configuration files.</p>
        <p><em>Analogy:</em> A recipe for baking a cake.</p>

        <h3>2. Docker Container</h3>
        <p>A Container is a runnable instance of an image. If the image is the recipe, the container is the actual physical cake. You can create, start, stop, move, or delete a container using the Docker API or CLI.</p>
        <p><em>Analogy:</em> The baked cake sitting on your table.</p>

        <h3>3. Docker Engine</h3>
        <p>The Docker Engine is the core software that runs on your machine. It has a server process (the Docker Daemon), a REST API, and a Command Line Interface (CLI) client. The Daemon listens for API requests and manages images, containers, networks, and volumes.</p>

        <h3>4. Docker Registry</h3>
        <p>A Registry stores Docker images. Docker Hub is a public registry that anyone can use, and Docker is configured to look for images on Docker Hub by default. You can also run your own private registry.</p>
        <p><em>Analogy:</em> GitHub, but for Docker images instead of source code.</p>

        <h2>The Complete Architecture</h2>
        <p>How do these pieces fit together?</p>
        
        <div class="arch-diagram">
            <div class="arch-node" data-info="info-dockerfile">1. Dockerfile<br><small>Source Code</small></div>
            <div class="arch-arrow">↓ docker build ↓</div>
            <div class="arch-node" data-info="info-image">2. Docker Image<br><small>The Blueprint</small></div>
            <div class="arch-arrow">↓ docker run ↓</div>
            <div class="arch-node" data-info="info-container" style="border-color: var(--success)">3. Container<br><small>Running App</small></div>
            
            <div id="info-dockerfile" class="arch-info">
                <strong>Dockerfile:</strong> A text document containing all the commands a user could call on the command line to assemble an image.
            </div>
            <div id="info-image" class="arch-info">
                <strong>Image:</strong> Built from the Dockerfile. It consists of multiple read-only layers.
            </div>
            <div id="info-container" class="arch-info">
                <strong>Container:</strong> Docker adds a read-write layer on top of the image to create a running container.
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
                <div class="cmd-text">docker run -p 8080:80 nginx</div>
                <div class="cmd-explain">
                    <strong>docker run:</strong> Command to start a container.<br>
                    <strong>-p 8080:80:</strong> Maps port 8080 of your host machine to port 80 inside the container.<br>
                    <strong>nginx:</strong> The name of the image to run. If not found locally, Docker pulls it from Docker Hub.
                </div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What is the relationship between an Image and a Container?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">They are exactly the same thing.</div>
                <div class="quiz-option" data-correct="false">A container is used to build an image.</div>
                <div class="quiz-option" data-correct="true">An image is the read-only blueprint, and the container is the running instance of that blueprint.</div>
            </div>
        </div>
    `
};
