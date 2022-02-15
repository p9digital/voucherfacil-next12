export default class Admin {
  static async getInitialProps({ res }) {
    if (res) {
      res.writeHead(301, {
        Location: 'https://app.voucherfacil.com.br/admin',
      });
      res.end();
    } else {
      window.location = 'https://app.voucherfacil.com.br/admin';
    }
    return {};
  }
}
