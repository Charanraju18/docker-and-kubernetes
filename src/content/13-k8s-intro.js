module.exports = {
    id: 'k8s-intro',
    title: '13. Introduction to Kubernetes',
    group: 'Kubernetes Core',
    keywords: ['kubernetes', 'k8s', 'orchestration', 'scaling', 'management'],
    content: `
        <h1>Section 13: Introduction to Kubernetes</h1>
        <p>You know how to containerize an application. You know how to run it on a server. But what happens when your application becomes wildly successful?</p>
        
        <h2>The Problem: Managing 100+ Containers</h2>
        <p>Imagine you have 5 backend servers, 3 frontend servers, and a clustered database. That's dozens of containers.</p>
        <ul>
            <li>If Server #2 crashes, who restarts those containers on Server #4?</li>
            <li>If Black Friday traffic hits, who spins up 50 new frontend containers instantly?</li>
            <li>How do you update the backend API to v2.0 without bringing the system down (Zero-Downtime Deployment)?</li>
            <li>How do containers on Server #1 talk securely to containers on Server #5?</li>
        </ul>
        <p>Doing this manually with shell scripts or plain Docker Compose is a <strong>Management Nightmare</strong>.</p>

        <div class="glass-panel">
            <h3>💡 Real-world Analogy: The Orchestra</h3>
            <p><strong>Containers</strong> are the individual musicians (violinist, cellist, trumpeter). Each knows how to play their instrument perfectly.</p>
            <p><strong>Kubernetes</strong> is the <strong>Conductor</strong>. The conductor doesn't play the instruments. Instead, they ensure everyone plays together, at the right tempo, steps in if someone misses a beat, and ensures the final symphony (your application) is flawless.</p>
        </div>

        <h2>What is Kubernetes (K8s)?</h2>
        <p>Kubernetes (often abbreviated as K8s, because there are 8 letters between K and s) is an open-source <strong>Container Orchestration Platform</strong> originally developed by Google (who had been managing billions of containers a week using an internal system called Borg).</p>
        <p>It automates the deployment, scaling, and management of containerized applications across a cluster of servers.</p>

        <h2>Declarative Management</h2>
        <p>The biggest mind-shift from plain Docker to Kubernetes is moving from <em>Imperative</em> to <em>Declarative</em> management.</p>
        <ul>
            <li><strong>Imperative (Docker CLI):</strong> You tell the system <em>how</em> to do it. "Docker, run this container. Now run another one. Now attach this network."</li>
            <li><strong>Declarative (Kubernetes):</strong> You tell the system <em>what you want</em>. "Kubernetes, I want 5 copies of my Node.js API running at all times." Kubernetes constantly monitors the state. If one dies, K8s notices you only have 4, compares it to your desired state of 5, and automatically creates a new one to fix the discrepancy.</li>
        </ul>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>Using K8s too early:</strong>
                <div class="mistake-wrong">❌ "I'm building a simple personal blog, I should deploy it on a Kubernetes cluster."</div>
                <div class="mistake-right">✅ "I will use a simple PaaS or a single Docker server. I will adopt K8s when I actually need high availability and horizontal scaling."</div>
                <p>Kubernetes is incredibly powerful, but it introduces significant complexity and infrastructure cost. Don't use a sledgehammer to crack a nut.</p>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">What does "Declarative Management" mean in the context of Kubernetes?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">You write bash scripts detailing the exact sequence of commands to run containers.</div>
                <div class="quiz-option" data-correct="true">You define the desired state of your application, and K8s automatically works to match reality to that state.</div>
                <div class="quiz-option" data-correct="false">You must manually declare to the master node whenever a worker node crashes.</div>
            </div>
        </div>
    `
};
