import React from 'react';

const spinnerStyle = {
  width: 60,
  height: 60,
  border: '8px solid rgba(14, 165, 233, 0.3)', // cyan-500 with opacity
  borderTopColor: '#0ea5e9', // solid cyan-500
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(14, 165, 233, 0.15)', // translucent cyan overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  flexDirection: 'column',
};

const labelStyle = {
  marginTop: 20,
  color: '#0ea5e9',
  fontSize: 18,
  fontWeight: '600',
  userSelect: 'none',
};

const keyframes = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;

const PageLoadingFallback = ({ label = 'Loading page, please wait...' }) => {
  return (
    <>
      <style>{keyframes}</style>
      <div
        style={overlayStyle}
        role="alert"
        aria-busy="true"
        aria-live="assertive"
      >
        <div style={spinnerStyle} aria-hidden="true" />
        {label && <div style={labelStyle}>{label}</div>}
      </div>
    </>
  );
};

export default PageLoadingFallback;
