sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		var Main = Controller.extend("abrahamgroup.Employees.controller.App", {});
        
        //Prototipamos la función onValidate dentro del main y la regresamos con return.
        Main.prototype.onValidate = function() {
                                        //this (contexto de la vista).byId(llamamos con base en el id)
                                        var inputEmployee = this.byId("inputEmployee");
                                        //Obtenemos el valor del input con getValue
                                        var valueEmployee = inputEmployee.getValue();
                                    
                                        if(valueEmployee.length === 6){
                                            //inputEmployee.setDescription("Ok");
                                            //this(Contexto de la vista).setVisible(establecemos un valor en la propiedad visible)
                                            this.byId("labelCountry").setVisible(true);
                                            this.byId("slCountry").setVisible(true);
                                        }else{
                                            //inputEmployee.setDescription("Not Ok");
                                            this.byId("labelCountry").setVisible(false);
                                            this.byId("slCountry").setVisible(false);
                                        }
                                    };
        return Main;
	});
