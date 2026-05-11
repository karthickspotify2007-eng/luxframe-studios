'use client'

import { Component, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    // Re-throw Next.js BailoutToCSR signals — these are intentional internal
    // signals used to defer SSR to the client. They must not be caught here.
    if ((error as any).digest === 'BAILOUT_TO_CLIENT_SIDE_RENDERING') {
      throw error
    }
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#020409', color: 'white',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '40px', fontFamily: 'monospace',
          zIndex: 99999
        }}>
          <h2 style={{ color: '#ff4444', marginBottom: '20px' }}>Runtime Error</h2>
          <pre style={{ color: '#ff8888', whiteSpace: 'pre-wrap', maxWidth: '800px', fontSize: '12px' }}>
            {this.state.error.message}
          </pre>
          <pre style={{ color: '#666', whiteSpace: 'pre-wrap', maxWidth: '800px', fontSize: '10px', marginTop: '20px' }}>
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
