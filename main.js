/* ============================================
   DISTORXION — Main JavaScript
   ============================================ */

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.follower = document.getElementById('cursor-follower');
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        this.animate();
    }
    animate() {
        this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
        this.pos.y += (this.mouse.y - this.pos.y) * 0.15;
        this.cursor.style.left = this.mouse.x + 'px';
        this.cursor.style.top = this.mouse.y + 'px';
        this.follower.style.left = this.pos.x + 'px';
        this.follower.style.top = this.pos.y + 'px';
        requestAnimationFrame(() => this.animate());
    }
}

class LandingSplash {
    constructor() {
        this.splash = document.getElementById('landing-splash');
        this.canvas = document.getElementById('splash-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.logoZone = document.getElementById('splash-enter-zone');
        this.logo = document.getElementById('splash-logo');
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            const rect = this.logo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
            if (dist < 400) {
                const intensity = (400 - dist) / 400;
                this.logo.style.transform = `translate(${(e.clientX - centerX) * 0.1}px, ${(e.clientY - centerY) * 0.1}px) scale(${1 + intensity * 0.1})`;
                this.logo.style.filter = `brightness(${1 + intensity}) contrast(${1 + intensity})`;
            }
        });

        const enterSite = () => {
            this.splash.classList.add('hidden');
            setTimeout(() => {
                document.getElementById('nav').classList.add('visible');
                animateSections();
            }, 800);
        };

