Ext.namespace('App.Contacts');

App.Contacts = Ext.extend(App.GenericGrid, {
	initComponent: function() {
		var config = {
			storeConfig: {
				autoLoad: true
			},
			gRoot: 'contact',
			gIdProperty: 'id',
			gUrl: '/contacts',
			gColumns: [{
				header: 'ID',
				width: 40,
				hidden: true,
				sortable: true,
				dataIndex: 'id'
			}, {
				header: 'Name',
				width: 100,
				sortable: true,
				dataIndex: 'name',
				editor: new Ext.form.TextField({
					emptyText: 'Enter name...'
				})
			}, {
				header: 'Phone',
				width: 50,
				sortable: true,
				dataIndex: 'phone',
				editor: new Ext.form.TextField({
					emptyText: 'Enter phone number...'
				})
			}, {
				header: 'Fax',
				width: 100,
				sortable: true,
				dataIndex: 'fax',
				editor: new Ext.form.TextField({
					emptyText: 'Enter fax...'
				})
			}, {
				header: 'Email',
				width: 100,
				sortable: true,
				dataIndex: 'email',
				editor: new Ext.form.TextField({
					emptyText: 'Enter email...'
				})
			}, {
				header: 'Note',
				width: 100,
				sortable: true,
				dataIndex: 'note',
				editor: new Ext.form.TextArea({
					emptyText: 'Enter note...'
				})
			}],
			gFields: [{
				name: 'id'
			}, {
				name: 'name',
				allowBlank: false
			}, {
				name: 'phone'
			}, {
				name: 'fax'
			}, {
				name: 'email'
			}, {
				name: 'note'
			}]
		};
		Ext.apply(this, config);
		App.Contacts.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('app.contacts', App.Contacts);
