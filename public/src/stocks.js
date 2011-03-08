Ext.namespace("App.Stocks");

App.Stocks = Ext.extend(App.GenericGrid, {
  initComponent:function() {
    this.productsCombo = new App.ProductsCombo({});
    this.contactsCombo = new App.ContactsCombo({});
    var config = {
      gRoot: "stock",
      gIdProperty: "id",
      gUrl: "/stocks",
      gColumns: [{
        header: "ID",
        width: 40,
        hidden: true,
        sortable: true,
        dataIndex: "id"
      }, {
        header: "Contact",
        width: 75,
        sortable: true,
        dataIndex: "user_id",
	scope: this,
        editor: this.contactsCombo,
	renderer: this.renderContact
      }, {
        header: "Product",
        width: 75,
        sortable: true,
        dataIndex: "product_id",
	scope: this,
        editor: this.productsCombo,
	renderer: this.renderProduct
      }, {
        header: "Number left",
        width: 50,
        sortable: true,
        dataIndex: "number_left",
        editor: new Ext.form.NumberField({})
      }, {
	header: "Alert limit",
        width: 50,
        sortable: true,
        dataIndex: "alert_limit",
        editor: new Ext.form.NumberField({})
      }],
      gFields: [
        {name: "id"},
        {name: "user_id"},
        {name: "product_id"},
        {name: "number_left"},
        {name: "alert_limit"}
      ]
    };
    Ext.apply(this, config);
    App.Stocks.superclass.initComponent.apply(this, arguments);
  },

  renderProduct: function(value, metaData, record, rowIndex, colIndex, store) {
    var store = this.productsCombo.getStore();
    var product = store.getById(value);
    if (Ext.isObject(product)) {
	return product.get("ref");
    }
    return value;
  },

  renderContact: function(value, metaData, record, rowIndex, colIndex, store) {
    var store = this.contactsCombo.getStore();
    var contact = store.getById(value);
    if (Ext.isObject(contact)) {
	return contact.get("name");
    }
    return value;
  }
});

Ext.reg("app-stocks", App.Stocks);
