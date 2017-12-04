import React from "react";
import PropTypes from "prop-types";

import Header from "../header";

const Wrapper = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      justifyContent: "space-between",
    }}
  >
    {children}
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderWrapper = ({ children }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 999,
    }}
  >
    {children}
  </div>
);

HeaderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const ContentWrapper = ({ children }) => (
  <div
    className="contentWrapper"
    style={{
      width: "100%",
      boxSizing: "border-box",
      margin: "2rem auto",
      marginTop: "60px",
    }}
  >
    {children}
  </div>
);

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const FooterWrapper = ({ children }) => <div>{children}</div>;

const PageTemplate = ({ header, children, footer, ...props }) => (
  <Wrapper {...props}>
    <HeaderWrapper>{header}</HeaderWrapper>
    <ContentWrapper>{children}</ContentWrapper>
    <FooterWrapper>{footer}</FooterWrapper>
  </Wrapper>
);

FooterWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

PageTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
};

PageTemplate.defaultProps = {
  header: <Header />,
  footer: <div />,
};

export default PageTemplate;
