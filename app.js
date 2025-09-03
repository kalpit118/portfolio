// Navigation icon click scroll functionality
document.querySelector('.ic-home')?.addEventListener('click', () => {
	const home = document.querySelector('.home-body');
	if (home) {
		home.scrollIntoView({ behavior: 'smooth' });
	}
});
document.querySelector('.ic-projects')?.addEventListener('click', () => {
	const projects = document.getElementById('projects');
	if (projects) {
		projects.scrollIntoView({ behavior: 'smooth' });
	}
});
document.querySelector('.ic-about')?.addEventListener('click', () => {
	const about = document.getElementById('about');
	if (about) {
		about.scrollIntoView({ behavior: 'smooth' });
	}
});
// Highlight nav icon based on scroll position
function updateActiveNav() {
	const home = document.querySelector('.home-body');
	const projects = document.getElementById('projects');
	const about = document.getElementById('about');
	const navHome = document.querySelector('.ic-home');
	const navProjects = document.querySelector('.ic-projects');
	const navAbout = document.querySelector('.ic-about');
	let scrollY = window.scrollY || window.pageYOffset;
	let winH = window.innerHeight;
	// Remove all active
	[navHome, navProjects, navAbout].forEach(el => el && el.classList.remove('active'));
	if (about && scrollY + winH/2 >= about.offsetTop) {
		navAbout && navAbout.classList.add('active');
	} else if (projects && scrollY + winH/2 >= projects.offsetTop) {
		navProjects && navProjects.classList.add('active');
	} else {
		navHome && navHome.classList.add('active');
	}
}
window.addEventListener('scroll', updateActiveNav);
document.addEventListener('DOMContentLoaded', updateActiveNav);
// Rotating subtitle effect
const roles = ["Full Stack Web Developer", "UI/UX Designer", "DevOps", "Blockchain Learner"];
let roleIndex = 0;
const roleEl = document.getElementById('rotating-role');
function rotateRole() {
	if (!roleEl) return;
	roleEl.classList.remove('rotate-in');
	roleEl.classList.add('rotate-out');
	setTimeout(() => {
		roleIndex = (roleIndex + 1) % roles.length;
		roleEl.textContent = roles[roleIndex];
		roleEl.classList.remove('rotate-out');
		roleEl.classList.add('rotate-in');
	}, 600);
}
setInterval(rotateRole, 2000);
if (roleEl) roleEl.classList.add('rotate-in');
// Minimal Fancy Cursor Pointer
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

window.addEventListener('mousemove', e => {
	cursor.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
});
// Live AMOLED gradient background with animated orb
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Orb properties
let orb = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	r: Math.min(canvas.width, canvas.height) * 0.18,
	color: [180], // initial hue
};

// Simple pseudo-Perlin noise for watery motion
let t = Math.random() * 1000;
function wateryMotion() {
	t += 0.008;
	// Use sine and cosine for smooth, organic movement
	let x = canvas.width / 2 + Math.sin(t * 0.7) * canvas.width * 0.22 + Math.cos(t * 1.3) * canvas.width * 0.12;
	let y = canvas.height / 2 + Math.cos(t * 0.5) * canvas.height * 0.18 + Math.sin(t * 1.1) * canvas.height * 0.09;
	orb.x = x;
	orb.y = y;
	// Color hue also flows
	orb.color[0] = 180 + Math.sin(t * 0.6) * 120;
}

function animateOrb() {
	wateryMotion();
}

function drawBackground() {
	// AMOLED black base
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Blurred orb gradient overlay
	let grad = ctx.createRadialGradient(
		orb.x, orb.y, 0,
		orb.x, orb.y, orb.r * 1.4
	);
	let orbColor = `hsla(${orb.color[0]}, 80%, 60%, 0.55)`;
	grad.addColorStop(0, orbColor);
	grad.addColorStop(0.25, `hsla(${orb.color[0]}, 80%, 60%, 0.25)`);
	grad.addColorStop(0.55, 'rgba(80,0,120,0.10)');
	grad.addColorStop(0.85, 'rgba(0,0,0,0.01)');
	grad.addColorStop(1, 'rgba(0,0,0,0)');
	ctx.globalCompositeOperation = 'lighter';
	ctx.beginPath();
	ctx.arc(orb.x, orb.y, orb.r * 1.4, 0, Math.PI * 2);
	ctx.fillStyle = grad;
	ctx.shadowColor = orbColor;
	ctx.shadowBlur = orb.r * 0.7;
	ctx.fill();
	ctx.shadowBlur = 0;
	ctx.globalCompositeOperation = 'source-over';

	// Subtle secondary gradients
	// Animate blue and red patch alpha for glow effect
	if (!window._patchGlow) window._patchGlow = { t: 0 };
	window._patchGlow.t += 0.008;
	let blueAlpha = 0.08 + 0.09 * (0.5 + 0.5 * Math.sin(window._patchGlow.t * 0.7));
	let redAlpha = 0.06 + 0.08 * (0.5 + 0.5 * Math.sin(window._patchGlow.t * 0.5 + 2));

	let grad2 = ctx.createRadialGradient(
		canvas.width * 0.2, canvas.height * 0.2, 0,
		canvas.width * 0.2, canvas.height * 0.2, canvas.width * 0.5
	);
	grad2.addColorStop(0, `rgba(120,60,255,${blueAlpha})`);
	grad2.addColorStop(1, 'rgba(0,0,0,0)');
	ctx.fillStyle = grad2;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	let grad3 = ctx.createRadialGradient(
		canvas.width * 0.8, canvas.height * 0.7, 0,
		canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.4
	);
	grad3.addColorStop(0, `rgba(255,60,120,${redAlpha})`);
	grad3.addColorStop(1, 'rgba(0,0,0,0)');
	ctx.fillStyle = grad3;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function loop() {
	animateOrb();
	drawBackground();
	requestAnimationFrame(loop);
}
loop();