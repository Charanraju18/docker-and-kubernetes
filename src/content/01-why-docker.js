module.exports = {
    id: 'docker-why',
    title: '1. Why Docker Exists',
    group: 'Docker Core',
    keywords: ['problem', 'works on my machine', 'environment inconsistency', 'dependency conflicts'],
    content: `
        <h1>Section 1: Why Docker Exists</h1>
        <p>Before we dive into the technical details of <em>what</em> Docker is, we need to understand <em>why</em> the software industry desperately needed it.</p>
        
        <h2>The "Works on My Machine" Problem</h2>
        <p>Imagine you are a Node.js developer. You write a brilliant application on your shiny MacBook. It uses Node.js version 18, a specific version of Redis, and some environment variables.</p>
        <p>You send your code to the QA tester, or you try to deploy it to a production Linux server. Suddenly... it crashes.</p>
        
        <div class="arch-diagram">
            <div class="arch-node">Developer's Laptop<br><small>(Mac, Node v18, Redis v6)</small></div>
            <div class="arch-arrow">↓ <em>Code Transfer</em> ↓</div>
            <div class="arch-node" style="border-color: var(--danger)">Production Server<br><small>(Linux, Node v14, No Redis)</small></div>
            <div class="arch-arrow" style="color: var(--danger)">💥 DISASTER! APP CRASHES 💥</div>
        </div>

        <h3>Why did it crash?</h3>
        <ul>
            <li><strong>Environment Inconsistency:</strong> The server had an older version of Node.js.</li>
            <li><strong>Missing Dependencies:</strong> The server didn't have Redis installed.</li>
            <li><strong>OS Differences:</strong> File paths on Mac differ from those on Linux.</li>
        </ul>

        <h2>The Matrix of Hell</h2>
        <p>As applications grew complex, a single app might need a Frontend (React), a Backend (Node), a Database (Postgres), a Cache (Redis), and a Message Broker (RabbitMQ). Installing and configuring all of these manually on every developer's machine and every server is a nightmare called <em>The Matrix of Hell</em>.</p>

        <div class="glass-panel">
            <h3>💡 Real-world Analogy: The Shipping Industry</h3>
            <p>Before the 1950s, shipping goods was chaotic. You had sacks of coffee, barrels of wine, and boxes of electronics. Loading them onto ships, trucks, and trains required different handling for every item. It was slow and prone to damage.</p>
            <p>Then, the <strong>Shipping Container</strong> was invented. A standard steel box. Now, you just pack your goods into the container. Cranes, trucks, and ships don't care what's <em>inside</em> the container; they only care about how to move the standard box.</p>
            <p><strong>Docker is the shipping container for software.</strong></p>
        </div>

        <h2>With Docker: The Solution</h2>
        <p>Instead of just sending your code, you package your code <strong>along with its entire environment</strong> (Node.js, Redis, libraries, OS dependencies) into a standard software container.</p>

        <div class="arch-diagram">
            <div class="arch-node">Developer</div>
            <div class="arch-arrow">↓ Packages into ↓</div>
            <div class="arch-node" style="border-color: var(--success)">Docker Container<br><small>(Code + Node v18 + Redis)</small></div>
            <div class="arch-arrow">↓ Runs on ↓</div>
            <div class="arch-node">Any Server with Docker</div>
            <div class="arch-arrow" style="color: var(--success)">✅ WORKS EVERYWHERE ✅</div>
        </div>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Assuming servers match your laptop:</strong>
                <div class="mistake-wrong">❌ "It worked on my Mac, so I'll just git pull and npm install on the server."</div>
                <div class="mistake-right">✅ "I will containerize it so the environment is identical."</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What primary problem does Docker solve?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Making JavaScript code run faster in the browser.</div>
                <div class="quiz-option" data-correct="true">Environment inconsistency ("Works on my machine" problem).</div>
                <div class="quiz-option" data-correct="false">Replacing Git for version control.</div>
            </div>
        </div>
    `
};
