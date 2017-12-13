import ReactGA from "react-ga";

ReactGA.initialize("UA-101760335-1");

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
};
