Ext.regModel('Product', {
	idProperty: 'id',
	fields: [{
		name: 'id',
		type: 'int',
		useNull: true
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
	}],
	validations: [{
		type: 'length',
		field: 'ref',
		min: 1
	}]
});

Ext.define('App.Products.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.app.products.grid',
	store: Ext.create('Ext.data.Store', {
		model: 'Product',
		autoLoad: true,
		autoSync: true,
		proxy: {
			type: 'rest',
			url: '/products',
			reader: {
				type: 'json',
				root: 'product'
			},
			writer: {
				type: 'json'
			}
		}
	}),
	dockedItems: [{
		xtype: 'toolbar',
		items: [{
			text: 'Add',
			iconCls: 'icon-add',
			listeners: {
				scope: this,
				click: function(button, event) {
					var grid = button.ownerCt.ownerCt;
					grid.store.insert(0, new Product());
					grid.plugins[0].startEdit(0, 0);
				}
			}
		}, '-', {
			text: 'Delete',
			iconCls: 'icon-delete',
			listeners: {
				scope: this,
				click: function(button, event) {
					var grid = button.ownerCt.ownerCt;
					var selection = grid.getView().getSelectionModel().getSelection()[0];
					if (selection) {
						grid.store.remove(selection);
					}
				}
			}
		}]
	}],
	plugins: [Ext.create('Ext.grid.plugin.RowEditing')],
	headers: [{
		text: 'Id',
		dataIndex: 'id',
		hidden: true
	}, {
		text: 'Reference',
		flex: 2,
		sortable: true,
		dataIndex: 'ref',
		field: {
			xtype: 'textfield'
		}
	}, {
		text: 'Buy price',
		flex: 1,
		sortable: true,
		dataIndex: 'price_buy',
		field: {
			xtype: 'numberfield'
		}
	}, {
		text: 'Sell price',
		flex: 1,
		sortable: true,
		dataIndex: 'price_sell',
		field: {
			xtype: 'numberfield'
		}
	}, {
		text: 'Description',
		flex: 1.5,
		sortable: false,
		dataIndex: 'desc',
		field: {
			xtype: 'textarea'
		}
	}]
});

Ext.define('App.Products.Panel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.products',
	layout: {
		type: 'fit'
	},
	items: [{
		xtype: 'app.products.grid'
	}]
});