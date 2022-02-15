import React from 'react';
import PropTypes from 'prop-types';

const CodigoAnalytics = ({ code }) => (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${code}`} />
    <script dangerouslySetInnerHTML={{
      __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${code && code}');`,
    }}
    />
  </>
);

CodigoAnalytics.propTypes = {
  code: PropTypes.string
};

CodigoAnalytics.defaultProps = {
  code: ""
};

export default CodigoAnalytics;
