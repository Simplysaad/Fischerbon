export default function getProfileColor(userId) {
  // Simple hash to integer
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0; // keep it 32-bit
  }

  // Get hue in [0, 360)
  const hue = Math.abs(hash) % 360;
  const saturation = 60; // %
  const lightness = 50; // %

  // Construct hsl color
  const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  // Calculate relative luminance for contrast
  // Approximate using lightness only (simple but effective for 50%)
  const yiq = (lightness * 255) / 100;

  // Use black text if background is light, else white text
  const textColor = yiq > 128 ? '#000000' : '#FFFFFF';

  return { bgColor, textColor };
}
