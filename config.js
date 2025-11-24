const config = {
    // General Settings
    general: {
        title: "My Customizable Bio",
        favicon: "https://ui-avatars.com/api/?name=User&background=random"
    },

    // Profile Information
    profile: {
        username: "Your Name",
        avatar: "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=200",
        // Bio text will be typed out. You can add multiple lines.
        bio: [
            "Web Developer",
            "Gamer",
            "Dreamer",
            "Welcome to my world"
        ]
    },

    // Social Media Links
    // Available icons: fa-discord, fa-instagram, fa-twitter, fa-github, fa-youtube, fa-twitch, fa-spotify, etc.
    socials: [
        { icon: "fab fa-discord", link: "https://discord.com", label: "Discord" },
        { icon: "fab fa-instagram", link: "https://instagram.com", label: "Instagram" },
        { icon: "fab fa-twitter", link: "https://twitter.com", label: "Twitter" },
        { icon: "fab fa-github", link: "https://github.com", label: "GitHub" }
    ],

    // Theme Customization
    theme: {
        // Colors (Hex codes)
        colors: {
            background: "#0a0a0a", // Main background color
            cardBackground: "rgba(255, 255, 255, 0.05)", // Glass card background
            text: "#ffffff",
            accent: "#3498db", // Used for progress bar, active states
            border: "rgba(255, 255, 255, 0.1)"
        },
        // Font (Google Fonts name)
        font: "Outfit", // Try: 'Inter', 'Roboto', 'Poppins', 'Montserrat', 'Space Mono'

        // Background Effect: 'stars', 'snow', 'rain', 'none'
        backgroundEffect: 'snow'
    },

    // Music Player
    music: {
        url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3", // URL to your audio file
        autoPlay: true,
        volume: 0.3,
        // Lyrics: Time in seconds -> Text
        lyrics: [
            { time: 0, text: "♪ Music Playing ♪" },
            { time: 5, text: "Welcome to my world" },
            { time: 10, text: "Just chilling here" },
            { time: 15, text: "Coding through the night" },
            { time: 20, text: "Dreaming of the light" }
        ]
    }
};
