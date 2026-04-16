// EFFE CINCO — Portfolio Interaction

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initSlideReveal();
    initLang();
    initHamburger();
    initMobilePreview();
});

/* ── CURSOR ── */
function initCursor() {
    const cursor = document.getElementById('cursor-follower');
    if (!cursor) return;

    document.addEventListener('mousemove', e => {
        cursor.style.transform = `translate(${e.clientX - 9}px, ${e.clientY - 9}px)`;
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '36px';
            cursor.style.height = '36px';
            cursor.style.background = 'rgba(255,255,255,0.15)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '18px';
            cursor.style.height = '18px';
            cursor.style.background = 'transparent';
        });
    });
}

/* ── SLIDE REVEAL ── */
function initSlideReveal() {
    const slides = document.querySelectorAll('.slide');

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    slides.forEach(s => io.observe(s));
}

/* ── HAMBURGER MENU ── */
function initHamburger() {
    const btn = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-nav');
    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        drawer.classList.toggle('open');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });

    // Close drawer when any link is clicked
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            drawer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ── MOBILE PREVIEW (tecla M) ── */
function initMobilePreview() {
    const hint = document.getElementById('mobile-preview-hint');

    function openPreview() {
        // Open a real browser window at iPhone 14 Pro dimensions
        const w = 390, h = 844;
        const left = Math.round((screen.width  - w) / 2);
        const top  = Math.round((screen.height - h) / 2);
        window.open(
            window.location.href,
            'mobile_preview',
            `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    }

    // Keyboard shortcut: M
    document.addEventListener('keydown', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'm' || e.key === 'M') openPreview();
    });

    // Also make the hint clickable
    if (hint) {
        hint.style.pointerEvents = 'auto';
        hint.style.cursor = 'pointer';
        hint.addEventListener('click', openPreview);
    }
}

/* ── LANGUAGE TOGGLE ── */
const t = {
    es: {
        'tag-hero':    'VJ · ARTISTA GENERATIVO · LASER SPECIALIST',
        'hero-h1':     'EFFE CINCO',
        'hero-desc':   'Transformando ideas en atmósferas visuales. Luz, algoritmos y performance en tiempo real.',
        'tag-profile': 'PERFIL / ARTISTA',
        'profile-h2':  'ARTISTA\n& TÉCNICO',
        'profile-desc':'5 años especializándome en visuales generativas en tiempo real, sincronización de video, láser e iluminación. Tengo la habilidad de captar la idea del cliente y transformarla en una atmósfera visual completa.',
        'profile-desc2':'Técnico informático de base — entiendo el hardware y el software desde adentro, lo que me permite solucionar problemas complejos en vivo con precisión.',
        'profile-btn': 'VER TRABAJO →',
        'tag-laser':   'ESPECIALIZACIÓN / LASER',
        'laser-h2':    'LASER\nSYNC',
        'laser-desc':  'Sincronización precisa de sistemas láser con audio, video e iluminación en vivo. Control avanzado con Pangolin Beyond, MadLaser y flujos Art-Net / DMX.',
        'laser-li1':   'Pangolin Beyond & QuickShow',
        'laser-li2':   'MadLaser — control avanzado',
        'laser-li3':   'Sincronización audio · video · luz',
        'laser-li4':   'Previsualización con Depence',
        'tag-vj':      'VJ PERFORMANCE / LIVE',
        'vj-h2':       'PERFORMANCE\nEN VIVO',
        'vj-desc':     'Video mapping, generative visuals y control en tiempo real para artistas internacionales. Shows destacados con Mariano Mellino, John Digweed, Osotil y Dixon Innervisions.',
        'vj-btn':      'VER SHOWS →',
        'tag-inter':   'PLUS / DIFERENCIADOR',
        'inter-h2':    'VISUALES\nINTERACTIVAS',
        'inter-desc':  'Desarrollo de experiencias donde el público controla las visuales. Juegos interactivos, salas inmersivas y experiencias completas utilizando sensores físicos y programación a medida.',
        'inter-li1':   'Sensores · OSC · MIDI',
        'inter-li2':   'Juegos con detección en tiempo real',
        'inter-li3':   'Salas y stands de marca inmersivos',
        'inter-li4':   'TouchDesigner avanzado',
        'tag-tools':   'SOFTWARE & HARDWARE / STACK TÉCNICO',
        'tools-h2':    'TOOLS',
        'tools-vis':   'VISUALES',
        'tools-laser': 'LASER',
        'tools-ai':    'AI & GENERATIVO',
        'tools-dev':   'DEV & AGENTES',
        'tag-metrics': 'TRAYECTORIA / HIGHLIGHTS',
        'met-years':   'AÑOS DE EXP.',
        'met-events':  'EVENTOS',
        'met-artists': 'ARTISTAS',
        'tag-contact': 'CONTACTO / COLLABORATE',
        'contact-h2':  '¿TRABAJAMOS\nJUNTOS?',
        'contact-desc':'Eventos, shows, instalaciones interactivas, salas inmersivas.',
        'cta-ig':      'INSTAGRAM',
        'cta-td':      'DERIVATIVE',
        'cta-yt':      'YOUTUBE',
    },
    en: {
        'tag-hero':    'VJ · GENERATIVE ARTIST · LASER SPECIALIST',
        'hero-h1':     'EFFE CINCO',
        'hero-desc':   'Turning ideas into visual atmospheres. Light, algorithms and live performance.',
        'tag-profile': 'PROFILE / ARTIST',
        'profile-h2':  'ARTIST\n& TECHNICIAN',
        'profile-desc':'5 years specializing in real-time generative visuals, synchronized video, laser and lighting. I capture the client\'s vision and craft it into a complete visual atmosphere.',
        'profile-desc2':'Computer technician by training — I understand hardware and software from the ground up, allowing me to solve complex problems live with precision.',
        'profile-btn': 'VIEW WORK →',
        'tag-laser':   'SPECIALIZATION / LASER',
        'laser-h2':    'LASER\nSYNC',
        'laser-desc':  'Precise synchronization of laser systems with audio, video and live lighting. Advanced control with Pangolin Beyond, MadLaser and Art-Net / DMX pipelines.',
        'laser-li1':   'Pangolin Beyond & QuickShow',
        'laser-li2':   'MadLaser — advanced control',
        'laser-li3':   'Audio · video · light sync',
        'laser-li4':   'Pre-visualization with Depence',
        'tag-vj':      'VJ PERFORMANCE / LIVE',
        'vj-h2':       'LIVE\nPERFORMANCE',
        'vj-desc':     'Video mapping, generative visuals and real-time control for international artists. Featured shows with Mariano Mellino, John Digweed, Osotil and Dixon Innervisions.',
        'vj-btn':      'WATCH SHOWS →',
        'tag-inter':   'PLUS / DIFFERENTIATOR',
        'inter-h2':    'INTERACTIVE\nVISUALS',
        'inter-desc':  'Experiences where the audience controls the visuals. Interactive games, immersive rooms and complete brand experiences using physical sensors and custom programming.',
        'inter-li1':   'Sensors · OSC · MIDI',
        'inter-li2':   'Real-time detection games',
        'inter-li3':   'Immersive brand spaces & stands',
        'inter-li4':   'Advanced TouchDesigner',
        'tag-tools':   'SOFTWARE & HARDWARE / TECH STACK',
        'tools-h2':    'TOOLS',
        'tools-vis':   'VISUALS',
        'tools-laser': 'LASER',
        'tools-ai':    'AI & GENERATIVE',
        'tools-dev':   'DEV & AGENTS',
        'tag-metrics': 'HIGHLIGHTS / CAREER',
        'met-years':   'YEARS EXP.',
        'met-events':  'EVENTS',
        'met-artists': 'ARTISTS',
        'tag-contact': 'CONTACT / COLLABORATE',
        'contact-h2':  'LET\'S\nWORK TOGETHER',
        'contact-desc':'Events, shows, interactive installations, immersive experiences.',
        'cta-ig':      'INSTAGRAM',
        'cta-td':      'DERIVATIVE',
        'cta-yt':      'YOUTUBE',
    }
};

let lang = 'es';

function initLang() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
        lang = lang === 'es' ? 'en' : 'es';
        applyLang();
        btn.textContent = lang === 'es' ? 'ES / EN' : 'EN / ES';
    });
}

function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[lang][key] !== undefined) {
            el.innerHTML = t[lang][key].replace(/\n/g, '<br>');
        }
    });
}
