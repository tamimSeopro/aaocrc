import { useEffect, useRef } from 'react';

interface AtomNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  symbol: 'C' | 'O' | 'N' | 'H';
  bgColor: string;
  borderColor: string;
  pulseAngle: number;
}

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export default function BackgroundAtoms() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize Big Atoms (C, O, N, H)
    const symbols: ('C' | 'O' | 'N' | 'H')[] = ['C', 'O', 'N', 'H'];
    const atoms: AtomNode[] = [];
    const atomCount = Math.floor(Math.max(12, Math.min(22, (width * height) / 75000)));

    for (let i = 0; i < atomCount; i++) {
      const sym = symbols[i % symbols.length];
      let bgColor = 'rgba(71, 85, 105, 0.35)'; // C: Slate
      let borderColor = '#94a3b8';

      if (sym === 'O') {
        bgColor = 'rgba(225, 29, 72, 0.3)'; // Rose
        borderColor = '#f43f5e';
      } else if (sym === 'N') {
        bgColor = 'rgba(37, 99, 235, 0.3)'; // Blue
        borderColor = '#60a5fa';
      } else if (sym === 'H') {
        bgColor = 'rgba(217, 119, 6, 0.3)'; // Amber
        borderColor = '#fbbf24';
      }

      atoms.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: 18 + Math.random() * 8,
        symbol: sym,
        bgColor,
        borderColor,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    // Initialize Tiny Particles (electrons / free radicals matching reddish/orange dots in screenshot)
    const particles: ParticleNode[] = [];
    const particleCount = Math.floor(Math.max(40, Math.min(90, (width * height) / 22000)));
    const particleColors = ['#f43f5e', '#fb7185', '#f59e0b', '#ef4444', '#f97316'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 1.8 + Math.random() * 2.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: 0.35 + Math.random() * 0.5,
      });
    }

    // Pointer coordinates tracking for dynamic mouse / finger touch bond animation
    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
      radius: 200, // Bond distance reach
    };

    const handleMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handleMouseLeave = () => {
      pointer.active = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
        pointer.active = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
        pointer.active = true;
      }
    };

    const handleTouchEnd = () => {
      pointer.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background dark navy gradient matching screenshot
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#070f1e');
      grad.addColorStop(0.5, '#0b192c');
      grad.addColorStop(1, '#081224');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw active pointer feedback visual overlay (concentric orbital rings simulating atom nuclei resonance)
      if (pointer.active) {
        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 45 + Math.sin(Date.now() / 150) * 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner reverse ring
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 18 + Math.cos(Date.now() / 200) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Core glow dot
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
      }

      // Update & Draw Connecting Bonds between Big Atoms
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const dx = atoms[i].x - atoms[j].x;
          const dy = atoms[i].y - atoms[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 260) {
            const alpha = (1 - dist / 260) * 0.38;
            ctx.beginPath();
            ctx.moveTo(atoms[i].x, atoms[i].y);
            ctx.lineTo(atoms[j].x, atoms[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`; // Amber glowing bond lines
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Live chemical bond tracking between Pointer (Mouse / Finger) and nearby Atoms
      if (pointer.active) {
        for (let i = 0; i < atoms.length; i++) {
          const dx = atoms[i].x - pointer.x;
          const dy = atoms[i].y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < pointer.radius) {
            const alpha = (1 - dist / pointer.radius) * 0.85;

            // Deep background thick neon glow bond
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(atoms[i].x, atoms[i].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.35})`;
            ctx.lineWidth = 4.5;
            ctx.stroke();

            // Center thin bright core line
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(atoms[i].x, atoms[i].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Interactive attraction force pulling the atom slightly towards the pointer
            const force = (pointer.radius - dist) / pointer.radius;
            const attractionPull = 0.85;
            atoms[i].x -= (dx / dist) * force * attractionPull;
            atoms[i].y -= (dy / dist) * force * attractionPull;
          }
        }
      }

      // Update & Draw Connecting Bonds for Tiny Particles
      for (let i = 0; i < particles.length; i++) {
        // Connect particle to nearby big atom
        for (let j = 0; j < atoms.length; j++) {
          const dx = particles[i].x - atoms[j].x;
          const dy = particles[i].y - atoms[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(atoms[j].x, atoms[j].y);
            ctx.strokeStyle = `rgba(244, 63, 94, ${alpha})`; // Rose line
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Pointer bonds for tiny particles too! (Adds a lovely dust-bond effect)
        if (pointer.active) {
          const dx = particles[i].x - pointer.x;
          const dy = particles[i].y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < pointer.radius - 60) {
            const alpha = (1 - dist / (pointer.radius - 60)) * 0.45;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.strokeStyle = `rgba(244, 63, 94, ${alpha * 0.5})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // Render Tiny Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Render Big Atoms with Concentric Glowing Rings
      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];
        a.x += a.vx;
        a.y += a.vy;
        a.pulseAngle += 0.025;

        // Bounce off screen boundaries
        if (a.x - a.radius < 0 || a.x + a.radius > width) a.vx *= -1;
        if (a.y - a.radius < 0 || a.y + a.radius > height) a.vy *= -1;

        // Draw Outer Concentric Glowing Ring 1
        const ring1Rad = a.radius + 7 + Math.sin(a.pulseAngle) * 3;
        ctx.beginPath();
        ctx.arc(a.x, a.y, ring1Rad, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.32)'; // Amber ring
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw Outer Concentric Glowing Ring 2 (some atoms)
        if (i % 2 === 0) {
          const ring2Rad = a.radius + 15 + Math.cos(a.pulseAngle * 0.8) * 4;
          ctx.beginPath();
          ctx.arc(a.x, a.y, ring2Rad, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw Main Atom Body Circle
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fillStyle = a.bgColor;
        ctx.fill();
        ctx.strokeStyle = a.borderColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Atom Symbol Text
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.floor(a.radius * 0.85)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(a.symbol, a.x, a.y);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
