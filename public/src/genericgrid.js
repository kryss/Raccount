Ext.namespace("App.GenericGrid");

App.GenericGrid = Ext.extend(Ext.grid.GridPanel, {
  gRoot: "",
  gFields: "",
  gColumns: "",
  gUrl: "",
  gIdProperty: "",

  initComponent:function() {
    this.c_editor = new Ext.ux.grid.RowEditor({
      saveText: "Save"
    });

    this.c_proxy = new Ext.data.HttpProxy({
      url: this.gUrl
    });

    this.c_reader = new Ext.data.JsonReader({
      successProperty: "success",
      messagePorperty: "message",
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
      writer: this.c_writer
    });

    var config = {
      store: this.c_store,
      plugins: [
        this.c_editor
      ],
      columns: this.gColumns,
      tbar: {
        xtype: "toolbar",
        border: true,
        items: [{
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
      }
    };
    Ext.apply(this, config);
    App.GenericGrid.superclass.initComponent.apply(this, arguments);
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
  }
});

Ext.reg("app-genericgrid", App.GenericGrid);
