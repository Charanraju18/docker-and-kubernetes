module.exports = {
    id: 'k8s-volumes',
    title: '20. Persistent Volumes',
    group: 'Kubernetes Core',
    keywords: ['pv', 'pvc', 'storage class', 'persistent volume', 'stateful'],
    content: `
        <h1>Section 20: Persistent Volumes</h1>
        <p>In Docker, we used Named Volumes to persist database data. In Kubernetes, managing storage is much more complex because your Pod could be destroyed on Worker Node 1 and recreated on Worker Node 2. The new Pod needs to be able to access the exact same data on the new node.</p>
        
        <h2>The Storage Abstraction Layer</h2>
        <p>Kubernetes solves this with three distinct resources:</p>

        <div class="arch-diagram">
            <div class="arch-node" style="border-color: var(--accent-primary)">1. StorageClass<br><small>The "Type" of storage (e.g., AWS EBS SSD)</small></div>
            <div class="arch-arrow">↓ Provisions ↓</div>
            <div class="arch-node">2. Persistent Volume (PV)<br><small>The actual physical hard drive</small></div>
            <div class="arch-arrow">↑ Claims ↑</div>
            <div class="arch-node" style="border-color: var(--warning)">3. Persistent Volume Claim (PVC)<br><small>The ticket requesting a specific size</small></div>
            <div class="arch-arrow">↑ Mounts ↑</div>
            <div class="arch-node" style="border-color: var(--success)">4. Pod<br><small>Uses the PVC as a volume</small></div>
        </div>

        <h3>1. StorageClass</h3>
        <p>A StorageClass provides a way for administrators to describe the "classes" of storage they offer. For example, in AWS, you might have a <code>gp3</code> class for fast SSDs, and an <code>st1</code> class for cheap, slow HDDs.</p>

        <h3>2. Persistent Volume (PV)</h3>
        <p>A PV is a piece of actual storage in the cluster that has been provisioned by an administrator, or dynamically provisioned using a StorageClass. It is a resource in the cluster just like a node is a cluster resource. PVs have a lifecycle independent of any individual Pod.</p>

        <h3>3. Persistent Volume Claim (PVC)</h3>
        <p>A PVC is a request for storage by a user (the developer). It says: <em>"I need a 10GB disk from the 'fast-ssd' StorageClass."</em> K8s will find a matching PV (or provision a new one dynamically) and bind it to this PVC.</p>

        <h2>Defining Storage in YAML</h2>

        <pre><code class="language-yaml"># 1. The Claim (PVC)
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce    # Only one node can mount it for read/write at a time
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard

---
# 2. The Pod using the Claim
apiVersion: v1
kind: Pod
metadata:
  name: postgres-pod
spec:
  containers:
    - name: postgres
      image: postgres:15
      volumeMounts:
        - mountPath: "/var/lib/postgresql/data"
          name: db-storage
  volumes:
    - name: db-storage
      persistentVolumeClaim:
        claimName: postgres-pvc</code></pre>

        <div class="mistakes-block">
            <h3>Common Mistakes</h3>
            <div class="mistake-item">
                <strong>ReadWriteMany confusion:</strong>
                <div class="mistake-wrong">❌ Trying to use AWS EBS (Elastic Block Store) with <code>accessModes: ReadWriteMany</code> so multiple Pods on different nodes can write to the database.</div>
                <div class="mistake-right">✅ Most standard cloud block storage only supports <code>ReadWriteOnce</code> (can only be attached to ONE node at a time). For ReadWriteMany, you need network file systems like NFS or AWS EFS. Furthermore, you generally should not have multiple database pods writing to the same raw disk files!</div>
            </div>
            <div class="mistake-item">
                <strong>StatefulSets vs Deployments:</strong>
                <div class="mistake-wrong">❌ Using a Deployment to scale a Database to 3 replicas. They will all try to mount the same PVC and corrupt the data.</div>
                <div class="mistake-right">✅ Use a <strong>StatefulSet</strong> for databases. It automatically generates a unique PVC for each individual replica!</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">Which Kubernetes object acts as a "request ticket" asking the cluster for a specific amount of storage?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Persistent Volume (PV)</div>
                <div class="quiz-option" data-correct="true">Persistent Volume Claim (PVC)</div>
                <div class="quiz-option" data-correct="false">StorageClass</div>
            </div>
        </div>
    `
};
