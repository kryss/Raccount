Ext.namespace('App.Invoices');

App.Invoices = Ext.extend(Ext.Panel, {
	initComponent: function() {
		var config = {
			layout: 'border',
			listeners: {
				scope: this,
				afterrender: this.onActivated,
				show: this.onActivated
			},
			items: [{
				region: 'north',
				height: 75,
				collapsible: true,
				collapsed: true,
				collapseMode: 'mini',
				layout: 'column',
				style: 'padding:3px;',
				defaults: {
					style: 'margin: 5px auto;text-align:center;'
				},
				frame: true,
				title: 'Search invoice',
				items: this.getSearchBar()
			}, {
				ref: 'grid',
				region: 'center',
				xtype: 'app-genericgrid',
				storeConfig: {
					autoLoad: false
				},
				gRoot: 'invoice',
				onAdd: this.createInvoice,
				onBeforeEdited: this.editInvoice,
				onDelete: this.deleteInvoice,
				gIdProperty: 'id',
				gUrl: '/invoices',
				border: true,
				gColumns: [{
					header: 'ID',
					width: 40,
					hidden: true,
					sortable: false,
					dataIndex: 'id'
				}, {
					header: 'Invoice #',
					width: 150,
					sortable: true,
					dataIndex: 'invoice_num'
				}, {
					header: 'Is paid',
					width: 35,
					sortable: true,
					dataIndex: 'is_paid'
				}, {
					header: 'Date',
					width: 50,
					sortable: true,
					dataIndex: 'date',
					editor: new Ext.form.DateField({
						emptyText: 'Enter a date...'
					})
				}, {
					header: 'Date due',
					width: 50,
					sortable: true,
					dataIndex: 'date_due',
					editor: new Ext.form.DateField({
						emptyText: 'Enter a date...'
					})
				}],
				gFields: [{
					name: 'id'
				}, {
					name: 'invoice_num'
				}, {
					name: 'is_paid',
					type: 'bool',
					allowBlank: true
				}, {
					name: 'date',
					type: 'date',
					allowBlank: true
				}, {
					name: 'date_due',
					type: 'date',
					allowBlank: true
				}]
			}]
		};
		Ext.apply(this, config);
		App.Invoices.superclass.initComponent.apply(this, arguments);
	},

	getSearchBar: function() {
		return [{
			xtype:'label',
			text:'To: ',
			width: 20
		}, {
			xtype:'textfield',
			name:'contact',
			emptyText: 'Choose a contact name...',
			style: '',
			columnWidth: 0.2
		}, {
			xtype:'label',
			text:'Date: ',
			width: 35
		}, {
			xtype:'datefield',
			name:'date',
			style: '',
			value: new Date(),
			columnWidth: 0.2
		}, {
			xtype:'label',
			text:'Due Date: ',
			width: 70
		}, {
			xtype:'datefield',
			name:'due_date',
			value: new Date(),
			style: '',
			columnWidth: 0.2
		}, {
			xtype:'label',
			text:'Invoice #: ',
			width: 70
		}, {
			xtype:'textfield',
			name:'invoice',
			style: '',
			columnWidth: 0.2
		}, {
			xtype:'label',
			text:'Reference: ',
			width: 70
		}, {
			xtype:'textfield',
			name:'ref',
			style: '',
			columnWidth: 0.2
		}];
	},

	onActivated: function() {
		if (this.rendered) {
			this.grid.getStore().reload();
		}
	},

	createInvoice: function() {
		var tabpanel = this.ownerCt.ownerCt;
		var invoice = tabpanel.add({
			xtype: 'app.invoice',
			invoiceId: 'new'
		});
		tabpanel.activate(invoice);
	},

	editInvoice: function() {
		var rec = this.getSelectionModel().getSelected();
		if (!rec) {
			return false;
		}
		var tabpanel = this.ownerCt.ownerCt;
		var founded = false;
		tabpanel.items.each(function() {
			if (this.invoiceId === rec.get('id')) {
				founded = this;
			}
		});
		if (founded === false) {
			var invoice = tabpanel.add({
				xtype: 'app.invoice',
				invoiceId: rec.get("id")
			});
			tabpanel.activate(invoice);
		} else {
			tabpanel.activate(founded);
		}
	},

	deleteInvoice: function() {
		var rec = this.getSelectionModel().getSelected();
		if (!rec) {
			return false;
		}
		var tabpanel = this.ownerCt.ownerCt;
		var founded = false;
		tabpanel.items.each(function() {
			if (this.invoiceId === rec.get('id')) {
				founded = this;
			}
		});
		if (founded !== false) {
			founded.destroy();
		}
		this.getStore().remove(rec);
	}
});

Ext.reg('app.invoices', App.Invoices);
