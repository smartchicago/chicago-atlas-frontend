import React from 'react';
import classNames from 'classnames';

// main entry point for CSS,
// we're only importing it here because we generate bundle from Sass.
import '../../css/main.css';

import HeaderContainer from './containers/HeaderContainer';
import Footer from './ui/Footer';

export default React.createClass({
  displayName: 'Layout',

  render() {
    const isHomepage = this.props.location.pathname === '/';
    const hasSidebar =
      this.props.location.pathname.includes('community-areas/') ||
      this.props.location.pathname.includes('indicators/') ||
      this.props.location.pathname.includes('zip-codes/');
    return (
      <div className="main-layout">
        <HeaderContainer />
        <main
          className={classNames('main-layout__content', {'main-layout__inner': (!isHomepage && !hasSidebar)})}
          role="main"
        >
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
});
