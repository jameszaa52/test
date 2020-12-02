sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "com/cu/py/zhrpyb001/model/models", "./model/errorHandling"], function (e, t, o,
	i) {
	"use strict";
	var n = {};
	return e.extend("com.cu.py.zhrpyb001.Component", {
		metadata: {
			manifest: "json",
			config: {
				fullWidth: true
			}
		},
		init: function () {
			this.setModel(o.createDeviceModel(), "device");
			this.setModel(o.createFLPModel(), "FLP");
			this.setModel(new sap.ui.model.json.JSONModel({}), "dataSource");
			var t = new sap.ui.model.json.JSONModel({});
			this.setModel(t, "applicationModel");
			e.prototype.init.apply(this, arguments);
			this.getRouter().initialize()
		},
		createContent: function () {
			var e = new sap.m.App({
				id: "App"
			});
			return e
		},
		getNavigationPropertyForNavigationWithContext: function (e, t) {
			var o = n[e];
			return o == null ? null : o[t]
		}
	})
});