document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to fill the section
    function resizeCanvas() {
        canvas.width = homeSection.offsetWidth;
        canvas.height = homeSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Add canvas to home section
    canvas.classList.add('network-animation');
    homeSection.insertBefore(canvas, homeSection.firstChild);
    
    // Animation variables
    let nodes = [];
    let mouseX = 0;
    let mouseY = 0;
    const nodeCount = 250;
    const connectionDistance = 150;
    const nodeSize = 4;
    
    // Create initial nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            connections: []
        });
    }
    
    // Track mouse movement
    homeSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
            // Move nodes
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off walls
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Mouse interaction
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                node.x += dx * 0.01;
                node.y += dy * 0.01;
            }
            
            // Draw connections
            nodes.forEach((otherNode, j) => {
                if (i === j) return;
                
                const dx = otherNode.x - node.x;
                const dy = otherNode.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(17, 24, 39, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.stroke();
                    
                    // Animate data transfer
                    if (Math.random() < 0.01) {
                        const particleCount = 3;
                        for (let k = 0; k < particleCount; k++) {
                            const progress = k / particleCount;
                            const particleX = node.x + dx * progress;
                            const particleY = node.y + dy * progress;
                            
                            ctx.beginPath();
                            ctx.fillStyle = `rgba(17, 24, 39, ${opacity * 0.5})`;
                            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }
            });
            
            // Draw node
            ctx.beginPath();
            ctx.fillStyle = 'rgb(17, 24, 39)';
            ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}); 