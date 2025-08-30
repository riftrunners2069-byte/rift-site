# RIFT - Retro Pixel Landing Site

A stunning retro-style landing site for the RIFT RUNNERS NFT Collection, featuring:

## ✨ Features

- 🎮 **Retro CRT Design** - Authentic green phosphor monitor aesthetic
- ⌨️ **Interactive Terminal** - Animated typing with real-time text display
- 🌄 **Dynamic Terrain** - Landscape that pulses with every keystroke
- 🎵 **Audio Experience** - Looping background music with CRT hum effects
- 📱 **Mobile Optimized** - Responsive design across all devices
- ⚡ **Performance** - Optimized animations and smooth interactions

## 🎯 Technologies

- **React 18** - Modern frontend framework
- **Tailwind CSS** - Utility-first styling
- **Web Audio API** - Sound effects and music
- **SVG Animations** - Crisp vector graphics
- **CSS3** - Advanced animations and effects

## 🚀 Live Demo

Visit the live site: [Coming Soon]

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/riftrunners2069-byte/rift-site.git

# Navigate to project directory
cd rift-site

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Serve production build locally (optional)
npx serve -s build
```

## 🌐 Deployment

This site is configured for easy deployment on Netlify:

1. **Automatic Deployment**: Connected to GitHub for continuous deployment
2. **Build Settings**: Configured via `netlify.toml`
3. **Optimizations**: Asset caching and performance headers included

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy build folder to your hosting provider
```

## 🎨 Customization

### Color Scheme
The site uses a three-tone green phosphor palette:
- **Bright Green**: `#1cfe98` - Active elements
- **Mid Green**: `#20a185` - Secondary elements  
- **Dark Green**: `#084639` - Inactive/subtle elements

### Audio Files
Place your audio files in the `public` directory:
- `rift01.mp3` - Background music (loops automatically)
- Sound effects generated via Web Audio API

### Assets
- `riftrunner01.gif` - Character animation
- All images should be optimized for web

## 📂 Project Structure

```
rift-site/
├── public/
│   ├── index.html
│   ├── rift01.mp3
│   ├── riftrunner01.gif
│   └── manifest.json
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # React entry point
│   └── index.css       # Global styles and animations
├── netlify.toml        # Netlify deployment configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json
```

## 🎵 Audio Features

- **Background Music**: Loops automatically when enabled
- **CRT Hum**: Authentic monitor sound via Web Audio API
- **UI Sound Effects**: Keyboard blips and interaction feedback
- **Toggle Controls**: Music and SFX can be independently controlled

## 🌊 Animation Features

- **Terrain Sync**: Landscape responds to every character typed/deleted
- **Terminal Effects**: Realistic typing animation with cursor
- **Glitch Effects**: Random RIFT logo distortions
- **Floating Elements**: Ambient star particles
- **CRT Effects**: Screen curvature and phosphor glow

## 📱 Responsive Design

- **Mobile First**: Optimized for touch devices
- **Breakpoints**: Custom responsive layouts
- **Performance**: Reduced animation intensity on mobile
- **Accessibility**: Screen reader friendly, high contrast support

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Build Settings (Netlify)
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node Version**: `18`

## 📄 License

This project is part of the RIFT RUNNERS NFT Collection.

## 🤝 Contributing

This is a specialized landing page for the RIFT RUNNERS project. 

---

**RIFT RUNNERS** - Where retro meets the future 🚀