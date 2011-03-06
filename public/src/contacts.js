Ext.namespace("App.Contacts");

App.Contacts = Ext.extend(App.GenericGrid, {
  initComponent:function() {
    var config = {
      gRoot: "contact",
      gIdProperty: "id",
      gUrl: "/contacts",
      gColumns: [{
        header: "ID",
        width: 40,
        hidden: true,
        sortable: true,
        dataIndex: "id"
      }, {
        header: "Name",
        width: 100,
        sortable: true,
        dataIndex: "name",
        editor: new Ext.form.TextField({})
      }, {
        header: "Phone",
        width: 50,
        sortable: true,
        dataIndex: "phone",
        editor: new Ext.form.TextField({})
      }, {
        header: "Email",
        width: 100,
        sortable: true,
        dataIndex: "email",
        editor: new Ext.form.TextField({})
      }],
      gFields: [
        {name: "id"},
        {name: "name", allowBlank: false},
        {name: "phone"},
        {name: "email"}
      ]
    };
    Ext.apply(this, config);
    App.Contacts.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg("app-contacts", App.Contacts);
