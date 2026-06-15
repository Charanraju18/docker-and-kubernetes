module.exports = {
    id: 'docker-installation',
    title: '4. Docker Installation',
    group: 'Docker Core',
    keywords: ['install', 'docker desktop', 'linux', 'wsl', 'verify'],
    content: `
        <h1>Section 4: Docker Installation</h1>
        <p>Before we can start building containers, we need to install the Docker Engine on our machine.</p>
        
        <h2>Mac & Windows: Docker Desktop</h2>
        <p>For Mac and Windows users, the easiest way is to install <strong>Docker Desktop</strong>. It is a native application that includes the Docker Engine, Docker CLI client, Docker Compose, and a graphical user interface (GUI) to manage your containers.</p>
        
        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Windows Users and WSL:</strong>
                <div class="mistake-wrong">❌ Installing Docker inside a slow VirtualBox VM.</div>
                <div class="mistake-right">✅ Using WSL2 (Windows Subsystem for Linux) backend in Docker Desktop. It allows Docker to run natively on the Windows kernel using a lightweight utility VM, providing near-native Linux performance.</div>
            </div>
        </div>

        <h2>Linux Installation</h2>
        <p>On Linux, Docker runs natively without needing a utility VM. You install the Docker Engine directly.</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">sudo apt-get update<br>sudo apt-get install docker-ce docker-ce-cli containerd.io</div>
                <div class="cmd-explain">
                    <strong>apt-get update:</strong> Updates your package list.<br>
                    <strong>docker-ce:</strong> Docker Community Edition (the Engine).<br>
                    <strong>docker-ce-cli:</strong> The command line tool you type 'docker' into.<br>
                    <strong>containerd.io:</strong> The underlying container runtime that Docker uses.
                </div>
            </div>
        </div>

        <h2>Verifying Your Installation</h2>
        <p>Once installed, open your terminal and verify that Docker is running by executing the classic "hello-world" container.</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">docker run hello-world</div>
                <div class="cmd-explain">
                    When you run this command:<br>
                    1. The Docker client contacts the Docker daemon.<br>
                    2. The daemon pulls the "hello-world" image from Docker Hub (if not local).<br>
                    3. The daemon creates a new container from that image.<br>
                    4. The container runs an executable that prints a hello message and exits.
                </div>
            </div>
        </div>

        <pre><code>Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:bfea6278a0a...
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.</code></pre>

        <div class="quiz-container">
            <div class="quiz-question">Which backend should Windows users enable in Docker Desktop for the best performance?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Hyper-V Legacy</div>
                <div class="quiz-option" data-correct="true">WSL2 (Windows Subsystem for Linux)</div>
                <div class="quiz-option" data-correct="false">VirtualBox</div>
            </div>
        </div>
    `
};
