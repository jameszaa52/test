sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "./utilities", "./Formatter", "sap/ui/core/routing/History"], function (e,
	t, r, o, a) {
	"use strict";
	var s;
	return e.extend("com.cu.py.zhrpyb001.controller.Page1", {
		C_MODEL_NAME: {
			valueHelpModel: "valueHelpModel"
		},

		formatter: o,
		handleRouteMatched: function (e) {
			s.getView().setBusy(true);
			s.initModel();
			this.getView().getModel().read("/UserRoleSet('" + "ZHRPAB003" + "')", {
				success: function (e) {
					var t = new sap.ui.model.json.JSONModel(e);
					s.getView().setModel(t, "oUser");
					var r = s.getView().getModel("oUser").getData().Pernr;
					s.lvPernr = r;
					s._salaryInit();
					if (r != "00000000") {
						s.readPromote();
						//						s.getView().getModel("screenModel").setProperty("/auth", true); move to 266
					}
					var o = s.getView().getModel("oUser").getData().AdminFlag;
					if (o) {
						s.getView().getModel("screenModel").setProperty("/admin", true);
						s.getView().getModel("screenModel").setProperty("/notperiod", false);
						if (r != "00000000") {
							s.readPersonnel(r)
						}
					} else {}
					s.getView().setBusy(false);
				},
				error: function (e) {}
			});
			var t = {};
			if (e.mParameters.data.context) {
				this.sContext = e.mParameters.data.context;
				var r;
				if (this.sContext) {
					r = {
						path: "/" + this.sContext,
						parameters: t
					};
					this.getView().bindObject(r)
				}
			}
		},
		onPressDialog5: function () {
			this.onDialog("Dialog1")
		},
		_onCerTH: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			if (r.isNullOrBlank(e)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else if (parseFloat(e) == 0) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else {
				this.onDialog("Dialog5")
			}
		},
		_onCerEN: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			if (r.isNullOrBlank(e)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else if (parseFloat(e) == 0) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else {
				this.onDialog("Dialog2")
			}
		},
		_onCerVISA: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			if (r.isNullOrBlank(e)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else if (parseFloat(e) == 0) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else {
				this.queryReason();
				this.queryCountry();
				this.onDialog("CerVISA")
			}
		},
		_onFormatError: function (e) {
			debugger
		},
		_onValidateError: function (e) {
			var t = e.getSource();
			var r = e.getParameter("valid");
			if (r) {
				t.setValueState(sap.ui.core.ValueState.None)
			} else {
				t.setValueState(sap.ui.core.ValueState.Error);
				t.setValueStateText(s.I18N.getText("dateError"))
			}
		},
		_onPayslip: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			if (r.isNullOrBlank(e)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else if (parseFloat(e) == 0) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else {
				this.onDialog("Dialog7");
				this.queryRgdir("01");
				this.queryPeriod()
			}
		},
		query50Bis: function () {
			var e = this.getView().getModel();
			var t = this.getView().getModel("oUser").getData().Pernr;
			var aFilter = [];
			var o = new sap.ui.model.Filter({
				path: "Pernr",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: t
			});
			aFilter.push(o);
			e.read("/BIS50YearSet", {
				filters: aFilter,
				success: function (data) {
					var t = data.results;
					s.getView().getModel("m50Bis").setProperty("/Period", t);

				},
				error: function (e) {
					var t = [{
						Pernr: "1234",
						Year: "2012"
					}, {
						Pernr: "1234",
						Year: "2013"
					}, {
						Pernr: "1234",
						Year: "2014"
					}, {
						Pernr: "1234",
						Year: "2015"
					}];
					s.getView().getModel("m50Bis").setProperty("/Period", t);

				}
			});

		},
		_onBIS: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			if (r.isNullOrBlank(e)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"));
			} else if (parseFloat(e) == 0) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"));
			} else {
				this.onDialog("Dialog8");
				this.query50Bis();
			}

		},
		onPressBisTH: function (oEvent) {
			var data = oEvent.getSource().getBindingContext("m50Bis").getObject();
			var s = this.getView().getModel().sServiceUrl + "/BIS50FormSet(Pernr='" + data.Pernr + "',Langu='TH',Year='" + data.Year +
				"',Mobile=" +
				sap.ui.Device.system.phone + ")/$value";
			return sap.m.URLHelper.redirect(s, true);

		},
		onPressBisEN: function (oEvent) {
			var data = oEvent.getSource().getBindingContext("m50Bis").getObject();
			var s = this.getView().getModel().sServiceUrl + "/BIS50FormSet(Pernr='" + data.Pernr + "',Langu='EN',Year='" + data.Year +
				"',Mobile=" +
				sap.ui.Device.system.phone + ")/$value";
			return sap.m.URLHelper.redirect(s, true);

		},

		_onConfirm_TH: function () {
			var e = this.getView().getModel("mformth").getData().index;
			var t = this.getView().getModel("mPrevTH").getData().index;
			var r = this.getView().getModel("oUser").getData().Pernr;
			var o, a;
			if (t == 0) {
				a = true
			} else {
				a = false;
				this.CloseDialog("Dialog5");
				this.CloseDialog("Dialog1")
			}
			if (e == 0) {
				o = false
			} else {
				o = true
			}
			var s = this.getView().getModel().sServiceUrl + "/CertificateTHSet(Pernr='" + r + "',FullTitle=" + o + ",Preview=" + a + ",Mobile=" +
				sap.ui.Device.system.phone + ")/$value";
			return sap.m.URLHelper.redirect(s, true)
		},
		_onConfirm_EN: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			var t = this.getView().getModel("mPrevEN").getData().index;
			var r, o;
			if (t == 0) {
				o = true
			} else {
				o = false;
				this.CloseDialog("Dialog2")
			}
			var a = this.getView().getModel().sServiceUrl + "/CertificateENSet(Pernr='" + e + "',Preview=" + o + ",Mobile=" + sap.ui.Device.system
				.phone + ")/$value";
			return sap.m.URLHelper.redirect(a, true)
		},
		_onCancel: function (e) {
			var t = e.getSource().getParent().getId();
			this.mDialogs = this.mDialogs || {};
			var r = this.mDialogs[t];
			r.close();
			if (t == "CerVISA") {
				sap.ui.getCore().byId("RetDate").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("DepDate").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("BackDate").setValueState(sap.ui.core.ValueState.None)
			}
			if (t !== "ConfirmVisa") {
				s.clearModel()
			}
			if (t == "Dialog7") {
				sap.ui.getCore().byId("comboboxID").setSelectedKey("01")
			}
			//setthakorn start
			if (t == "Dialog10") {
				sap.ui.getCore().byId("comboboxID").setSelectedKey("01")
			}
			//setthakorn end
		},
		_onCountry: function (e) {
			var t = e.getParameter("selectedItem").getText();
			var r = e.getParameter("selectedItem").getKey();
			this.getView().getModel("mVisa").setProperty("/CountryName", t);
			this.getView().getModel("mVisa").setProperty("/CountryKey", r)
		},
		_onReason: function (e) {
			var t = e.getParameter("selectedItem").getText();
			var r = e.getParameter("selectedItem").getKey();
			this.getView().getModel("mVisa").setProperty("/ReasonName", t);
			this.getView().getModel("mVisa").setProperty("/ReasonKey", r)
		},
		_onConfirmVisa: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			var t = this.getView().getModel("mVisa").getData();
			var o = r.DateFormatterGW(t.DepartureDate);
			var a = r.DateFormatterGW(t.ReturnDate);
			var s = r.DateFormatterGW(t.BackToWorkDate);
			var i = this.getView().getModel("mPrevVisa").getData().index;
			var l, n;
			if (i == 0) {
				n = true
			} else {
				n = false;
				this.CloseDialog("CerVISA");
				this.CloseDialog("ConfirmVisa")
			}
			var g = this.getView().getModel().sServiceUrl + "/VisaSet(Pernr='" + e + "',Preview=" + n + ",Country='" + this.lvCountry +
				"',Reason='" + t.ReasonKey + "',DepartureDate=" + o + ",ReturnDate=" + a + ",BackToWorkDate=" + s + ",Mobile=" + sap.ui.Device.system
				.phone + ")/$value";
			return sap.m.URLHelper.redirect(g, true)
		},
		// Setthakorn 19/02/2020
		_onSalary: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			var w = this.getView().getModel("oCheck").getData().FLAG2;
			var x = this.getView().getModel("oCheck").getData().FLAG;
			if (r.isNullOrBlank(e)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else if (parseFloat(e) == 0) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else if (w) {
				sap.m.MessageBox.error(s.I18N.getText("Error.Nodata"))
			} else if (x) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPeriod"))
			} else {
				this.onDialog("Dialog10");
				this.queryRgdir("01");
				this.queryPeriod()
			}
		},
		_acceptSalary: function () {
			this.CloseDialog("Dialog10");
			var r = this.getView().getModel("oUser").getData().Pernr;
			// /////
			// this.getView().getModel().read("/SalaryCheckSet(PERNR='" + r + "',CHECKFLAG=false)", {
			// 	success: function (e) {
			// 		var v = new sap.ui.model.json.JSONModel(e);
			// 		s.getView().setModel(v, "oCheck");
			// 		var w = s.getView().getModel("oCheck").getData().FLAG;
			// 		var x = s.getView().getModel("oCheck").getData().FLAG2;
			// 		if (x) {
			// 			sap.m.MessageBox.error(s.I18N.getText("Error.NoPeriod"))
			// 		}
			// 		else {			
			// 	var s = this.getView().getModel().sServiceUrl + "/SalarySet(Pernr='" + r + "',Mobile=" + sap.ui.Device.system.phone + ")/$value";
			// 	return sap.m.URLHelper.redirect(s, true)
			// 		}
			// 	},
			// 	error: function (e) {}
			// });
			///////
			var s = this.getView().getModel().sServiceUrl + "/SalarySet(Pernr='" + r + "',Mobile=" + sap.ui.Device.system
				.phone + ")/$value";
			return sap.m.URLHelper.redirect(s, true)
		},
		//setthakorn start
		_salaryInit: function () {
			var r = this.getView().getModel("oUser").getData().Pernr;
			this.getView().getModel().read("/SalaryCheckSet(PERNR='" + r + "',CHECKFLAG=true)", {
				success: function (e) {
					var v = new sap.ui.model.json.JSONModel(e);
					s.getView().setModel(v, "oCheck");
					var w = s.getView().getModel("oCheck").getData().FLAG;
					if (w == false) {
						var today = new Date();
						var mm = today.getMonth() + 1; //January is 0!
						mm = '10'; // for test month
						var yyyy = today.getFullYear();
						if (mm < 10 && mm > 3) {
							s.getView().getModel("screenModel").setProperty("/april", true);
							s.getView().getModel("screenModel").setProperty("/october", false);
							s.getView().getModel("screenModel").setProperty("/notperiod", false);
						} else {
							s.getView().getModel("screenModel").setProperty("/april", false);
							s.getView().getModel("screenModel").setProperty("/october", true);
							s.getView().getModel("screenModel").setProperty("/notperiod", false);
							if (mm > 3) {
								yyyy = yyyy + 1;
							}
						}
						s.getView().getModel("screenModel").setProperty("/year", yyyy);
					}
					s.getView().getModel("screenModel").setProperty("/auth", true);
					var o = s.getView().getModel("oUser").getData().AdminFlag;
					if (w == true) {
						if (o == false) {
							s.getView().getModel("screenModel").setProperty("/notperiod", true);
						}
					}
				},
				error: function (e) {}
			});
		},
		//setthakorn End
		// Setthakorn 19/02/2020
		findDuplicate: function (e) {
			var t = [];
			for (var r = 0; r <= e.length; r++) {
				if (t[e[r]] === undefined) {
					t[e[r]] = 1
				} else {
					return true
				}
			}
			return false
		},
		_onConfirmList3: function () {
			var e = this.getView().getModel("mVisa").getData();
			var t = e.CountryKey;
			this.lvCountry = t;
			var o = r.DateFormatterGW(new Date);
			var a = r.DateFormatterGW(e.DepartureDate);
			var i = r.DateFormatterGW(e.ReturnDate);
			var l = r.DateFormatterGW(e.BackToWorkDate);
			if (r.isNullOrBlank(t)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.Country"))
			} else if (r.isNullOrBlank(a)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.Begda"))
			} else if (r.isNullOrBlank(i)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.Endda"))
			} else if (r.isNullOrBlank(l)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.Return"))
			} else if (r.isNullOrBlank(e.ReasonKey)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.Reason"))
			} else if (i < a) {
				sap.m.MessageBox.error(s.I18N.getText("Error.Date1"))
			} else if (l < i) {
				sap.m.MessageBox.error(s.I18N.getText("Error.Date2"))
			} else if (a < o) {
				sap.m.MessageBox.error(s.I18N.getText("Error.OldDate"))
			} else {
				this.onDialog("ConfirmVisa")
			}
		},
		CloseDialog: function (e) {
			var t = e;
			this.mDialogs = this.mDialogs || {};
			var r = this.mDialogs[t];
			r.close();
			s.clearModel()
		},
		onDialog: function (e) {
			var t = e;
			this.mDialogs = this.mDialogs || {};
			this.oDialog = this.mDialogs[t];
			if (this.oDialog === null || this.oDialog === undefined) {
				this.oDialog = sap.ui.xmlfragment("com.cu.py.zhrpyb001.view.Fragment.Dialog." + e, this);
				this.mDialogs[t] = this.oDialog;
				this.getView().addDependent(this.mDialogs[t])
			}
			this.oDialog.open()
		},
		readPromote: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			this.getView().getModel().read("/PromoteSet(Pernr='" + e + "')", {
				success: function (e) {
					var t = new sap.ui.model.json.JSONModel(e);
					s.getView().setModel(t, "mPromote")
				},
				error: function (e) {}
			})
		},
		readPersonnel: function (e) {
			this.getView().getModel().read("/PersonnelInfoSet('" + e + "')", {
				success: function (e) {
					var t = new sap.ui.model.json.JSONModel(e);
					s.getView().setModel(t, "mPersonalModel")
				},
				error: function (e) {}
			})
		},
		queryPeriod: function () {
			var e = this.getView().getModel();
			var t = this.getView().getModel("oUser").getData().Pernr;
			var r = new Array;
			e.read("/PeriodSet", {
				success: function (e) {
					var t = e.results;
					s.getView().getModel("mList4").setProperty("/Period", t)
				},
				error: function (e) {}
			})
		},
		queryCountry: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			var t = new Array;
			this.getView().getModel().read("/CountrySet", {
				success: function (e) {
					var t = e.results;
					var r = t.length;
					var o = s.getView().getModel("mVisa").iSizeLimit;
					if (o < r) {
						s.getView().getModel("mVisa").setSizeLimit(r)
					}
					s.getView().getModel("mVisa").setProperty("/Country", t)
				},
				error: function (e) {}
			})
		},
		queryReason: function () {
			var e = this.getView().getModel("oUser").getData().Pernr;
			var t = new Array;
			this.getView().getModel().read("/ReasonSet", {
				success: function (e) {
					var t = e.results;
					s.getView().getModel("mVisa").setProperty("/Reason", t)
				},
				error: function (e) {}
			})
		},
		onChangePeriod: function (e) {
			var t = e.getSource().mProperties.selectedKey;
			this.queryRgdir(t)
		},
		queryRgdir: function (e) {
			var t = this.getView().getModel();
			var r = this.getView().getModel("oUser").getData().Pernr;
			var o = new Array;
			s._prepareFilter(o, r, e);
			t.read("/RgdirSet", {
				filters: [new sap.ui.model.Filter(o, true)],
				success: function (e) {
					var t = e.results;
					s.getView().getModel("mList4").setProperty("/Rgdir", t)
				},
				error: function (e) {}
			})
		},
		_prepareFilter: function (e, t, r) {
			var o = new sap.ui.model.Filter({
				path: "Pernr",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: t
			});
			e.push(o);
			var a = new sap.ui.model.Filter({
				path: "Months",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: r
			});
			e.push(a)
		},
		onPernrChange: function (e) {
			var t = e.getSource();
			var o = t.getValue();
			o = o.replace(/[^\d]/g, "");
			t.setValue(o);
			var a = this.getView().getModel("mPersonalModel").getData().Pernr;
			this.initModel();
			s.getView().getModel("screenModel").setProperty("/admin", true);
			s.lvPernr = a;
			if (r.isNullOrBlank(a)) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else if (parseFloat(a) == 0) {
				sap.m.MessageBox.error(s.I18N.getText("Error.NoPernr"))
			} else {
				this.getView().getModel("oUser").setProperty("/Pernr", a);
				s.readPromote();
				this.getView().getModel().read("/F4EmployeeSet(Pernr='" + a + "',ApplCode='ZHRPAB003')", {
					success: function (e) {
						s.readPersonnel(a);
						s.getView().getModel("screenModel").setProperty("/auth", true)
					},
					error: function (e) {
						s.getView().getModel("screenModel").setProperty("/auth", false);
						var t = JSON.parse(e.responseText);
						if (t.error.innererror.errordetails.length > 0) {
							var r = jQuery.extend(true, {}, t.error.innererror)
						}
						sap.m.MessageBox.error(r.errordetails[0].message)
					}
				})
			}
		},
		getSearchHelp: function () {
			this.getView().setBusy(true);
			var e = this;
			this.getView().getModel().read("/F4EmployeeSet", {
				filters: [new sap.ui.model.Filter("ApplCode", "EQ", "ZHRPAB003")],
				success: function (t) {
					e.getView().setBusy(false);
					e.getView().getModel(e.C_MODEL_NAME.valueHelpModel).setProperty("/valueHelp", t.results);
					e.callValueHelpDialog(t.results)
				},
				error: function (t) {
					sap.m.MessageToast.show(e.I18N.getText("msgF4Employee"));
					e.getView().setBusy(false)
				}
			})
		},
		callValueHelpDialog: function (e) {
			var t = this;
			var o = this.getView().byId("PernrID");
			var a = [];
			var i = t.getOwnerComponent().getModel();
			var l = {
				compactUi: true,
				basicSearchText: "",
				title: s.I18N.getText("EMPLOYEE"),
				key: "Pernr",
				descriptionKey: "{NameFirst} {NameLast}",
				supportMultiselect: false,
				supportRanges: false,
				supportRangesOnly: false,
				rangesKeyFields: [],
				callbackFunction: {
					ok: function (e) {
						var t = e.getParameter("tokens")[0];
						o.setValue(t.getProperty("key"));
						o.fireChange()
					},
					cancel: null,
					afterClose: null
				},
				columns: [{
					label: t.I18N.getText("ibEmployeeId"),
					template: "Pernr",
					demandPopin: true
				}, {
					label: t.I18N.getText("FIRSTNAME"),
					template: "Vorna",
					demandPopin: true
				}, {
					label: t.I18N.getText("SURNAME"),
					template: "Nachn",
					demandPopin: true
				}, {
					label: t.I18N.getText("columnOrg"),
					template: "OrgehText",
					demandPopin: true
				}],
				datas: e,
				basicTokens: a,
				filterMode: false,
				filterGroupItems: [{
					groupTitle: "",
					groupName: "group1",
					name: "Vorna",
					label: t.I18N.getText("FIRSTNAME") + " (*)",
					control: new sap.m.Input,
					operation: "Contains",
					uppercaseSearch: true
				}, {
					groupTitle: "",
					groupName: "group1",
					name: "Nachn",
					label: t.I18N.getText("SURNAME") + " (*)",
					control: new sap.m.Input,
					operation: "Contains",
					uppercaseSearch: true
				}]
			};
			r.ValueHelpDialog.Show(l)
		},
		_acceptList4: function () {
			this.CloseDialog("Dialog9");
			var e = this.list4;
			var t = e.Pernr;
			var r = e.Seqnr;
			var o = this.getView().getModel().sServiceUrl + "/PayslipSet(Pernr='" + t + "',Seqnr='" + r + "',Mobile=" + sap.ui.Device.system.phone +
				")/$value";
			return sap.m.URLHelper.redirect(o, true)
		},
		onItemPress: function (e) {
			var t = e.getParameter("listItem");
			var r = t.getBindingContextPath();
			this.list4 = this.getView().getModel("mList4").getProperty(r);
			s.onDialog("Dialog9")
		},
		_onInputValueHelpRequest: function (e) {
			var t = this.getView().getModel(this.C_MODEL_NAME.valueHelpModel).getProperty("/valueHelp");
			if (t && t.length > 0) {
				this.callValueHelpDialog(t)
			} else {
				this.getSearchHelp()
			}
		},
		clearModel: function () {
			var e = [{
				CountryKey: "",
				Delete: false,
				Add: true
			}];
			this.getView().getModel("mCombobox").setData(e);
			var t = {
				Pernr: "",
				CountryName: "",
				CountryKey: "",
				DepartureDate: null,
				ReturnDate: null,
				BackToWorkDate: null,
				ReasonKey: "",
				ReasonName: ""
			};
			var r = new sap.ui.model.json.JSONModel(t);
			this.getView().setModel(r, "mVisa");
			var o = {
				index: 0
			};
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, o)), "mformth");
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, o)), "mPrevTH");
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, o)), "mPrevEN");
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, o)), "mPrevVisa");
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, o)), "mPrevPayslip")
		},
		initModel: function () {
			var e = [{
				CountryKey: "",
				Delete: false,
				Add: true,
				Index: "1"
			}];
			var t = new sap.ui.model.json.JSONModel(e);
			this.getView().setModel(t, "mCombobox");
			var r = new sap.ui.model.json.JSONModel;
			this.getView().setModel(r, this.C_MODEL_NAME.valueHelpModel);
			var o = {
				valueHelp: []
			};
			this.getView().getModel(this.C_MODEL_NAME.valueHelpModel).setData(o);
			var a = {
				Pernr: "",
				Name: "",
				PersgText: "",
				PlansText: "",
				PerskText: "",
				OrgehText: "",
				WerksText: "",
				OfficeNo: "",
				MobileNo: "",
				CuEmail: ""
			};
			var s = new sap.ui.model.json.JSONModel(a);
			this.getView().setModel(s, "mPersonalModel");
			var i = {
				ApplCode: "",
				Pernr: "",
				EssFlag: "",
				MssFlag: "",
				AdminFlag: ""
			};
			var l = new sap.ui.model.json.JSONModel(i);
			this.getView().setModel(l, "oUser");
			var n = {
				admin: false,
				auth: false,
				april: false, //setthakorn
				october: false, //setthakorn
				notperiod: false //setthakorn
			};
			var g = new sap.ui.model.json.JSONModel(n);
			this.getView().setModel(g, "screenModel");
			var u = {
				Country: ""
			};
			var d = {};
			var m = new sap.ui.model.json.JSONModel(d);
			this.getView().setModel(m, "mList4");

			var m50Bis = new sap.ui.model.json.JSONModel({});
			this.getView().setModel(m50Bis, "m50Bis");

			var p = {};
			var c = new sap.ui.model.json.JSONModel(p);
			this.getView().setModel(c, "mCountry");
			var M = {
				Pernr: "",
				CountryName: "",
				CountryKey: "",
				DepartureDate: null,
				ReturnDate: null,
				BackToWorkDate: null,
				ReasonKey: "",
				ReasonName: ""
			};
			var h = new sap.ui.model.json.JSONModel(M);
			this.getView().setModel(h, "mVisa");
			var v = {};
			var f = new sap.ui.model.json.JSONModel(v);
			this.getView().setModel(f, "mPromote");
			var V = {
				index: 0
			};

			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, V)), "mformth");
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, V)), "mPrevTH");
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, V)), "mPrevEN");
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, V)), "mPrevVisa");
			this.getView().setModel(new sap.ui.model.json.JSONModel(jQuery.extend({}, V)), "mPrevPayslip");
		},
		onPressDel: function (e) {
			var t = this.getView().getModel("mCombobox").getData();
			var r = e.getSource().getBinding("visible").getContext().sPath.replace("/", "");
			t.splice(r, 1);
			this.getView().getModel("mCombobox").setData(t)
		},
		onPressAdd: function () {
			var e = this.getView().getModel("mCombobox").getData();
			var t = e.length + 1;
			var r = {
				CountryKey: "",
				Delete: true,
				Add: false,
				Index: t
			};
			e.push(r);
			this.getView().getModel("mCombobox").setData(e)
		},
		onInit: function () {
			var today = new Date();
			s = this;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			this.I18N = this.getOwnerComponent().getModel("i18n").getResourceBundle()
		}
	})
}, true);