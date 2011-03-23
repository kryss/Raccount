Ext.namespace("App.Main");

App.Main = Ext.extend(Ext.Viewport, {
	initComponent: function() {
		var config = {
			layout:"border",
			items:[{
				region: "center",
				xtype:"tabpanel",
				activeTab:0,
				items:[{
					title: "Products",
					layout: "fit",
					border: false,
					items: {
						xtype:"app-products",
						border: false
					}
				}, {
					title: "Contacts",
					layout: "fit",
					border: false,
					items: {
						xtype: "app-contacts",
						border: false
					}
				}, {
					title: "Invoices",
					layout: "fit",
					border: false,
					items: {
						xtype: "app-invoices",
						border: false
					}
				}]
			}]
		};
		Ext.apply(this, config);
		App.Main.superclass.initComponent.apply(this, arguments);
	}
});
