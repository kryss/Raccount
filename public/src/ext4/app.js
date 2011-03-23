Ext.define('App.Main', {
	extend: 'Ext.Viewport',
	layout: {
		type: 'border',
		padding: 5
	},
	items: [{
		xtype: 'tabpanel',
		activeTab: 0,
		region: 'center',
		items: [{
			xtype: 'products',
			title: 'Products'
		}, {
			title: 'Test',
			html: 'TEST'
		}]
	}]
});