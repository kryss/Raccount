Ext.namespace('App.Invoice');

App.Invoice = Ext.extend(Ext.Panel, {
	invoiceId: null,
	store: null,
	record: null,

	initComponent: function() {
		var config = {
			title: 'New invoice',
			closable: true,
			layout: 'border',
			tbar: {
				xtype: 'toolbar',
				items: [{
					xtype: 'button',
					text: 'Save',
					listeners: {
						scope: this,
						click: this.onSaveInvoice
					}
				}, {
					xtype: 'button',
					text: 'Close',
					listeners: {
						scope: this,
						click: function() {
							this.destroy();
						}
					}
				}]
			},
			autoScroll: true,
			items: [{
				region: 'north',
				height: 280,
				margins: '5 5 5 5',
				xtype: 'form',
				ref: 'form',
				layout: 'form',
				title: 'Informations',
				frame: true,
				collapsible: true,
				collapsed: true,
				defaults: {
					anchor: '80%'
				},
				items: this.getFormItems(),
				autoHeight: true
			}, {
				region: 'center',
				ref: 'content',
				layout: 'fit',
				border: false
			}]
		};
		Ext.apply(this, config);
		App.Invoice.superclass.initComponent.apply(this, arguments);
		this.initializeStore();
	},

	onSaveInvoice: function() {
		if (this.rendered) {
			this.getEl().mask('Saving...').show();
		}
		this.form.getForm().updateRecord(this.record);
		this.store.save();
	},

	onContactStoreLoaded: function() {
		this.isContactStoreLoaded = true;
		if (Ext.isObject(this.record)) {
			this.form.getForm().loadRecord(this.record);
		}
	},

	getFormItems: function() {
		return [{
			xtype: 'numberfield',
			fieldLabel: 'Invoice #',
			name: 'invoice_num',
			columnWidth: 0.25
		}, {
			xtype: 'app.contactscombo',
			fieldLabel: 'Contact',
			name: 'contact',
			storeConfig: {
				listeners: {
					scope: this,
					load: this.onContactStoreLoaded
				}
			},
			hiddenName: 'contact_id',
			columnWidth: 0.25
		}, {
			xtype: 'numberfield',
			fieldLabel: 'Sub total',
			name: 'sub_total',
			columnWidth: 0.25
		}, {
			xtype: 'numberfield',
			fieldLabel: 'Tax rate',
			name: 'tax_rate',
			columnWidth: 0.25
		}, {
			xtype: 'numberfield',
			fieldLabel: 'Total',
			name: 'total'
		}, {
			xtype: 'fieldset',
			title: 'Other fields',
			//collapsible: true,
			//collapsed: true,
			//autoHeight: true,
			defaults: {
				anchor: '80%'
			},
			items: [{
				xtype: 'datefield',
				fieldLabel: 'Date',
				name: 'date',
				value: new Date()
			}, {
				xtype: 'datefield',
				fieldLabel: 'Date due',
				name: 'date_due',
				value: new Date()
			}, {
				xtype: 'checkbox',
				fieldLabel: 'Is paid',
				name: 'is_paid',
				value: false
			}, {
				xtype: 'datefield',
				fieldLabel: 'Paid at',
				name: 'paid_at'
			}]
		}]
	},

	initializeStore: function() {
		var storeConfig = {};
		if (this.invoiceId !== 'new') {
			storeConfig = {
				autoLoad: true,
				baseParams: {
					invoice_id: this.invoiceId
				},
				listeners: {
					scope: this,
					load: this.onInvoiceStoreLoaded,
					save: this.onInvoiceStoreSaved
				}
			};
		} else {
			storeConfig = {
				autoLoad: false,
				listeners: {
					scope: this,
					save: this.onInvoiceStoreSaved
				}
			};
		}
		this.store = new App.GenericStore(Ext.apply(storeConfig, {
			autoSave: false,
			gUrl: '/invoices',
			gRoot: 'invoice',
			gIdProperty: 'id',
			gFields: [{
				name: 'id'
			}, {
				name: 'invoice_num',
				allowBlank: true
			}, {
				name: 'contact_id',
				allowBlank: true
			}, {
				name: 'is_paid',
				type: 'bool',
				allowBlank: true
			}, {
				name: 'total',
				allowBlank: true
			}, {
				name: 'sub_total',
				allowBlank: true
			}, {
				name: 'tax_rate',
				allowBlank: true
			}, {
				name: 'date',
				type: 'date',
				allowBlank: true
			}, {
				name: 'paid_at',
				type: 'date',
				allowBlank: true
			}]
		}));
		if (this.rendered) {
			this.getEl().mask('Loading...').show();
		}
		if (this.invoiceId === 'new') {
			this.createInvoice();
		} else {
			this.createOrders = true;
		}
	},

	onInvoiceStoreSaved: function(store, batch, data) {
		if (this.createOrders === true) {
			delete this.createOrders;
			this.content.add({
				xtype: 'app-orders',
				flex: 1,
				invoiceId: this.record.get('id')
			});
			this.doLayout();
			this.invoiceId = this.record.get('id');
			if (this.isContactStoreLoaded) {
				this.form.getForm().loadRecord(this.record);
			}
		}
		if (this.record.get('invoice_num')) {
			this.setTitle('Invoice: ' + this.record.get('invoice_num'));
		} else {
			this.setTitle('New invoice');
		}
		if (this.rendered) {
			this.getEl().mask().hide();
		}
	},

	onInvoiceStoreLoaded: function(store, records, options) {
		if (this.createOrders === true) {
			delete this.createOrders;
			this.content.add({
				xtype: 'app-orders',
				flex: 1,
				invoiceId: this.invoiceId
			});
			this.doLayout();
			this.record = records[0];
			if (this.isContactStoreLoaded) {
				this.form.getForm().loadRecord(this.record);
			}
		}
		this.setTitle('Invoice: ' + this.record.get('invoice_num'));
		if (this.rendered) {
			this.getEl().mask().hide();
		}
	},

	createInvoice: function() {
		this.record = new this.store.recordType({
			date: new Date()
		});
		this.createOrders = true;
		this.store.add(this.record);
		this.store.save();
	}
});

Ext.reg('app.invoice', App.Invoice);