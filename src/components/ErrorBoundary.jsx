import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message || 'Something went wrong.';
      return (
        <div className="page" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              marginBottom: 8,
              color: 'var(--text)',
            }}
          >
            Something broke, but we can fix it, Check back later or try again. If the problem persists, please report it to us.
          </h2>
          <p
            className="muted"
            style={{
              marginBottom: 24,
              fontSize: '0.9rem',
              lineHeight: 1.6,
              maxWidth: 420,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {msg}
          </p>
          <button className="select-btn primary" onClick={this.reset} type="button">
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}