import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';

const Wrapper = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      {children}
    </div>
  );
};

const HeaderWrapper = ({ children }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 999
    }}>
      {children}
    </div>
  );
};

const ContentWrapper = ({ children }) => {
  return (
    <div style={{
      width: '100%',
      boxSizing: 'border-box',
      margin: '2rem auto',
      marginTop: '60px',
      display: 'flex',
      flexGrow: 1,
    }}>
      {children}
    </div>
  );
};

const FooterWrapper = ({ children }) => {
  return (
    <div style={{
    }}>
      {children}
    </div>
  );
};

const PageTemplate = ({ header, children, footer, ...props }) => {
  return (
    <Wrapper {...props}>
      <HeaderWrapper>{header}</HeaderWrapper>
      <ContentWrapper>{children}</ContentWrapper>
      <FooterWrapper>{footer}</FooterWrapper>
    </Wrapper>
  );
};

PageTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.any.isRequired,
};

PageTemplate.defaultProps = {
  header: <Header />,
  footer: <div />,
};

export default PageTemplate;