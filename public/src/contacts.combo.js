Ext.namespace("App.ContactsCombo");

App.ContactsCombo = Ext.extend(Ext.form.ComboBox, {
	initComponent: function() {
		var storeConfig = this.storeConfig || {};
		var config = {
			mode: "local",
			valueField: "id",
			displayField: "name",
			emptyText: "Select a contact...",
			store: new App.GenericStore(Ext.apply(storeConfig, {
				gUrl: "/contacts",
				gIdProperty: "id",
				gRoot: "contact",
				gFields: [{
					name: "id"
				}, {
					name: "name",
					allowBlank: false
				}]
			}))
		};
		Ext.apply(this, config);
		App.ContactsCombo.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('app.contactscombo', App.ContactsCombo);