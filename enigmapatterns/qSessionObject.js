import getApp from "./qApp";

class qSessionObject {

  constructor(properties) {
    this.properties = properties;
    this.object = null;
  }

  open() {
    if (!this.object) {
      return getApp.then((app) => {
        app.getObject('hRZaKk').then((obj) => {
          console.log('Got the object instance',obj);
       
          
          obj.getLayout().then((layout) => {
          console.log('Got the object layout', layout);
          $('#hRZaKk').html(layout);
          }); 
        });
        return app.createSessionObject(this.properties).then((object) => {
          this.object = object;
        });
      });
    }
  }

  close() {
    if (this.object) {
      return getApp.then((app) => {
        return app.destroySessionObject(this.object.id).then(() => {
          this.object = null;
        });
      });
    }
  }

}

export default qSessionObject;