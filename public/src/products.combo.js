Ext.namespace("App.ProductsCombo");

App.ProductsCombo = Ext.extend(Ext.form.ComboBox, {
	initComponent: function() {
		var config = {
			mode: "remote",
			valueField: "id",
			displayField: "ref",
			emptyText: "Select a product...",
			store: new App.GenericStore({
				gUrl: "/products",
				gIdProperty: "id",
				gRoot: "product",
				gFields: [{
					name: "id"
				}, {
					name: "ref",
					allowBlank: false
				}]
			})
		};
		Ext.apply(this, config);
		App.ProductsCombo.superclass.initComponent.apply(this, arguments);
	}
});