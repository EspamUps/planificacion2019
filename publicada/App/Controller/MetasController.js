﻿angular.module('appGestion')
    .controller('MetasController', function ($cookies, IntervalosServices, MetasServices,
        ProgramacionesServices, EvidenciasServices, IndicadoresServices, $scope) {
        var vm = this;
        vm.status = $cookies.status;
        vm.off9 = [];
        vm.Observacion = [];
        vm.porcentaje = [];
        valorP = 0;
        mensaje = "";
        vm.prt1 = "";
        vm.prt2 = "";
        vm.detallesMeta = {};
        vm.mes = 00;
        vm.observacion = {};
        vm.modalIndicador = {};
        vm.uploadfile = {};
        vm.file = {};
        cargarIntervalos();
        cargarIntervalosPEDI(); 
        cargarMetasProgramacion();
        cargarIndicadores();
        vm.arrOptionSelects = [];
        vm.arrOptionObjEstrategicos = [];
        vm.listSistemas = {};
        listPlanificacion = [];
        vm.CurrentDate = new Date();
        vm.onChnage = vm.onChnage;
        function cargarIndicadores() {            
            IndicadoresServices.getIndicadoresByDepartamento().then(function (response) {
                vm.listadoIndicadores = response.data.listIndicadores;                
                
            })
        }       
        vm.cargarMetas = function (id, indicador) {
            var requestResponse = MetasServices.getMetasbyIndicador(id);
            requestResponse.then(function successCallback(response) {                
                vm.arrOptionSelects = [];
                angular.forEach(response.data.listTipoCalificacion, function (value, key) {
                    vm.arrOptionSelects.push(value);
                });
                vm.appstate = 'showAdd';
                vm.listadoMetas = response.data.listMetas
                vm.modalMetas.IndicadorId = id;
                vm.Indicador = indicador;
            });
        }
        vm.ventanaMeta = function () {
            $('.modal ').insertAfter($('body'));
            vm.modalMetas.Descripcion = "";
        };
        vm.ventanaModalMeta = function (metas) {            
            $('.modal ').insertAfter($('body'));
            vm.modalMetas.Descripcion = metas.Descripcion;
            vm.modalMetas.tipoCalificacionId = metas.tipoCalificacionId;
            vm.modalMetas.id = metas.id;
        }
        vm.addMetas = function () {
            var requestResponse = MetasServices.addMetas(vm.modalMetas);
            requestResponse.then(function successCallback(response) {
                var requestResponse = MetasServices.getMetasbyIndicador(vm.modalMetas.IndicadorId);
                requestResponse.then(function successCallback(response) {
                    vm.listadoMetas = response.data.listMetas
                });
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.modalMetas.Descripcion = "";
                $('.modal').modal('hide');
            });
        }
        vm.updateMeta = function () {
            var requestResponse = MetasServices.updateMetas(vm.modalMetas.id, vm.modalMetas.Descripcion, vm.modalMetas.tipoCalificacionId );
            requestResponse.then(function successCallback(response) {
                var requestResponse = MetasServices.getMetasbyIndicador(vm.modalMetas.IndicadorId);
                requestResponse.then(function successCallback(response) {
                    vm.listadoMetas = response.data.listMetas
                });
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
                vm.modalMetas.Descripcion = "";
                $('.modal').modal('hide');
            });
        }
        vm.deleteMeta = function (id, index) {
            vm.listadoMetas.splice(index, 1);
            var requestResponse = MetasServices.deleteMetas(id);
            requestResponse.then(function successCallback(response) {
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
            });
        }
        cargarMetaEjecución();
        cargarMetaEjecuciónPEDI()
        vm.status = $cookies.status;
        function cargarIntervalosPEDI() {
            IntervalosServices.getIntervalosPEDI().then(function (response) {
                vm.listadoIntervalosPEDI = response.data.listIntervalos;
                vm.year = [];
                vm.listadoIntervalosPEDI.forEach(function (element, index) {
                    vm.year[index] = element.descripcion;
                });

            })
        }
        function cargarIntervalos() {
            IntervalosServices.getIntervalos().then(function (response) {
                vm.listadoIntervalos = response.data.listIntervalos;
                vm.year=[];
                vm.listadoIntervalos.forEach(function (element, index) {
                    vm.year[index] = element.descripcion;
                });

            })
        }
        function cargarMetasProgramacion() {
            MetasServices.getMetasProgramacion().then(function (response) {
                vm.listadoMetasProgramaciones = response.data.listMetasProgramacion;
            })
        }
        function cargarMetaEjecución() {
            MetasServices.getMetasEjecucion().then(function (response) {
                vm.listadoMetasEjecucion = response.data.listMetasEjecucionn;
            })
        }   
        function cargarMetaEjecuciónPEDI() {
            MetasServices.getMetasEjecucionPEDI().then(function (response) {
                vm.listadoMetasEjecucionPEDI = response.data.listMetasEjecucionn;
            })
        }   
        vm.detalleIndicador = function (id) {
            var requestResponse = IndicadoresServices.getIndicadorDetalle(id);
            requestResponse.then(function successCallback(response) {
                $('.modal ').insertAfter($('body'));
                vm.modalIndicador.ObjetivoEstrategico = response.data.detalleIndicador['0'].Objetivo_Estrategico;
                vm.modalIndicador.ObjetivoEspecifico = response.data.detalleIndicador['0'].Objetivo_Especifico;
                vm.modalIndicador.Estrategia = response.data.detalleIndicador['0'].Estrategia;
            });
        }
        vm.detalleMeta = function (id) {
            var requestResponse = MetasServices.getDetalleMeta(id);
            requestResponse.then(function successCallback(response) {
                $('.modal ').insertAfter($('body'));
                vm.detallesMeta.ObjetivoEstrategico = response.data.detalleMeta['0'].Objetivo_Estrategico;
                vm.detallesMeta.ObjetivoEspecifico = response.data.detalleMeta['0'].Objetivo_Especifico;
                vm.detallesMeta.Estrategia = response.data.detalleMeta['0'].Estrategia;
                vm.detallesMeta.Indicador = response.data.detalleMeta['0'].Indicador;
            });
        }
        vm.ObservacionDetalle = function (id) {
            var requestResponse = MetasServices.getMetasObservacion(id);
            requestResponse.then(function successCallback(response) {
                $('.modal ').insertAfter($('body'));
                vm.observacion.id = response.data.listObservacion['0'].id;
                vm.observacion.Descripcion = response.data.listObservacion['0'].Descripcion;
                vm.observacion.Observacion = response.data.listObservacion['0'].Observacion;
            });
        }
        vm.EvidenciaUpload = function (id, meta, intervaloid) {
            $('.modal ').insertAfter($('body'));
            vm.uploadfile.idmeta = id
            vm.uploadfile.intervaloid = intervaloid
            vm.uploadfile.meta = meta
        }
        vm.updateObservacion = function () {
            var requestResponse = MetasServices.updateObservacionMeta(vm.observacion.id, vm.observacion.Observacion);
            Message(requestResponse);
        }
        vm.updateMetasProgramacion = function (Programacion,index) {
            if (vm.status == "PEDI") {
                vm.arrayprogramacion = [];
                vm.arrayprogramacion.push(
                    { id: Programacion.ID_I, valor: Programacion.I, MetasID: Programacion.MetaID },
                    { id: Programacion.ID_II, valor: Programacion.II, MetasID: Programacion.MetaID },
                    { id: Programacion.ID_III, valor: Programacion.III, MetasID: Programacion.MetaID },
                    { id: Programacion.ID_IV, valor: Programacion.IV, MetasID: Programacion.MetaID },
                    { id: Programacion.ID_V, valor: Programacion.V, MetasID: Programacion.MetaID },
                );
                var requestResponse = ProgramacionesServices.updateProgramacionesPEDI(vm.arrayprogramacion);
                Message(requestResponse);
            } else {
                vm.arrayprogramacion = [];
                vm.arrayprogramacion.push(
                    { id: Programacion.ID_I, valor: Programacion.I, MetasID: Programacion.MetaID },
                    { id: Programacion.ID_II, valor: Programacion.II, MetasID: Programacion.MetaID },
                    { id: Programacion.ID_III, valor: Programacion.III, MetasID: Programacion.MetaID },
                    { id: Programacion.ID_IV, valor: Programacion.IV, MetasID: Programacion.MetaID },
                );
                var total = 0;
                for (var i = 0; i < vm.arrayprogramacion.length; i++) {
                    var total = total + parseInt(vm.arrayprogramacion[i].valor);
                }
                cont = 0;
                for (var j = 0; j < vm.arrayprogramacion.length; j++) {
                    cont += 1;
                    if (vm.arrayprogramacion[j].valor != 0) {
                        vm.tiempoMeta[index + "" + vm.arrayprogramacion[j].MetasID] = 3 * cont;
                    }
                }
                if (total == 100) {
                    var requestResponse = ProgramacionesServices.updateProgramacionesPOA(vm.arrayprogramacion, Programacion.MetaID, Programacion.Presupuesto );
                    Message(requestResponse);
                } else {
                    $.notify({
                        icon: "notifications",
                        message: "<b>Error: </b> La suma de la planificación es menor o mayor a 100%"
                    }, {
                            type: 'danger',
                            timer: 10,
                            placement: {
                                from: 'top',
                                align: 'right'
                            }
                        }
                    );
                }
            }

        }
        vm.updateMetasEjecucion = function (id, MetaID, valor) {
            if (valor > valorP) {
                mensaje = "exceso";
            } if (valor < valorP){
                mensaje = "no cumplimiento";
            }
  
            if (valorP != valor) {
                    swal({
                        title: "<span style='font-size:14px;'>Escriba una observación por el "+mensaje+" de la planificación :<span>",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        html:
                        '<input id="swal-input1" class="swal2-input">',
                        preConfirm: function () {
                            return new Promise(function (resolve) {
                                resolve([
                                    $('#swal-input1').val()
                                ])
                            })
                        },
                        onOpen: function () {
                            $('#swal-input1').focus()
                        }
                    }).then(function (result) {
                        var requestResponse = ProgramacionesServices.updateEjecucionPOA(id, MetaID, valor, result[0]);
                        requestResponse.then(function successCallback(response) {
                            swal({
                                title: 'Correcto!',
                                text: response.data.mensaje,
                                type: 'success',
                                confirmButtonClass: "btn btn-success",
                                buttonsStyling: false
                            })
                            vm.getObservacionEjecucion(MetaID, id);
                            vm.cumplimiento(MetaID);
                        }, function errorCallback(response) {
                            swal({
                                title: 'Error!',
                                text: 'Error',
                                type: 'error',
                                confirmButtonClass: "btn btn-danger",
                                buttonsStyling: false
                            })
                        });
                       
                    }).catch(swal.noop)
                } else {
                    var requestResponse = ProgramacionesServices.updateEjecucionPOA(id, MetaID, valor, null);
                    requestResponse.then(function successCallback(response) {
                        swal({
                            title: 'Correcto!',
                            text: response.data.mensaje,
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        })
                        vm.getObservacionEjecucion(MetaID, id);
                        vm.cumplimiento(MetaID);
                    }, function errorCallback(response) {
                        swal({
                            title: 'Error!',
                            text: 'Error',
                            type: 'error',
                            confirmButtonClass: "btn btn-danger",
                            buttonsStyling: false
                        })
                    });
             }
        }
        vm.uploadFile = function () {
            var fileInput = $('#file');
            var fileData = fileInput.prop("files")[0];
            EvidenciasServices.uploadFile(fileData, vm.uploadfile.idmeta, vm.uploadfile.intervaloid).then(function (res) {
                if (res.data.estado == false) {
                    swal({
                        title: 'Error!',
                        text: res.data.mensaje,
                        type: 'error',
                        confirmButtonClass: "btn btn-danger",
                        buttonsStyling: false
                    })
                    this.upload.reset();
                }else {
                    swal({
                        title: 'Correcto!',
                        text: res.data.mensaje,
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    })
                    $('.modal').modal('hide');
                    this.upload.reset();
                }
             
            })
        }
        function Message(requestResponse) {
            requestResponse.then(function successCallback(response) {
                swal({
                    title: 'Correcto!',
                    text: response.data.mensaje,
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
            }, function errorCallback(response) {
                swal({
                    title: 'Error!',
                    text: 'Error',
                    type: 'error',
                    confirmButtonClass: "btn btn-danger",
                    buttonsStyling: false
                })
            });
        }
        vm.searhPlanificacion = function (idmeta, id) {
            vm.off9 = [];
            ProgramacionesServices.getTrismetrePlanificiacion(idmeta, id).then(function (response) {
                vm.off9[id + "" + idmeta] = response.data.planifiacion.planificacion;
                valorP = response.data.planifiacion.planificacion;
                vm.getObservacionEjecucion(idmeta, id);
                switch (vm.off9[id + "" + idmeta]) {
                    case '110':
                        vm.off9[id + "" + idmeta] = "Satisfactorio";
                        break;
                    case '220':
                        vm.off9[id + "" + idmeta] = "Medio Satisfactorio";
                        break;
                    case '330':
                        vm.off9[id + "" + idmeta] = "Deficiente";
                        break;
                    default:
                       
                        break;
                }
            })
           
        }
        vm.updatePresupuestoEjecutado = function (metaID, P_Ejecutado, ) {
            var requestResponse = ProgramacionesServices.updatePresupuesto(metaID, P_Ejecutado, );
            Message(requestResponse);
        }
        vm.getObservacionEjecucion = function (metadid, id) {
            $('.modal ').insertAfter($('body'));
            var requestResponse = ProgramacionesServices.getObservacion(metadid, id);
            requestResponse.then(function successCallback(response) {
                    vm.Observacion[id + "" + metadid] = response.data.observacion['0'].observacion;
                    vm.prt1 = metadid;
                    vm.prt2 = id;
                 });    
        }
        vm.cumplimiento = function (idmeta) {
            var requestResponse = ProgramacionesServices.getCumplimiento(idmeta);
            requestResponse.then(function successCallback(response) {
                vm.porcentaje[idmeta] = response.data.cumplimiento;
            }); 
          
          }
    });