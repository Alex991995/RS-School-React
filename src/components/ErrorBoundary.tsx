import React, { Component } from 'react';
import styles from '../styles/ErrorBoundary.module.css';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

interface IState {
  error: null | Error;
  hasError: boolean;
  errorInfo: null | React.ErrorInfo;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.boxError}>
          <h1>An Error was caught and send to our server</h1>;
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
