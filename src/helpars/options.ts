const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
    header: {
      height: '20mm',
      contents: '<h1 style="text-align: center;">Invoice</h1>'
    },
    footer: {
      height: '20mm',
      contents: {
        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
      }
    }
  };
  
  export default options;
  