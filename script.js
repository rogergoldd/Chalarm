document.addEventListener('DOMContentLoaded', () => {
    // --- Security Measures ---
    // Disable Right Click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U')
        ) {
            e.preventDefault();
        }
    });

    // Console Warning
    console.log("%cStop!", "color: red; font-size: 50px; font-weight: bold;");
    console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or 'hack' someone's account, it is a scam and will give them access to your account.", "font-size: 20px;");

    // --- Load Configuration ---

    // 1. Apply Theme
    document.documentElement.style.setProperty('--bg-color', config.theme.colors.background);
    document.documentElement.style.setProperty('--text-color', config.theme.colors.text);
    document.documentElement.style.setProperty('--accent-color', config.theme.colors.accent);
    document.documentElement.style.setProperty('--glass-bg', config.theme.colors.cardBackground);
    document.documentElement.style.setProperty('--glass-border', config.theme.colors.border);

    // Load Font
    const fontName = config.theme.font;
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@300;400;600;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.fontFamily = `'${fontName}', sans-serif`;

    // Set Title & Favicon
    document.title = config.general.title;
    const favicon = document.querySelector("link[rel~='icon']") || document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'shortcut icon';
    favicon.href = config.general.favicon;
    document.head.appendChild(favicon);

    // 2. Render Content
    document.querySelector('.username').textContent = config.profile.username;
    document.querySelector('.avatar').src = config.profile.avatar;

    // Render Socials
    const socialContainer = document.querySelector('.social-links');
    socialContainer.innerHTML = ''; // Clear existing
    config.socials.forEach(social => {
        const a = document.createElement('a');
        a.href = social.link;
        a.className = 'social-icon';
        a.target = '_blank';
        a.innerHTML = `<i class="${social.icon}"></i>`;
        a.title = social.label; // Tooltip
        socialContainer.appendChild(a);
    });

    // 3. Background Effects
    const bgContainer = document.querySelector('.background');
    bgContainer.innerHTML = ''; // Clear existing

    if (config.theme.backgroundEffect === 'stars') {
        const stars = document.createElement('div');
        stars.className = 'stars';
        bgContainer.appendChild(stars);
    } else if (config.theme.backgroundEffect === 'snow') {
        // Create snow particles
        for (let i = 0; i < 50; i++) {
            const snow = document.createElement('div');
            snow.className = 'snow';
            snow.style.left = Math.random() * 100 + '%';
            snow.style.animationDuration = Math.random() * 3 + 2 + 's';
            snow.style.opacity = Math.random();
            bgContainer.appendChild(snow);
        }
    } else if (config.theme.backgroundEffect === 'rain') {
        // Create rain drops
        for (let i = 0; i < 100; i++) {
            const rain = document.createElement('div');
            rain.className = 'rain';
            rain.style.left = Math.random() * 100 + '%';
            rain.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
            rain.style.animationDelay = Math.random() * 2 + 's';
            bgContainer.appendChild(rain);
        }
    }

    // --- Core Logic ---

    const enterScreen = document.getElementById('enter-screen');
    const mainProfile = document.getElementById('main-profile');
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const playIcon = playBtn.querySelector('i');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const lyricDisplay = document.getElementById('lyric-display');
    const bioText = document.querySelector('.bio-text');

    // Set Audio Source
    audio.src = config.music.url;
    audio.volume = config.music.volume;

    // Bio Typewriter
    const bioLines = config.profile.bio;
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeBio() {
        const currentLine = bioLines[lineIndex];

        if (isDeleting) {
            bioText.textContent = currentLine.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            bioText.textContent = currentLine.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentLine.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % bioLines.length;
            typeSpeed = 500;
        }

        setTimeout(typeBio, typeSpeed);
    }

    // Enter Site
    enterScreen.addEventListener('click', () => {
        enterScreen.classList.add('fade-out');
        setTimeout(() => {
            enterScreen.classList.add('hidden');
            mainProfile.classList.add('show-profile');
            typeBio();
        }, 800);

        if (config.music.autoPlay) {
            audio.play().then(() => {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            }).catch(err => console.log("Autoplay blocked"));
        }
    });

    // Music Controls
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            audio.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });

    // Progress & Lyrics
    audio.addEventListener('timeupdate', (e) => {
        const { duration, currentTime } = e.srcElement;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            updateLyrics(currentTime);
        }
    });

    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    function updateLyrics(currentTime) {
        const lyrics = config.music.lyrics;
        let currentLyric = "♪";

        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].time) {
                currentLyric = lyrics[i].text;
            }
        }

        if (lyricDisplay.textContent !== currentLyric) {
            lyricDisplay.style.opacity = 0;
            setTimeout(() => {
                lyricDisplay.textContent = currentLyric;
                lyricDisplay.style.opacity = 1;
            }, 200);
        }
    }
});
