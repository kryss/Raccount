Ext.namespace("App.GenericStore");

App.GenericStore = Ext.extend(Ext.data.Store, {
	gUrl: null,
	gRoot: null,
	gFields: null,
	gIdProperty: null,

	constructor: function(config) {
		Ext.apply(this, config);
		config = Ext.applyIf(config, {
			restful: true,
			autoLoad: true,
			proxy: new Ext.data.HttpProxy({
				url: this.gUrl
			}),
			baseParams: {
				limit: 1000
			},
			reader: new Ext.data.JsonReader({
				successProperty: "success",
				messageProperty: "message",
				idProperty: this.gIdProperty,
				root: this.gRoot
			}, this.gFields),
			writer: new Ext.data.JsonWriter({
				encode: false
			})
		});
		App.GenericStore.superclass.constructor.call(this, config);
	}
});