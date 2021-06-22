sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

        function onInit(){
            //Creamos un nuevo modelo JSON
            var oJSONModel = new sap.ui.model.json.JSONModel();
            //Obtenemos la intancia de la vista del controlador
            var oView = this.getView();
            //Con la vista del controlador, obtenemos el modelo i18n para después obtener los recursos del modelo.
            var i18nBundle = oView.getModel("i18n").getResourceBundle();

            //Usamos el método loadData para cargar los datos desde el fichero Employees.json y ponemos bAsync con false para esperar hasta que se cargan los datos en el fichero
            //loadData(sURL: string, oParameters?: string | object, bAsync?: boolean, sType?: string, bMerge?: boolean, bCache?: boolean, mHeaders?: object);
            oJSONModel.loadData("./localService/mockdata/Employees.json","",false);
            //Para ver si los datos se han cargado correctamente podemos mostrarlos en la consola
            oJSONModel.attachRequestCompleted(function (oEventModel){
                console.log(JSON.stringify(oJSONModel.getData()));
            });            
            //Usamos la estancia de la vista para vincular el modelo oJSONModel, que ya tiene dentro del modelo los datos del objeto oJSON
            oView.setModel(oJSONModel);


        };  
            
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

        //Prototipamos la funcion onInit dentro de Main
        Main.prototype.onInit = onInit;

        return Main;
	});
