module.exports = {
    id: 'docker-compose',
    title: '10. Docker Compose',
    group: 'Docker Core',
    keywords: ['docker compose', 'yaml', 'multi-container', 'services'],
    content: `
        <h1>Section 10: Docker Compose</h1>
        <p>Running a single container is easy. But what if your app requires a Node.js API, a React Frontend, a PostgreSQL Database, and a Redis Cache? Running 4 <code>docker run</code> commands with massive network and volume flags is tedious.</p>
        <p><strong>Docker Compose</strong> solves this. It allows you to define a multi-container application in a single YAML file and start everything with one command.</p>
        
        <h2>The docker-compose.yml File</h2>
        <p>Compose files define <em>Services</em> (containers), <em>Networks</em>, and <em>Volumes</em>.</p>

        <pre><code class="language-yaml">version: '3.8'

services:
  # 1. The Database Service
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # 2. The Cache Service
  redis:
    image: redis:alpine

  # 3. The Backend API Service
  api:
    build: 
      context: ./backend    # Path to the directory with the Dockerfile
    environment:
      DATABASE_URL: postgres://admin:secretpassword@db:5432/mydb
      REDIS_URL: redis://redis:6379
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis

# Define named volumes at the bottom
volumes:
  pgdata:
</code></pre>

        <h2>What Happens Under the Hood?</h2>
        <p>When you run <code>docker-compose up -d</code> with the file above, Docker Compose automatically:</p>
        <ol>
            <li>Creates a custom bridge network for this project.</li>
            <li>Creates the <code>pgdata</code> volume.</li>
            <li>Builds the image for the <code>api</code> service.</li>
            <li>Pulls the <code>postgres</code> and <code>redis</code> images.</li>
            <li>Starts the <code>db</code> and <code>redis</code> containers first (due to <code>depends_on</code>).</li>
            <li>Starts the <code>api</code> container.</li>
        </ol>
        <p>The <code>api</code> container can instantly talk to the database using the hostname <code>db</code> because they are on the same automatically created bridge network.</p>

        <div class="command-playground">
            <div class="cmd-header">
                <div class="cmd-dots"><span class="dot-1"></span><span class="dot-2"></span><span class="dot-3"></span></div>
                <div class="cmd-actions">
                    <button class="cmd-explain-btn">Explanation</button>
                    <button class="cmd-copy-btn">Copy</button>
                </div>
            </div>
            <div class="cmd-body">
                <div class="cmd-text">docker-compose up -d --build</div>
                <div class="cmd-explain">
                    <strong>up:</strong> Creates and starts containers.<br>
                    <strong>-d:</strong> Detached mode.<br>
                    <strong>--build:</strong> Forces Docker Compose to rebuild images before starting (crucial if you changed your source code).
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
                <div class="cmd-text">docker-compose down -v</div>
                <div class="cmd-explain">
                    <strong>down:</strong> Stops and removes the containers and networks.<br>
                    <strong>-v:</strong> Also destroys the named volumes! (Be careful, this wipes your database).
                </div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">In Docker Compose, how do services communicate with each other?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">By hardcoding public IP addresses.</div>
                <div class="quiz-option" data-correct="true">Using their service names as hostnames over the automatically created bridge network.</div>
                <div class="quiz-option" data-correct="false">They cannot communicate; they are completely isolated.</div>
            </div>
        </div>
    `
};
