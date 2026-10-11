export default function ErrorOverlay({ error, onClose }) {
  if (!error) return null;
  const { message, line, stack } = error;

  return (
    <div className="lab-error">
      <div className="lab-error-head">
        <span>{line ? `Error · line ${line}` : 'Error'}</span>
        {onClose && (
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Dismiss"
            type="button"
            style={{ color: '#fff', width: 24, height: 24 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.4"
                 strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <div className="lab-error-msg">
        {message}
        {stack && (
          <>
            {'\n\n'}
            <span style={{ opacity: 0.75, fontSize: '0.75em' }}>{stack}</span>
          </>
        )}
      </div>
    </div>
  );
}