import React, { Component } from "react";

import NotFound from "../../UI/NotFound";

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) return <NotFound />;

    return this.props.children;
  }
}

export default ErrorBoundary;
