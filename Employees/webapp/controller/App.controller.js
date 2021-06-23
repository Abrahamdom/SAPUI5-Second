sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, Filter, FilterOperator) {
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
        
        function onFilter(){
            //La recomendación es ir trabajando con los modelos, así que obtenemos los datos de los modelos vinculados en la vista y trabajamos con esos valores.
            //Para obtener los datos
            var oJSON = this.getView().getModel().getData();
            var filters = [];

            if(oJSON.EmployeeId !== ""){
                //Agregamos al arreglo filter los datos que son iguales al modelo JSON.EmployeeId, comparandolos con los datos dentro del fichero Employees.json
                //new sap.ui.model.Filter(vFilterInfo, vOperator?, vValue1?, vValue2?)
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId))
            };

            if(oJSON.CountryKey !== ""){
                filters.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey))
            };

            //Obtengo la vista y por el identificador obtengo la tabla
            var oList = this.getView().byId("tableEmployee");
            //getBinding -> devuelve el enlace al que pertenece éste contexto
            //De la tabla obtengo la propiedad "items" para agregar el filtro
            var oBinding = oList.getBinding("items");
            //Al método filter le pasamos el arreglo filters
            oBinding.filter(filters);

        };

        function onClearFilter(){
            //Obtengo el modelo y le asigno datos en blanco
            var oModel = this.getView().getModel();
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");
        };

        //Para recibir el objeto del evento, tenemos que poner dentro del parentesis de la funcion "oEvent"
        function showPostalCode(oEvent){
            
            //Esta función nos va a indicar cual botón pulso el usuario, para ésto tenemos que obtener su objeto JSON para identificar cual presionó.

            //Del evento obtenemos con getSource el valor actual de la fuente de la propiedad, es decir, el botón que fué presionado
            var itemPressed = oEvent.getSource();
            //getBindingContext se usa para obtener el contexto de enlace de éste objeto para el nombre de modelo dado
            var oContext = itemPressed.getBindingContext();
            //getObject -> Devuelve un objeto JSON que es una copia de los datos de la entidad a los que hace referencia el sPath y oContext.
            //getObject ( sPath , oContext ?, mParameters ?)
            //Es decir, para obtener el objeto en contexto, primero tenemos que obtene la fuente del objeto, luego el contexto del objeto para después obtener el objeto JSON
            var objectContext = oContext.getObject();

            //Con MessageToast.show() mostramos un mensaje de tipo toast, dentro de los parentesis colocamos el objeto JSON que obtuvimos y le agregamos la propiedad PostalCode
            //  para que nos muestre esa propiedad en el mensaje.
            sap.m.MessageToast.show(objectContext.PostalCode);

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
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;                            

        return Main;
	});
