import React from 'react';

// Spinner keyframes for pulsing dots
const styles = `
@keyframes pulse {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
`;

/**
 * Props:
 *  - active: boolean (default true) — controls visibility
 *  - size: 'small' | 'medium' | 'large' (default 'medium')
 *  - overlay: boolean (default false) — shows semi-transparent overlay blocking interaction
 *  - label: string (optional) — status message below spinner
 *  - inline: boolean (default false) — if true, shows inline with no overlay/blocker; for small loaders
 */
const Loading = ({
  active = true,
  size = 'medium',
  overlay = false,
  label = 'loading...',
  inline = false,
}) => {
  if (!active) return null;

  // Size in px for dots and container
  const sizeMap = {
    small: { dot: 6, container: 24 },
    medium: { dot: 10, container: 40 },
    large: { dot: 14, container: 60 },
  };

  const { dot, container } = sizeMap[size] || sizeMap['medium'];

  // Dot styles
  const dotBaseStyle = {
    width: dot,
    height: dot,
    margin: dot / 2,
    borderRadius: '50%',
    backgroundColor: '#06b6d4',
    display: 'inline-block',
    animationName: 'pulse',
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  };

  // Overlay style for blocking interaction and centering content
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(14, 165, 233, .8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    flexDirection: 'column',
  };

  // Container styles for inline or overlay
  const containerStyle = inline
    ? { display: 'inline-flex', alignItems: 'center' }
    : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      };

  // Accessibility: aria-live to inform screen readers
  return (
    <>
      <style>{styles}</style>
      {overlay ? (
        <div
          style={overlayStyle}
          role="alert"
          aria-live="assertive"
          aria-busy="true"
        >
          <div
            style={{
              ...containerStyle,
              width: container,
              height: container,
              gap: size === 'small' ? 4 : 8,
            }}
          >
            {[0, 0.2, 0.4].map((delay, i) => (
              <span
                key={i}
                style={{ ...dotBaseStyle, animationDelay: `${delay}s` }}
              />
            ))}
          </div>
          {label && (
            <span className="mt-4 text-white font-medium select-none">
              {label}
            </span>
          )}
        </div>
      ) : (
        <div
          style={containerStyle}
          role="alert"
          aria-live="assertive"
          aria-busy="true"
        >
          {[0, 0.2, 0.4].map((delay, i) => (
            <span
              key={i}
              style={{ ...dotBaseStyle, animationDelay: `${delay}s` }}
            />
          ))}
          {label && (
            <span className="ml-2 text-white font-bold select-none">
              {label}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Loading;
