import React from 'react';
import PropTypes from 'prop-types';

const Gtag = ({ code }) => (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${code}`} />
    <script dangerouslySetInnerHTML={{
      __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)};
      gtag('js', new Date());

      gtag('config', '${code}');`,
    }}
    />
  </>
);

Gtag.propTypes = {
  code: PropTypes.string
};

Gtag.defaultProps = {
  code: ""
};

export default Gtag;
