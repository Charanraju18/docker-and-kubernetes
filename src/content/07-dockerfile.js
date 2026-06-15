module.exports = {
    id: 'dockerfile',
    title: '7. Dockerfile Deep Dive',
    group: 'Docker Core',
    keywords: ['dockerfile', 'from', 'run', 'copy', 'cmd', 'node', 'react', 'python'],
    content: `
        <h1>Section 7: Dockerfile Deep Dive</h1>
        <p>A Dockerfile is the DNA of your image. Let's break down the most important instructions and write production-ready Dockerfiles.</p>
        
        <h2>Core Instructions</h2>
        <div class="glass-panel">
            <ul>
                <li><code>FROM &lt;image&gt;</code>: Defines the base image. Must be the first instruction.</li>
                <li><code>WORKDIR &lt;path&gt;</code>: Sets the working directory inside the container for subsequent commands.</li>
                <li><code>COPY &lt;src&gt; &lt;dest&gt;</code>: Copies files from your local machine into the container.</li>
                <li><code>RUN &lt;command&gt;</code>: Executes a command <em>during the build process</em> (e.g., npm install). Creates a new layer.</li>
                <li><code>ENV &lt;key&gt;=&lt;value&gt;</code>: Sets environment variables.</li>
                <li><code>EXPOSE &lt;port&gt;</code>: Documents which port the container listens on (does not actually publish the port).</li>
                <li><code>CMD ["exec", "param1"]</code>: The default command to run <em>when the container starts</em>.</li>
            </ul>
        </div>

        <h2>Example: Node.js API</h2>
        <p>Here is a standard, optimized Dockerfile for a Node.js Backend.</p>

        <pre><code class="language-dockerfile"># 1. Use an official, lightweight Node.js image
FROM node:18-alpine

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json FIRST
# This leverages Docker's layer caching so 'npm install' 
# is only re-run if dependencies change.
COPY package*.json ./

# 4. Install production dependencies
RUN npm ci --only=production

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the API port
EXPOSE 3000

# 7. Define the startup command
CMD ["node", "index.js"]</code></pre>

        <h2>Example: React / Next.js</h2>
        <p>Modern frontend apps often use a <em>Multi-stage Build</em>. We build the app in one image, and then copy only the compiled static files to a tiny Nginx image for serving.</p>

        <pre><code class="language-dockerfile"># --- Stage 1: Build the React App ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine
# Copy the build output from the 'builder' stage
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Copying all code before running npm install:</strong>
                <div class="mistake-wrong">
❌ COPY . .<br>
❌ RUN npm install
                </div>
                <div class="mistake-right">
✅ COPY package.json .<br>
✅ RUN npm install<br>
✅ COPY . .
                </div>
                <p>If you copy all code first, any change to your source code (like editing a single console.log) invalidates the cache for the RUN npm install layer, causing a slow dependency download on every single build.</p>
            </div>
            <div class="mistake-item">
                <strong>Running as Root:</strong>
                <div class="mistake-wrong">❌ Not specifying a user, running the app as root.</div>
                <div class="mistake-right">✅ USER node (Switch to a non-root user for security).</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What is the difference between RUN and CMD?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">RUN is used for Windows, CMD is for Linux.</div>
                <div class="quiz-option" data-correct="true">RUN executes during the image build process; CMD provides the default command that executes when the container starts.</div>
                <div class="quiz-option" data-correct="false">They are exact synonyms and can be used interchangeably.</div>
            </div>
        </div>
    `
};
