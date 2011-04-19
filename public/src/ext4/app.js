Ext.define('App.Main', {
	extend: 'Ext.container.Viewport',

	initComponent: function() {
		console.log("CA PASSE");
		Ext.apply(this, {
			layout: 'border',
			items: [{
				xtype: 'tabpanel',
				activeTab: 0,
				region: 'center',
				items: [{
					//xtype: 'products',
					html: "DOOMASS",
					title: 'Products'
				}, {
					title: 'Test',
					html: 'TEST'
				}]
			}]
		});
	}
});