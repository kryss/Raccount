Ext.namespace("App.Products");

App.Products = Ext.extend(App.GenericGrid, {
  initComponent:function() {
    var config = {
      gRoot: "product",
      gIdProperty: "id",
      gUrl: "/products",
      gColumns: [{
        header: "ID",
        width: 40,
        hidden: true,
        sortable: true,
        dataIndex: "id"
      }, {
        header: "Ref",
        width: 100,
        sortable: true,
        dataIndex: "ref",
        editor: new Ext.form.TextField({})
      }, {
        header: "Buy price",
        width: 50,
        sortable: true,
        dataIndex: "price_buy",
        editor: new Ext.form.TextField({})
      }, {
        header: "Sell price",
        width: 50,
        sortable: true,
        dataIndex: "price_sell",
        editor: new Ext.form.TextField({})
      }, {
        header: "Description",
        width: 150,
        sortable: false,
        dataIndex: "desc",
        editor: new Ext.form.TextArea({})
      }],
      gFields: [
        {name: "id"},
        {name: "ref", allowBlank: false},
        {name: "desc"},
        {name: "price_buy"},
        {name: "price_sell"}
      ]
    };
    Ext.apply(this, config);
    App.Products.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg("app-products", App.Products);
