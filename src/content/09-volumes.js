module.exports = {
    id: 'docker-volumes',
    title: '9. Docker Volumes',
    group: 'Docker Core',
    keywords: ['volume', 'bind mount', 'persistence', 'data', 'storage'],
    content: `
        <h1>Section 9: Docker Volumes</h1>
        <p>By default, containers are ephemeral. If you delete a database container, all the data written to it is destroyed forever. Volumes solve the problem of persistent storage.</p>
        
        <h2>The Data Problem</h2>
        <p>If a PostgreSQL container writes data to its internal <code>/var/lib/postgresql/data</code> directory, that data lives in the container's temporary read-write layer. When the container stops and is removed, the data is gone.</p>

        <h2>Types of Mounts</h2>

        <h3>1. Named Volumes (Best Practice)</h3>
        <p>Volumes are entirely managed by Docker. Docker creates a directory on the host machine, but you don't need to worry about exactly where it is. Volumes survive container deletion.</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">docker run -d -v pgdata:/var/lib/postgresql/data postgres</div>
                <div class="cmd-explain">
                    <strong>-v pgdata:/var... :</strong> Tells Docker to create a named volume called <code>pgdata</code> and mount it to the directory inside the container where Postgres saves data. If the container is destroyed and you run a new one using the same <code>pgdata</code> volume, your data will still be there!
                </div>
            </div>
        </div>

        <h3>2. Bind Mounts</h3>
        <p>A bind mount maps a specific, absolute path on your host machine to a path in the container. This is very popular for local development because it allows you to sync your source code live into the container.</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">docker run -d -v $(pwd)/src:/app/src node-api</div>
                <div class="cmd-explain">
                    <strong>-v $(pwd)/src:/app/src:</strong> Maps your local <code>./src</code> folder directly into the container's <code>/app/src</code> folder. When you edit a file in your IDE, the container sees the change immediately (great for Nodemon/Hot Reloading).
                </div>
            </div>
        </div>

        <div class="glass-panel">
            <h3>💡 Rule of Thumb</h3>
            <ul>
                <li><strong>Databases / Stateful Data:</strong> Use Named Volumes. Let Docker manage it safely.</li>
                <li><strong>Local Development Code:</strong> Use Bind Mounts. You want to see your code edits live.</li>
            </ul>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Missing volumes for databases:</strong>
                <div class="mistake-wrong">❌ Running a database container without the <code>-v</code> flag in production.</div>
                <div class="mistake-right">✅ Always mount a volume to the database's data directory.</div>
                <p>Without a volume, a container restart or crash will wipe your entire production database.</p>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">Which storage type should you use to share your live source code edits from your IDE into a running container?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Named Volume</div>
                <div class="quiz-option" data-correct="true">Bind Mount</div>
                <div class="quiz-option" data-correct="false">Copying files manually via docker cp</div>
            </div>
        </div>
    `
};
