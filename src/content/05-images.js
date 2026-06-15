module.exports = {
    id: 'docker-images',
    title: '5. Docker Images Deep Dive',
    group: 'Docker Core',
    keywords: ['image', 'layers', 'caching', 'hub', 'registry', 'pull'],
    content: `
        <h1>Section 5: Docker Images Deep Dive</h1>
        <p>A Docker Image is the blueprint for your container. Let's look under the hood to see how they are actually constructed.</p>
        
        <h2>The Layered File System</h2>
        <p>Docker images are not a single giant file. They are built from a series of <strong>read-only layers</strong>. Each layer represents an instruction in the image's Dockerfile.</p>

        <div class="arch-diagram">
            <div style="display: flex; flex-direction: column-reverse; gap: 5px; width: 300px;">
                <div style="background: var(--code-bg); padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; text-align: center;">Layer 4: Copy source code (10KB)</div>
                <div style="background: var(--code-bg); padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; text-align: center;">Layer 3: npm install (50MB)</div>
                <div style="background: var(--code-bg); padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; text-align: center;">Layer 2: Add Node.js (150MB)</div>
                <div style="background: var(--code-bg); padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; text-align: center;">Layer 1: Base Alpine Linux (5MB)</div>
            </div>
            <p style="margin-top: 10px; color: var(--text-secondary);"><small>Layers are stacked. The final image is the combination of all layers.</small></p>
        </div>

        <h3>Image Caching</h3>
        <p>Why does Docker use layers? <strong>Caching and Reusability!</strong></p>
        <p>If you build your Node.js app, Docker downloads the Base OS layer and the Node.js layer. If you change your JavaScript code and rebuild the image, Docker <strong>reuses</strong> the cached Base OS and Node.js layers. It only rebuilds the final "Copy source code" layer. This makes image building incredibly fast.</p>

        <h2>Docker Registries</h2>
        <p>Where do images live? In a Registry. The default registry is <strong>Docker Hub</strong>. Other popular registries include GitHub Container Registry (GHCR) and AWS Elastic Container Registry (ECR).</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">docker pull ubuntu:22.04</div>
                <div class="cmd-explain">
                    <strong>docker pull:</strong> Downloads an image from a registry to your local machine.<br>
                    <strong>ubuntu:</strong> The repository name.<br>
                    <strong>22.04:</strong> The <em>tag</em>. Tags specify exact versions. If you omit the tag, Docker defaults to <code>latest</code>.
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
                <div class="cmd-text">docker images</div>
                <div class="cmd-explain">
                    Lists all the Docker images currently downloaded on your local machine, showing their Repository, Tag, Image ID, Created time, and Size.
                </div>
            </div>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Always using the 'latest' tag:</strong>
                <div class="mistake-wrong">❌ FROM node:latest</div>
                <div class="mistake-right">✅ FROM node:18.16.0-alpine</div>
                <p>Using <code>latest</code> in production means your build could unexpectedly grab a major new version of Node.js tomorrow and break your app. Always pin to specific versions!</p>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What makes building Docker images fast after the first build?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Docker compresses the source code into a zip file.</div>
                <div class="quiz-option" data-correct="true">Docker uses a layered file system and caches unchanged layers.</div>
                <div class="quiz-option" data-correct="false">Docker skips installing dependencies entirely.</div>
            </div>
        </div>
    `
};