        this.logoZone.addEventListener('click', enterSite);
        this.logoZone.addEventListener('touchstart', (e) => { e.preventDefault(); enterSite(); }, { passive: false });
        this.animate();
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    animate() {
        this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for(let i=0; i<40; i++) {
            this.ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.2})`;
            this.ctx.fillRect(Math.random() * this.canvas.width, Math.random() * this.canvas.height, 1, 1);
        }
        requestAnimationFrame(() => this.animate());
    }
}

class ParticleField {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.count = 80;
        this.init();
    }
    init() {
        this.resize();
        for(let i=0; i<this.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random()-0.5)*0.5,
                vy: (Math.random()-0.5)*0.5,
                s: Math.random() * 2
            });
        }
        this.animate();
    }
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    animate() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(255,255,255,0.15)';
        this.particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x<0 || p.x>this.canvas.width) p.vx*=-1;
            if(p.y<0 || p.y>this.canvas.height) p.vy*=-1;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.s, 0, Math.PI*2);
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }
}

function animateSections() {
    document.querySelectorAll('[data-reveal]').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 150);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loader-progress');
    let p = 0;
    const int = setInterval(() => {
        p += Math.random() * 20;
        if (p >= 100) {
            p = 100;
            clearInterval(int);
            setTimeout(() => {
                loader.classList.add('hidden');
                new LandingSplash();
            }, 600);
        }
        bar.style.width = p + '%';
    }, 150);

    new CustomCursor();
    const heroCanvas = document.getElementById('hero-canvas');
    if(heroCanvas) new ParticleField(heroCanvas);

    // Project Data
    const projectData = {
        john_digweed: {
            title: "JOHN DIGWEED | MARTIN GARCIA",
            date: "2025",
            service: "LIGHTING DESIGN, VISUALS, TOUCHDESIGNER",
            location: "AMERIKA BSAS",
            media: [
                "assets/portfolio/john_digweed/215385_4cf537467da74aa5b35de3a99a1b3492~mv2.avif",
                "assets/portfolio/john_digweed/215385_5c47c3f0d277483aa1fc0fcb7e889e7a~mv2.avif",
                "assets/portfolio/john_digweed/215385_82af21f181b946e0bec39110570ad351f000.avif",
                "assets/portfolio/john_digweed/215385_86a2d859b758488bbf0de8829ad780e1~mv2.avif",
                "assets/portfolio/john_digweed/215385_ce7f9d83c6994752875680c56d14b3c3~mv2.avif",
                "assets/portfolio/john_digweed/digweed_1-min.jpg",
                "assets/portfolio/john_digweed/digweed_video-min.mp4"
            ]
        },
        mutek_argentina: {
            title: "MUTEK ARGENTINA",
            date: "2025",
            service: "LASER PERFORMANCE, LIVE AUDIO",
            location: "DESEO BSAS",
            media: [
                "assets/portfolio/mutek_argentina/C1799_02838524-min.mp4",
                "assets/portfolio/mutek_argentina/C1825_02858924-min.mp4",
                "assets/portfolio/mutek_argentina/C1845_02872772-min.mp4",
                "assets/portfolio/mutek_argentina/DSC09796-min.jpg",
                "assets/portfolio/mutek_argentina/mutek_1-min.jpg",
                "assets/portfolio/mutek_argentina/utopia_1-min.jpg"
            ]
        },
        comite_357_mutek: {
            title: "COMITE 357 | MUTEK",
            date: "2025",
            service: "LASER SYNC, SOUND & LIGHTING",
            location: "COMITE 357",
            media: [
                "assets/portfolio/comite_357_mutek/comite_1-min.jpg",
                "assets/portfolio/comite_357_mutek/m-final_02-min.jpg",
                "assets/portfolio/comite_357_mutek/m-final_03-min.jpg",
                "assets/portfolio/comite_357_mutek/m-final_04-min.jpg",
                "assets/portfolio/comite_357_mutek/m-final_05-min.jpg",
                "assets/portfolio/comite_357_mutek/m-final_06-min.jpg",
                "assets/portfolio/comite_357_mutek/m-final_07-min.jpg"
            ]
        },
        experimental_01: {
            title: "EXPERIMENTAL 01",
            date: "2024",
            service: "LASER EXPLORATIONS, CREATIVE TECH",
            location: "UNDERCLUB",
            media: [
                "assets/portfolio/experimental_01/experimental_video-min.mp4",
                "assets/portfolio/experimental_01/Imagen de WhatsApp 2024-04-30 a las 23.10.43_3421a502-min.jpg",
                "assets/portfolio/experimental_01/Imagen de WhatsApp 2024-04-30 a las 23.10.44_44bf3e10-min.jpg",
                "assets/portfolio/experimental_01/Imagen de WhatsApp 2024-04-30 a las 23.10.44_7f5f6ea8-min.jpg",
                "assets/portfolio/experimental_01/Imagen de WhatsApp 2024-04-30 a las 23.10.46_c618a56c-min.jpg",
                "assets/portfolio/experimental_01/vlcsnap-2026-04-19-21h19m34s735.png",
                "assets/portfolio/experimental_01/vlcsnap-2026-04-19-21h20m12s778.png",
                "assets/portfolio/experimental_01/vlcsnap-2026-04-19-21h23m18s229.png"
            ]
        },
        lixis_behind_me: {
            title: "LIXIS / BEHIND ME",
            date: "2024",
            service: "LIGHT AND LASER INSTALLATION",
            location: "FRIDA",
            media: [
                "assets/portfolio/lixis_behind_me/215385_2d278e50796b45f899b9d771e252c280f000.avif",
                "assets/portfolio/lixis_behind_me/215385_7ed138cd991e4a109d51fd8df86acc27~mv2.avif",
                "assets/portfolio/lixis_behind_me/215385_852758fca5bc4074a9167127abb1aa33~mv2.avif",
                "assets/portfolio/lixis_behind_me/215385_e9f1e1dcbf2f4c0a85eabc9f8de9ff94f000.avif",
                "assets/portfolio/lixis_behind_me/215385_f546c80b7696467b9b406b3bd6e790c9~mv2.avif",
                "assets/portfolio/lixis_behind_me/lixis_behind_me.avif"
            ]
        },
        "0800": {
            title: "0800 COLLECTIVE",
            date: "2025",
            service: "LASER PERFORMANCE, MAPPING",
            location: "HIPODROMO",
            media: [
                "assets/portfolio/0800/080002-min.mp4",
                "assets/portfolio/0800/08003-min.mp4",
                "assets/portfolio/0800/0800_1-min.jpg",
                "assets/portfolio/0800/215385_0af3086ebb87463593f947fd19f075e4f000.avif",
                "assets/portfolio/0800/215385_ce178a1a13364877b42f13b471b51250~mv2_resultado.avif"
            ]
        },
        flash: {
            title: "FLASH",
            date: "2024",
            service: "LIGHT INTERVENTION, SYNC",
            location: "PRIVATE",
            media: [
                "assets/portfolio/flash/215385_94ed665d52114a84ad9524e230118be7f000.avif",
                "assets/portfolio/flash/215385_c3e604fcc10b45b8b727723ff32aa8cff000.avif",
                "assets/portfolio/flash/215385_deddc3501abe45b9ada83e223e22f1d3f000.avif"
            ]
        },
        impulso: {
            title: "IMPULSO",
            date: "2026",
            service: "LIGHTING DESIGN, VFX, LASER PERFORMANCE",
            location: "UNO MÁS UNO",
            media: ["https://youtu.be/1wU2jzRpEO0"]
        },
        innervisions: {
            title: "INNERVISIONS | DIXON & TRIKK",
            date: "2025",
            service: "SCREEN INTERVENTION, CURATION",
            location: "AMERIKA BSAS",
            media: [
                "assets/portfolio/innervisions/215385_454eddbec98e4582932dc4c19cc4e76f~mv2.avif",
                "assets/portfolio/innervisions/215385_e34630738bda41419239ca30a0b9b1bff000.avif"
            ]
        },
        underclub_t3r: {
            title: "UNDERCLUB T3R",
            date: "2024",
            service: "IMMERSIVE VISUAL DESIGN, LASER PERFORMANCE",
            location: "UNDERCLUB",
            media: [
                "assets/portfolio/underclub_t3r/lixis_1-min.jpg",
                "assets/portfolio/underclub_t3r/underclub_1-min.jpg",
                "assets/portfolio/underclub_t3r/underclub_video-min.mp4"
            ]
        }
    };

    // ... (resto del código igual) ...
