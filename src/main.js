/* ===========================
   MAIN JAVASCRIPT
   Author: Ashith Jain B N
=========================== */

"use strict";

// ── Cursor ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let fx = mx, fy = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .tilt-card, .tech-badge').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    follower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    follower.classList.remove('hover');
  });
});

// ── Particle Canvas ─────────────────────────────────────
(function setupParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 120;
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    o: Math.random() * 0.5 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167,139,250,${p.o})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    });

    // Draw connecting lines nearby
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Navbar Scroll ────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile Nav Toggle ────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ── Typewriter ────────────────────────────────────────────
(function typewriter() {
  const words = [
    'beautiful web apps.',
    'stunning UI/UX.',
    'creative designs.',
    'scalable systems.',
    'digital experiences.',
  ];
  let wi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typewriter');

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; return setTimeout(tick, 1800); }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 55 : 95);
  }
  tick();
})();

// ── Scroll-reveal ─────────────────────────────────────────
(function setupReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseFloat(el.style.getPropertyValue('--delay')) || (i * 0.05);
        setTimeout(() => el.classList.add('revealed'), delay * 1000);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
})();

// ── Skill Bar Animation ───────────────────────────────────
(function setupSkillBars() {
  const barFills = document.querySelectorAll('.bar-fill');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.width + '%';
        io.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  barFills.forEach(el => io.observe(el));
})();

// ── Counter Animation ─────────────────────────────────────
(function setupCounters() {
  const nums = document.querySelectorAll('.stat-number');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current  = 0;
        const step   = Math.ceil(target / 30);
        const t      = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(t);
        }, 50);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(el => io.observe(el));
})();

// ── 3D Tilt Cards ─────────────────────────────────────────
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) *  8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s';
  });
});

// ── Toast System ──────────────────────────────────────────
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove after 4s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ── Contact Form (Actual Email Sending via Web3Forms) ────────
window.handleFormSubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  
  if (btn.disabled) return;

  // Capture form data
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Disable button and show loading state
  btn.disabled = true;
  const originalBtnContent = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  formData.append("access_key", "ec249936-fd3a-4092-bb0b-ff5693abc207");

  try {
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: json
    });

    const result = await response.json();

    if (result.success) {
      // Success state
      btn.classList.add('btn-success');
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      showToast('Message sent successfully! I will get back to you soon.');
      form.reset();
      
      setTimeout(() => {
        btn.disabled = false;
        btn.classList.remove('btn-success');
        btn.innerHTML = originalBtnContent;
      }, 5000);
    } else {
      // API error state
      throw new Error(result.message || 'Submission failed');
    }
  } catch (error) {
    // Network or API error state
    console.error("Submission error:", error);
    
    btn.classList.add('btn-error');
    btn.innerHTML = '<i class="fas fa-wifi"></i> Connection Error';
    
    showToast('Failed to send via API. Opening email client...', 'error');
    
    // Fallback: Open mailto after a short delay
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-envelope"></i> Opening Email...';
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:ashithjainbn@gmail.com?subject=${subject}&body=${body}`;
      
      // Reset button
      setTimeout(() => {
        btn.disabled = false;
        btn.classList.remove('btn-error');
        btn.innerHTML = originalBtnContent;
      }, 2000);
    }, 1500);
  }
};
