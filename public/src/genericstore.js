Ext.namespace("App.GenericStore");

App.GenericStore = Ext.extend(Ext.data.Store, {
	constructor: function(config) {
	    Ext.apply(this, config);
	    var internal = {
		restful: true,
		autoLoad: true,
		proxy: new Ext.data.HttpProxy({
			url: this.gUrl
		    }),
		reader: new Ext.data.JsonReader({
			successProperty: "success",
			messageProperty: "message",
			idProperty: this.gIdProperty,
			root: this.gRoot
		    }, this.gFields),
		writer: new Ext.data.JsonWriter({
			encode: false
		    })
	    };
	    App.GenericStore.superclass.constructor.call(this, internal);
	}
});