const size = {
  mobileS: '320px',
  mobileM: '420px',
  mobileL: '600px',
  tablet: '768px',
  laptop: '1024px',
  laptopM: '1365px',
  laptopL: '1440px',
  desktop: '2560px',
};

const devices = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopM: `(max-width: ${size.laptopM})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

export default devices;
