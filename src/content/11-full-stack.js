module.exports = {
    id: 'full-stack',
    title: '11. Containerizing Full Stack Apps',
    group: 'Docker Core',
    keywords: ['full stack', 'frontend', 'backend', 'database', 'structure'],
    content: `
        <h1>Section 11: Containerizing Full Stack Applications</h1>
        <p>Let's put everything together. We will design the containerization strategy for a complete Full Stack Application.</p>
        
        <h2>Production Folder Structure</h2>
        <p>A standard mono-repo approach for a Dockerized application looks like this:</p>

        <pre><code class="language-plaintext">my-startup-app/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile      # Frontend specific Dockerfile
├── backend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile      # Backend specific Dockerfile
└── docker-compose.yml  # Ties everything together</code></pre>

        <h2>The Frontend Dockerfile (React/Vue/Angular)</h2>
        <p>In production, you don't run a development server. You compile to static files and serve them.</p>

        <pre><code class="language-dockerfile"># frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve static files
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Custom nginx configuration if you have client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>

        <h2>The Backend Dockerfile (Node.js API)</h2>
        <pre><code class="language-dockerfile"># backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>

        <h2>The Docker Compose File</h2>
        <p>This file orchestrates the build and run process for the entire stack.</p>

        <pre><code class="language-yaml"># docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=database
      - DB_USER=appuser
      - DB_PASS=secret
    depends_on:
      - database

  database:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=appuser
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=appdb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:</code></pre>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Running Webpack/Vite dev servers in production:</strong>
                <div class="mistake-wrong">❌ Using <code>CMD ["npm", "start"]</code> for a React app in production.</div>
                <div class="mistake-right">✅ Using a multi-stage build to compile static files and serve them via Nginx.</div>
                <p>Dev servers are slow, unoptimized, and have security vulnerabilities. Nginx is built for serving static files efficiently.</p>
            </div>
            <div class="mistake-item">
                <strong>Frontend trying to reach 'backend' via Docker DNS:</strong>
                <div class="mistake-wrong">❌ React making fetch calls to <code>http://backend:3000/api</code></div>
                <p>This will fail! The frontend runs in the <em>User's Browser</em>, not inside the Docker network. The browser doesn't know what "backend" is. The React app must make fetch calls to a public IP/Domain (e.g., <code>http://localhost:3000/api</code> in dev, or <code>https://api.myapp.com</code> in prod).</p>
            </div>
        </div>
    `
};
