Ext.namespace("App.Orders");

App.Orders = Ext.extend(App.GenericGrid, {
	invoiceId: null,

	initComponent:function() {
		this.productsCombo = new App.ProductsCombo({
			storeConfig: {
				listeners: {
					scope: this,
					load: this.onProductsComboStoreLoaded
				}
			}
		});
		var config = {
			gRoot: "order",
			gIdProperty: "id",
			gUrl: "/orders",
			storeConfig: {
				autoLoad: false,
				baseParams: {
					invoice_id: this.invoiceId
				}
			},
			gColumns: [{
				header: "ID",
				width: 40,
				hidden: true,
				sortable: true,
				dataIndex: "id"
			}, {
				header: "Invoice",
				width: 20,
				hidden: true,
				stortable: false,
				dataIndex: "invoice_id",
				defaultValue: this.invoiceId
			}, {
				header: "Product",
				width: 75,
				sortable: true,
				dataIndex: "product_id",
				scope: this,
				editor: this.productsCombo,
				renderer: this.renderProduct
			}, {
				header: "Quantity",
				width: 50,
				sortable: true,
				dataIndex: "quantity",
				editor: new Ext.form.NumberField({})
			}, {
				header: "Unit price",
				width: 50,
				sortable: true,
				dataIndex: "unit_price",
				editor: new Ext.form.NumberField({})
			}],
			gFields: [{
				name: "id"
			}, {
				name: "invoice_id",
				defaultValue: this.invoiceId
			}, {
				name: "product_id"
			}, {
				name: "quantity"
			}, {
				name: "unit_price"
			}]
		};
		Ext.apply(this, config);
		App.Orders.superclass.initComponent.apply(this, arguments);
	},

	onProductsComboStoreLoaded: function() {
		this.getStore().load();
	},

	renderProduct: function(value, metaData, record, rowIndex, colIndex, store) {
		var store = this.productsCombo.getStore();
		var product = store.getById(value);
		if (Ext.isObject(product)) {
			return product.get('ref');
		}
		return value;
	}
});

Ext.reg("app-orders", App.Orders);
