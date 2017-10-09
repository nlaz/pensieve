import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const Wrapper = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        boxSizing: 'border-box',
        justifyContent: 'space-between'
      }}
    >
      {children}
    </div>
  );
};

const HeaderWrapper = ({ children }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 999
      }}
    >
      {children}
    </div>
  );
};

const ContentWrapper = ({ children }) => {
  return (
    <div
      className="contentWrapper"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        margin: '2rem auto',
        marginTop: '60px'
      }}
    >
      {children}
    </div>
  );
};

const FooterWrapper = ({ children }) => {
  return <div>{children}</div>;
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
  children: PropTypes.any.isRequired
};

PageTemplate.defaultProps = {
  header: <Header />,
  footer: <div />
};

export default PageTemplate;
