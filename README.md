# RIFT - Retro Pixel Landing Site

A retro pixel CRT-styled landing page for the upcoming RIFT game/IP brand. Features authentic CRT monitor effects, phosphor green aesthetics, and interactive audio elements.

## Features

- **CRT Monitor Effects**: Authentic scanlines, shadow mask dots, barrel distortion, and glass glare
- **Phosphor Green Aesthetic**: Classic terminal green color scheme with glow effects
- **Interactive Audio**: CRT hum ambience and UI sound effects (user-initiated)
- **Animated Elements**: Glowing RIFT title, typing terminal, floating stars
- **Pixel Art Graphics**: Space invaders, pixel blobs, and procedural terrain
- **Responsive Design**: Optimized for various screen sizes
- **Accessibility**: Reduced motion support and keyboard navigation

## Tech Stack

- React 18
- Tailwind CSS
- Web Audio API
- SVG Graphics
- Google Fonts (Pixelify Sans, Jersey 10)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view in browser

## Design Elements

### Color Palette
- **Primary Green**: `#1cfe98` (Phosphor Green)
- **Light Green**: `#bfffe6` (Highlights)
- **Dark Green**: `#0fae76` (Accents)
- **Background**: `#081410` (Deep Green-Black)

### Typography
- **Headlines**: Pixelify Sans (pixel-style font)
- **Body Text**: Jersey 10 (monospace-style)

### Effects
- Animated glow and jitter on RIFT title
- Terminal-style typing animation
- Procedural star field
- CRT screen simulation with:
  - Scanlines
  - Shadow mask pattern
  - Vignette effect
  - Glass glare sweep

## Audio Features

- **CRT Hum**: Subtle 58Hz triangle wave ambient sound
- **UI Blips**: Square wave sound effects for interactions
- **User Control**: Audio toggle button (respects user interaction requirements)

## Performance Optimizations

- Memoized star generation
- CSS transforms for animations
- Efficient timeout management
- Proper cleanup of audio contexts

## Browser Support

- Modern browsers with Web Audio API support
- Graceful degradation for reduced motion preferences
- Mobile-responsive design

## License

This project is for demonstration purposes. RIFT is a fictional game/IP brand.
