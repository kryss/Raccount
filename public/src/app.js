Ext.namespace("App.Main");

App.Main = Ext.extend(Ext.Viewport, {
	initComponent: function() {
	    this.storeReader = new Ext.data.JsonReader({
		    //totalProperty: 'total',
		    successProperty: 'success',
		    messageProperty: "message",
		    idProperty: 'id',
		    root: 'data',
		}, [
	    {name: 'id'},
	    {name: 'name'},
		    ]);
	    this.store = new Ext.data.Store({
		    restful: true,
		    autoSave: false,
		    proxy: new Ext.data.HttpProxy({url:'/note'}),
		    writer: new Ext.data.JsonWriter({encode: false}),
		    reader: this.storeReader,
		    listeners: {
			scope: this,
			save:this.onStoreSave
		    }
		});

	    this.noteView = {
		xtype:"panel",
		ref:"../view",
		tpl:"Note: {name}"
	    };

	    this.noteForm = {
		xtype:"form",
		layout:"form",
		ref:"../form",
		items:[{
			fieldLabel:"Name",
			xtype:"textfield",
			name:"name"
		    }, {
			xtype:"hidden",
			name:"id"
		    }]
	    };

	    var config = {
		layout:"border",
		items:[{
			ref:"tab",
			region: "center",
			xtype:"tabpanel",
			activeTab:0,
			listeners:{
			    scope: this,
			    afterrender: this.onAfterRender
			},
			items:[{
				title: "Products",
				layout: "fit",
				border: false,
				items: {
				    border: false,
				    xtype:"app-products"
				}
			    }, {
				title: "Contacts",
				defaults: {
				    border: false
				},
				items:[this.noteView, this.noteForm],
				tbar: {
				    xtype:"toolbar",
				    items:[{
					    xtype:"button",
					    text:"Save",
					    listeners: {
						scope: this,
						click: this.onSaveClick
					    }
					}]
				}
			    }, {
				title: "Contacts (grid)",
				html: "Nothing"
			    }]
		    }]
	    };
	    Ext.apply(this, config);
	    App.Main.superclass.initComponent.apply(this, arguments);
	},

	onAfterRender: function() {
	    this.record = new this.store.recordType({
		    name:""
		});
	    this.tab.form.getForm().loadRecord(this.record);
	},

	onSaveClick: function() {
	    this.tab.form.getForm().updateRecord(this.record);
	    this.store.add(this.record);
	    this.store.save();
	},

	onStoreSave:function() {
	    this.tab.view.update(this.record.data);
	}
    });