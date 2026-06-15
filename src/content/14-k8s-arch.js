module.exports = {
    id: 'k8s-arch',
    title: '14. Kubernetes Architecture',
    group: 'Kubernetes Core',
    keywords: ['architecture', 'master node', 'worker node', 'kubelet', 'etcd', 'api server'],
    content: `
        <h1>Section 14: Kubernetes Architecture</h1>
        <p>A Kubernetes cluster consists of at least one Master Node (Control Plane) and multiple Worker Nodes. Let's break down the brain and the muscle of K8s.</p>
        
        <h2>The Big Picture</h2>

        <div class="arch-diagram" style="max-width: 800px; margin: 0 auto;">
            <div style="display: flex; justify-content: center; gap: 20px; width: 100%;">
                
                <!-- Master Node -->
                <div style="border: 2px solid var(--accent-primary); padding: 20px; border-radius: 8px; flex: 1; background: rgba(59, 130, 246, 0.05);">
                    <h3 style="text-align: center; margin-top: 0;">Control Plane (Master)</h3>
                    <p style="text-align: center; font-size: 0.8rem;">The Brains</p>
                    <div class="arch-node" data-info="info-api" style="margin-bottom: 10px; font-size: 0.9rem; padding: 10px;">API Server</div>
                    <div class="arch-node" data-info="info-etcd" style="margin-bottom: 10px; font-size: 0.9rem; padding: 10px;">etcd (Database)</div>
                    <div class="arch-node" data-info="info-sched" style="margin-bottom: 10px; font-size: 0.9rem; padding: 10px;">Scheduler</div>
                    <div class="arch-node" data-info="info-cm" style="font-size: 0.9rem; padding: 10px;">Controller Manager</div>
                </div>

                <!-- Worker Nodes -->
                <div style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
                    <div style="border: 2px solid var(--success); padding: 20px; border-radius: 8px; background: rgba(16, 185, 129, 0.05);">
                        <h3 style="text-align: center; margin-top: 0; color: var(--success);">Worker Node 1</h3>
                        <div class="arch-node" data-info="info-kubelet" style="margin-bottom: 10px; font-size: 0.9rem; padding: 10px; border-color: var(--success);">Kubelet</div>
                        <div class="arch-node" data-info="info-kubeproxy" style="margin-bottom: 10px; font-size: 0.9rem; padding: 10px; border-color: var(--success);">Kube-Proxy</div>
                        <div style="background: var(--bg-tertiary); padding: 10px; text-align: center; border-radius: 4px;">Pods (Containers)</div>
                    </div>
                    <div style="border: 2px solid var(--success); padding: 20px; border-radius: 8px; background: rgba(16, 185, 129, 0.05);">
                        <h3 style="text-align: center; margin-top: 0; color: var(--success);">Worker Node 2</h3>
                        <div style="background: var(--bg-tertiary); padding: 10px; text-align: center; border-radius: 4px; margin-top: 20px;">Pods (Containers)</div>
                    </div>
                </div>
            </div>

            <!-- Info Panels -->
            <div id="info-api" class="arch-info"><strong>API Server:</strong> The gateway. All communication goes through here. When you type <code>kubectl apply</code>, you are talking to the API Server.</div>
            <div id="info-etcd" class="arch-info"><strong>etcd:</strong> A highly-available key-value store. It is the absolute source of truth for the cluster. It stores the "Desired State" of everything.</div>
            <div id="info-sched" class="arch-info"><strong>Scheduler:</strong> Watches for newly created Pods that have no assigned node, and selects a node for them to run on based on resource requirements (CPU/RAM).</div>
            <div id="info-cm" class="arch-info"><strong>Controller Manager:</strong> Runs controller processes. E.g., the Node controller notices if a node goes down. The ReplicaSet controller ensures the correct number of pods are running.</div>
            <div id="info-kubelet" class="arch-info"><strong>Kubelet:</strong> An agent that runs on each node in the cluster. It ensures that containers are running in a Pod. It talks back to the API server.</div>
            <div id="info-kubeproxy" class="arch-info"><strong>Kube-Proxy:</strong> Maintains network rules on nodes. These rules allow network communication to your Pods from network sessions inside or outside of your cluster.</div>
        </div>

        <h2>How It All Works Together</h2>
        <p>If you tell K8s: <em>"Run 3 copies of my Node API"</em>:</p>
        <ol>
            <li>Your CLI sends the request to the <strong>API Server</strong>.</li>
            <li>The API Server saves this desired state in <strong>etcd</strong>.</li>
            <li>The <strong>Controller Manager</strong> sees the state is 3, but current is 0. It creates 3 new Pod objects.</li>
            <li>The <strong>Scheduler</strong> sees 3 unassigned Pods. It looks at the Worker Nodes' available CPU/RAM and assigns the Pods to specific Nodes.</li>
            <li>The <strong>Kubelet</strong> on the chosen Worker Nodes sees they have been assigned work. They talk to Docker (or containerd) to pull the image and start the containers.</li>
            <li><strong>Kube-Proxy</strong> updates networking rules so traffic can reach the new containers.</li>
        </ol>

        <div class="quiz-container">
            <div class="quiz-question">Which component is considered the "source of truth" and stores all cluster data and state?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">API Server</div>
                <div class="quiz-option" data-correct="true">etcd</div>
                <div class="quiz-option" data-correct="false">Kubelet</div>
            </div>
        </div>
    `
};
