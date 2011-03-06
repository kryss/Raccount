Ext.namespace("App.Invoices");

App.Invoices = Ext.extend(Ext.Panel, {
  initComponent: function() {
    var config = {
      layout: "border",
      items: [{
        region: "north",
        height: 75,
        collapsible: true,
        collapsed: false,
        split: true,
        layout: "column",
        style: "padding:3px;",
        defaults: {
          style: "margin: 5px auto;text-align:center;"
        },
        frame: true,
        title: "Search invoice",
        items: this.getSearchBar()
      }, {
        region: "center",
        xtype: "app-genericgrid",
        gRoot: "invoice",
        gIdPropertyId: "id",
        gUrl: "/invoices",
        border: true,
        gColumns: [{
          header: "ID",
          width: 40,
          hidden: true,
          sortable: false,
          dataIndex: "id"
        }, {
          header: "Item",
          width: 100,
          sortable: true,
          dataIndex: "product_id",
          editor: new Ext.form.ComboBox({
            store: ['Product #1', 'Product #2', 'Product #3']
          })
        }, {
          header: "Description",
          width: 150,
          sortable: false,
          dataIndex: "desc",
          editor: new Ext.form.TextArea({})
        }, {
          header: "Quantity",
          width: 75,
          sortable: true,
          dataIndex: "quantity",
          editor: new Ext.form.NumberField({})
        }, {
          header: "Price",
          width: 125,
          sortable: false,
          dataIndex: "price",
          editor: new Ext.form.TextField({})
        }],
        gFields: [
          {name: "id"},
          {name: "product_id", allowBlank: false},
          {name: "desc"},
          {name: "quantity", allowBlank: false},
          {name: "price", allowBlank: false}
        ]
      }]
    };
    Ext.apply(this, config);
    App.Invoices.superclass.initComponent.apply(this, arguments);
  },

  getSearchBar: function() {
    return [{
      xtype:"label",
      text:"To: ",
      width: 20
    }, {
      xtype:"textfield",
      name:"contact",
      style: "",
      columnWidth: 0.2
    }, {
      xtype:"label",
      text:"Date: ",
      width: 35
    }, {
      xtype:"datefield",
      name:"date",
      style: "",
      value: new Date(),
      columnWidth: 0.2
    }, {
      xtype:"label",
      text:"Due Date: ",
      width: 70
    }, {
      xtype:"datefield",
      name:"due_date",
      value: new Date(),
      style: "",
      columnWidth: 0.2
    }, {
      xtype:"label",
      text:"Invoice #: ",
      width: 70
    }, {
      xtype:"textfield",
      name:"invoice",
      style: "",
      columnWidth: 0.2
    }, {
      xtype:"label",
      text:"Reference: ",
      width: 70
    }, {
      xtype:"textfield",
      name:"ref",
      style: "",
      columnWidth: 0.2
    }];
  }
});

Ext.reg("app-invoices", App.Invoices);
