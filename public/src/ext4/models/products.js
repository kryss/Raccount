Ext.regModel('Product', {
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'ref',
		type: 'string',
		allowBlank: false
	}, {
		name: 'desc',
		type: 'string'
	}, {
		name: 'price_buy',
		type: 'float'
	}, {
		name: 'price_sell',
		type: 'float'
	}]
});

Ext.define('App.Products.Grid', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.app.products.grid',
	store: Ext.create('Ext.data.Store', {
		model: 'Product',
		autoLoad: true,
		proxy: {
			type: 'rest',
			url: '/products',
			reader: {
				type: 'json',
				root: 'product',
				successProperty: 'success',
				messageProperty: 'message'
			}
		}
	}),
	plugins: Ext.create('Ext.grid.RowEditing', {
		editors: [{
			name: 'ref',
			xtype: 'textfield'
		}, {
			name: 'price_buy',
			xtype: 'numberfield'
		}, {
			name: 'price_sell',
			xtype: 'numberfield'
		}, {
			name: 'desc',
			xtype: 'textarea'
		}]
	}),
	headers: [{
		text: 'Reference',
		flex: 2,
		sortable: true,
		dataIndex: 'ref'
	}, {
		text: 'Buy price',
		flex: 1,
		sortable: true,
		dataIndex: 'price_buy'
	}, {
		text: 'Sell price',
		flex: 1,
		sortable: true,
		dataIndex: 'price_sell'
	}, {
		text: 'Description',
		flex: 1.5,
		sortable: false,
		dataIndex: 'desc'
	}]
});

Ext.define('App.Products.Form', {
	extend: 'Ext.form.FormPanel',
	alias: 'widget.app.products.form',
	layout: {
		type: 'column'
	},
	items: [{
		xtype: 'textfield'
	}]
});

Ext.define('App.Products.Panel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.products',
	layout: {
		type: 'border',
		margin: 3
	},
	items: [{
		xtype: 'app.products.grid',
		region: 'center'
	}, {
		xtype: 'app.products.form',
		region: 'east',
		frame: true,
		title: 'Edit form',
		collapsible: true,
		width: 250
	}]
});