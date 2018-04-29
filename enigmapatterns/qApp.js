import enigma from 'enigma.js';
const qixSchema = require('./node_modules/enigma.js/schemas/qix/3.1/schema.json');

const config = {
  schema: qixSchema,
  session: {
    host: 'localhost',
    prefix: '',
    port: 4848,
    unsecure: true
  }
};

/* enigma.getService('qix', config).then((qix) => {
  return qix.global.openApp('Helpdesk Management.qvf').then((app) => {
  //app.getObject('QV01','hRZaKk');
    return app;
  });
}); */

export default enigma.getService('qix', config).then((qix) => {
  const g = qix.global;
  console.log('Got the global instance');

  return  g.openApp('Helpdesk Management.qvf').then((app) => {
    console.log('Got the app instance');

    /* app.getObject('hRZaKk').then((obj) => {
      console.log('Got the object instance',obj);
   
      
      obj.getLayout().then((layout) => {
      console.log('Got the object layout', layout);
      $('#hRZaKk').html(layout);
      }); 
    }); */
    
  return app;
  });
  
});