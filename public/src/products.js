Ext.namespace("App.Products");

App.Products = Ext.extend(Ext.grid.GridPanel, {
	initComponent:function() {
	    this.c_editor = new Ext.ux.grid.RowEditor({
		    saveText: "Save"
		});
	    this.c_proxy = new Ext.data.HttpProxy({
		    url: "/products"
		});
	    this.c_reader = new Ext.data.JsonReader({
		    successProperty: "success",
		    messagePorperty: "message",
		    idProperty: "id",
		    root: "data"
		}, [
	    {name: "id"},
	    {name: "ref", allowBlank: false},
	    {name: "desc"},
	    {name: "price_buy"},
	    {name: "price_sell"}
		    ]);
	    this.c_writer = new Ext.data.JsonWriter({
		    encode: false
		});
	    this.c_store = new Ext.data.Store({
		    restful: true,
		    proxy: this.c_proxy,
		    reader: this.c_reader,
		    writer: this.c_writer
		});
	    this.c_columns = [
{header: "ID", width: 40, sortable: true, dataIndex: "id"},
{header: "Ref", width: 100, sortable: true, dataIndex: "ref", editor: new Ext.form.TextField({})},
{header: "Buy price", width: 50, sortable: true, dataIndex: "price_buy", editor: new Ext.form.TextField({})},
{header: "Sell price", width: 50, sortable: true, dataIndex: "price_sell", editor: new Ext.form.TextField({})},
{header: "Description", width: 150, sortable: false, dataIndex: "desc", editor: new Ext.form.TextArea({})}
	];
	    var config = {
		store: this.c_store,
		plugins: [this.c_editor],
		columns: this.c_columns,
		tbar: [{
			text: "Add",
			listeners: {
			    scope: this,
			    click: this.onAdd
			}
		    }, "-", {
			text: "Delete",
			listeners: {
			    scope: this,
			    click: this.onDelete
			}
		    }],
		viewConfig: {
		    forceFit: true
		},
		listeners: {
		    scope: this,
		    afterrender: this.onAfterRender
		}
	    };
	    Ext.apply(this, config);
	    App.Products.superclass.initComponent.apply(this, arguments);
	},

	onAfterRender: function() {
	    this.getStore().load();
	},

	onSave: function() {
	    this.getStore().save();
	},

	onAdd: function() {
	    var store = this.getStore();
	    var u = new store.recordType({
		    ref: "",
		    desc: "",
		    price_buy: "",
		    price_sell: ""
		});
	    this.c_editor.stopEditing();
	    this.getStore().insert(0, u);
	    this.c_editor.startEditing(0);
	},

	onDelete: function() {
	    var rec = this.getSelectionModel().getSelected();
	    if (!rec) {
		return false;
	    }
	    this.getStore().remove(rec);
	}
});

Ext.reg("app-products", App.Products);
