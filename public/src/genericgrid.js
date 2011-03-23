Ext.namespace("App.GenericGrid");

App.GenericGrid = Ext.extend(Ext.grid.GridPanel, {
	gRoot: "",
	gFields: "",
	gColumns: "",
	gUrl: "",
	gIdProperty: "",

	initComponent:function() {
		this.c_editor = new Ext.ux.grid.RowEditor({
			saveText: "Save",
			listeners: {
				scope: this,
				beforeedit: this.onBeforeEdited,
				afteredit: this.onAfterEdited,
				canceledit: this.onCancelEdited
			}
		});

		this.c_proxy = new Ext.data.HttpProxy({
			url: this.gUrl
		});

		this.c_reader = new Ext.data.JsonReader({
			successProperty: "success",
			messagePorperty: "message",
			totalProperty: 'total',
			idProperty: this.gIdProperty,
			root: this.gRoot
		}, this.gFields);

		this.c_writer = new Ext.data.JsonWriter({
			encode: false
		});

		this.c_store = new Ext.data.Store({
			restful: true,
			proxy: this.c_proxy,
			reader: this.c_reader,
			writer: this.c_writer,
			remoteSort: true
		});

		var config = {
			store: this.c_store,
			plugins: [
			this.c_editor
			],
			loadMask: true,
			columns: this.gColumns,
			tbar: {
				xtype: "toolbar",
				border: true,
				items: [{
					text: "Add",
					ref: 'refAddButton',
					listeners: {
						scope: this,
						click: this.onAdd
					}
				}, "-", {
					text: "Delete",
					ref: 'refDeleteButton',
					disabled: true,
					listeners: {
						scope: this,
						click: this.onDelete
					}
				}, "->", {
					xtype: "textfield",
					width: 150,
					emptyText: "Search " + this.gRoot + "s..."
				}, {
					text: "Search",
					listeners: {
						scope: this,
						click: this.onSearch
					}
				}]
			},
			viewConfig: {
				forceFit: true
			},
			listeners: {
				scope: this,
				afterrender: this.onAfterRender
			},
			bbar: new Ext.PagingToolbar({
				pageSize: 10,
				store: this.c_store,
				displayInfo: true,
				displayMsg: 'Displaying ' + this.gRoot + ' {0} - {1} of {2}',
				emptyMsg: "No " + this.gRoot + " to display"
			}),
			selModel: new Ext.grid.CheckboxSelectionModel({
				singleSelect: true,
				listeners: {
					scope: this,
					rowselect: this.onRowSelected,
					rowdeselect: this.onRowDeselected
				}
			})
		};
		Ext.apply(this, config);
		App.GenericGrid.superclass.initComponent.apply(this, arguments);
	},

	onRowSelected: function(selModel, rowIndex, record) {
		this.getTopToolbar().refDeleteButton.enable();
	},

	onRowDeselected: function(selModel, rowIndex, record) {
		this.getTopToolbar().refDeleteButton.disable();
	},

	onAfterRender: function() {
		this.getStore().load();
	},

	onSave: function() {
		this.getStore().save();
	},

	onAdd: function() {
		var store = this.getStore();
		var defaultData = {};
		for (var i in this.gColumns) {
			if (Ext.isObject(this.gColumns[i]) &&
				Ext.isString(this.gColumns[i]["name"]) &&
				this.gColumns[i]["name"] != this.gIdProperty) {
				defaultData[this.gColumns[i]["name"]] = "";
			}
		}
		var u = new store.recordType(defaultData);
		this.c_editor.stopEditing();
		this.getStore().insert(0, u);
		this.addedRecord = true;
		this.c_editor.startEditing(0);
	},

	onDelete: function() {
		var rec = this.getSelectionModel().getSelected();
		if (!rec) {
			return false;
		}
		this.getStore().remove(rec);
	},

	onSearch: function() {
		Ext.Msg.alert("Status", "Not implemented yet.");
	},

	onBeforeEdited: function() {
		this.getTopToolbar().refAddButton.disable();
	},

	onAfterEdited: function(rowEditor, changes, record, rowIndex) {
		this.getTopToolbar().refAddButton.enable();
		this.addedRecord = false;
	},

	onCancelEdited: function(rowEditor, forced) {
		if (this.addedRecord === true) {
			this.getStore().removeAt(0);
			this.addedRecord = false;
		}
		this.getTopToolbar().refAddButton.enable();
	}
});

Ext.reg("app-genericgrid", App.GenericGrid);
