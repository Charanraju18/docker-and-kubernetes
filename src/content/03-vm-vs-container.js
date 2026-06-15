module.exports = {
    id: 'vm-vs-container',
    title: '3. VMs vs Containers',
    group: 'Docker Core',
    keywords: ['virtual machine', 'hypervisor', 'guest os', 'performance'],
    content: `
        <h1>Section 3: Virtual Machines vs Containers</h1>
        <p>Before containers, the industry standard for isolating applications was the Virtual Machine (VM). To truly appreciate Docker, we must compare it to VMs.</p>
        
        <h2>Virtual Machines (VMs)</h2>
        <p>A Virtual Machine runs a complete, separate operating system (Guest OS) on top of your physical machine's OS (Host OS). This is made possible by a piece of software called a <strong>Hypervisor</strong> (like VMware, VirtualBox, or Hyper-V).</p>
        
        <ul>
            <li><strong>Heavyweight:</strong> Each VM has its own full OS (Windows, Linux, etc.), taking up GBs of disk space.</li>
            <li><strong>Slow Boot:</strong> Starting a VM takes minutes because an entire OS has to boot up.</li>
            <li><strong>Resource Hog:</strong> A VM reserves a fixed amount of RAM and CPU, even if the application inside isn't using it.</li>
        </ul>

        <h2>Containers</h2>
        <p>Containers are an abstraction at the app layer that packages code and dependencies together. Multiple containers can run on the same machine and share the <strong>same OS kernel</strong> with other containers, each running as isolated processes.</p>
        
        <ul>
            <li><strong>Lightweight:</strong> Containers share the host kernel. They only include the app and its libraries, taking up MBs instead of GBs.</li>
            <li><strong>Fast Boot:</strong> Starting a container is almost instant (milliseconds) because there is no OS to boot; it's just a process starting.</li>
            <li><strong>Resource Efficient:</strong> Containers consume only the resources they need at that exact moment.</li>
        </ul>

        <div class="arch-diagram" style="flex-direction: row; justify-content: space-around; flex-wrap: wrap;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h3>Virtual Machine Architecture</h3>
                <div style="border: 2px solid var(--border-color); padding: 10px; background: var(--bg-primary); border-radius: 8px;">
                    <div style="background: var(--bg-tertiary); padding: 10px; margin-bottom: 5px;">App 1 + Bins/Libs</div>
                    <div style="background: var(--warning); padding: 10px; margin-bottom: 5px; color: black;">Guest OS (GBs)</div>
                    <div style="background: var(--bg-tertiary); padding: 10px; margin-bottom: 5px;">Hypervisor</div>
                    <div style="background: var(--bg-secondary); padding: 10px; margin-bottom: 5px;">Host OS</div>
                    <div style="background: var(--code-bg); color: white; padding: 10px;">Server Hardware</div>
                </div>
            </div>

            <div style="text-align: center; margin-bottom: 20px;">
                <h3>Container Architecture</h3>
                <div style="border: 2px solid var(--accent-primary); padding: 10px; background: var(--bg-primary); border-radius: 8px;">
                    <div style="background: var(--bg-tertiary); padding: 10px; margin-bottom: 5px;">App 1 + Bins/Libs</div>
                    <div style="background: var(--success); padding: 10px; margin-bottom: 5px; color: white;">Docker Engine (MBs)</div>
                    <div style="background: var(--bg-secondary); padding: 10px; margin-bottom: 5px;">Host OS</div>
                    <div style="background: var(--code-bg); color: white; padding: 10px;">Server Hardware</div>
                </div>
            </div>
        </div>

        <div class="glass-panel">
            <h3>💡 Real-world Analogy: Houses vs. Apartments</h3>
            <p><strong>Virtual Machines are like Houses:</strong> Each house has its own plumbing, electricity, foundation, and roof (Guest OS). It's fully isolated but takes a lot of space and materials to build.</p>
            <p><strong>Containers are like Apartments in a High-rise:</strong> All apartments share the building's core infrastructure—plumbing, electricity, and foundation (Host OS Kernel). But each apartment has its own door and lock, providing isolation for the residents (Apps) inside, making much better use of the available space.</p>
        </div>

        <div class="quiz-container">
            <div class="quiz-question">Why do Docker containers start so much faster than Virtual Machines?</div>
            <div class="quiz-options">
                <div class="quiz-option" data-correct="false">Because Docker is written in Go, which is faster than C.</div>
                <div class="quiz-option" data-correct="true">Because containers share the host OS kernel and don't have to boot an entire Guest OS.</div>
                <div class="quiz-option" data-correct="false">Because containers don't use RAM.</div>
            </div>
        </div>
    `
};
