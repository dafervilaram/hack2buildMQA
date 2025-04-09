namespace Test;

entity Cliente
{
    key ID : UUID;
    nombre : String(100);
    apellido : String(100);
    correo : String(100);
}

//  Aquí se almacenan los equipos - DATOS DE API
entity equipment
 {
    key inventoryNumber          : String(35); // Nùmero de inventario (Placa/Codigo PSL)
        assetManufacturerName    : String(30); // Marca - características del equipo
        manufacturerPartTypeName : String(20); // Modelo del equipo
        functionalLocation       : String(40); // Ubicaciòn tècnica
        equipment                : String(25); // Nùmero de equipo en el sistema
        technicalObjectType      : String(18); // Tipo de objeto tècnico
        catalog                  : String(8); // Perfil de catálogo
        partner                  : Association to employee; // Nùmero de personal responsable
        puestotrabajo            : String(10); // reporttime dato quemado "maquina"
        catalogProfile           : Association to many sistemas
                                       on catalogProfile.catalogProfile = $self; // Perfil de catalogo FOREING KEY
        report                   : Association to many report
                                       on report.equipment = $self;
        failure                  : Association to many failure
                                       on failure.equipo = $self;
        items                    : Association to many items
                                       on items.equipment = $self;
        timereport               : Association to many timeReportProy
                                       on timereport.equipment = $self;
        // timeReportMain           : Association to many timeReportMainProyects
        //                                on timeReportMain.equipment = $self;


}

// Aquí se almacenan los datos de los SISITEMAS del equipo - DATOS DE API
entity sistemas 
{
    key ID             : String(10);
        posicion       : String(6); // Contador que identifica el sistema
        sitema         : String(9); //Siglas que identifican el sistema
        descripcion    : String(20); // Descripción
        failure        : Association to many failure
                             on failure.sistemas = $self;
        partes         : Association to many partes
                             on partes.maintNotifObjPartCodeGroup = $self; // Siglas que identifican el sistema
        fallas         : Association to many fallas
                             on fallas.maintNotifOvwDamageCodeGroup = $self;
        catalogProfile : Association to equipment; // Perfil de catálogo a consultar


}

// Aquí se almacenan las PARTES de los sistemas del equipo - DATOS DE API
entity partes
 {
    key ID                            : String(10);
        maintNotifObjPartCode         : String(4); // Id de la parte del objeto
        maintNotifObjPartCtlgCodeText : String(40); // Descripción de la parte del objeto
        failure                       : Association to many failure
                                            on failure.partes = $self;
        maintNotifObjPartCodeGroup    : Association to sistemas; // Tipo de equipo


}


// Aquí se almacenan las FALLAS en el equipo - DATOS DE API
entity fallas 
{
    key ID                             : String(10); //@(Core.Computed: true);
        maintNotifOvwDamageCode        : String(4); // Id del daño
        maintNotifOvwDamageCtlgCodeTxt : String(40); // Texto del daño
        failure                        : Association to many failure
                                             on failure.fallas = $self;
        maintNotifOvwDamageCodeGroup   : Association to sistemas; // Tipo de equipo


}


// Aquí se almacenan las fallas *-* Datos desde la aplicacion *-*

entity failure 
{
    key ID          : UUID;
        fecha       : DateTime;
        comentarios : String(200);
        sistema     : String(40);
        parte       : String(200);
        falla       : String(200);
        status      : Boolean;
        equipo      : Association to equipment;
        sistemas    : Association to sistemas;
        partes      : Association to partes;
        fallas      : Association to fallas;
        files       : Association to many files
                          on files.failure = $self;

}

entity files 
{
        key ID              : UUID;
        @Core.MediaType  : mediaType
        @Core.Computed   : false
        virtual content : LargeBinary;

        @Core.IsMediaType: true
        mediaType       : String;
        fileName        : String(40);
        ID_bucket       : String(40);
        failure         : Association to failure;
        report          : Composition of many report on report.files = $self;
}


// Aquí se almacenan de selección para el reporte preoperacional *-* Datos internos
entity items 
{
    key ID          : String(10);
        equipment   : Association to equipment;
        descripcion : String(35);
        criterio1   : String(35);
        criterio2   : String(35);
        criterio3   : String(35);
        report      : Association to report;


}

// Aqui se almacenan los reportes preoperacionales *-* Datos desde la aplicacion *-*
entity report 
{
    key ID                                : UUID;
        fecha                             : DateTime;
        kilometraje_Horometro             : Integer;
        ubicacion                         : String(35);
        aceite_y_combustible              : String(35);
        liquido_refrigerante              : String(35);
        nivel_agua                        : String(35);
        liquido_frenos                    : String(35);
        tapa_radiador_tanque              : String(35);
        Cables_correas_mangueras          : String(35);
        Bateria_cables_bornes             : String(35);
        suspencion_gatos_muelles_anclajes : String(35);
        luces_bajas                       : String(35);
        luces_altas                       : String(35);
        luces_internas                    : String(35);
        direccionales_frente              : String(35);
        direccionales_atras               : String(35);
        faros_freno                       : String(35);
        faros_exploradoras                : String(35);
        luces_parqueo                     : String(35);
        extintor                          : String(35);
        gato_cruceta_copa_perno           : String(35);
        linterna_lamparas                 : String(35);
        kit_herramientas_completa         : String(35);
        kit_derrames_completo             : String(35);
        cables_arranque                   : String(35);
        senalizacion                      : String(35);
        estado_llantas_rines              : String(35);
        llantas_repuesto_fijas            : String(35);
        labrado_llantas                   : String(35);
        espejos_laterales                 : String(35);
        parabrisas_escobillas             : String(35);
        puertas_ventanas                  : String(35);
        latoneria_pintura                 : String(35);
        vidrios                           : String(35);
        inyectores_agua_parabrisas        : String(35);
        antena_gps_otros                  : String(35);
        identificacion_carga              : String(35);
        aire_acondicionado                : String(35);
        asientos_apoya_cabezas_tapiceria  : String(35);
        elevavidrios_manivelas            : String(35);
        cinturones_seguridad              : String(35);
        puertas                           : String(35);
        bocina_pito                       : String(35);
        alarma_retroceso                  : String(35);
        botiquin                          : String(35);
        asa                               : String(35);
        placas                            : String(35);
        cuerpo                            : String(35);
        quijadas_laterales                : String(35);
        alineamiento                      : String(35);
        mantenimiento                     : String(35);
        comentarios                       : String(35);
        status                            : Boolean;
        equipment                         : Association to equipment;
        files                             : Association to files;
        items                             : Association to many items
                                                on items.report = $self;

}

// Aquí se almacenan los datos del empleado responsable - DATOS DE API
entity employee 
{
    key pernr                  : String(8); // Id del empleado en SAP
        bukrs                  : String(4); // Sociedad
        werks                  : String(4); // Centro
        persk                  : String(2); // Subdivisión del personal
        sname                  : String(30); // Nombres
        ename                  : String(40); // Nombre completo
        puestotrabajo          : String(10); // reporttime dato quemado "Persona"
        equipment              : Association to many equipment
                                     on equipment.partner = $self;
        timereport             : Association to many timeReportProy
                                     on timereport.employee = $self;
        // timeReportMainProyects : Association to many timeReportMainProyects
        //                              on timeReportMainProyects.employee = $self;


}


entity proyOrder 
{
    key serviceOrder                 : String(11); // Id orden de servicios
        purchaseOrderByCustomer      : String(35); // Referencia externa
        serviceOrderDescription      : String(35); // descripcion del servicio
        soldToParty                  : String(10); // id del cliente
        serviceReferenceEquipment    : String(25); // id del equipo
        serviceRefFunctionalLocation : String(40); //ubicacion tecnica
        tipoProyecto                 : String(40);
        grafOrder                    : Association to many grafOrder
                                           on grafOrder.serviceDocId = $self;

}

entity grafOrder 
{

    key aufnr            : String(20); // Id, muestra la app
        serviceDocItemId : String(60); // posicion
        serviceDocId     : Association to proyOrder; // id orden de servicio
        operMain         : Association to many operMaint
                               on operMain.maintenanceOrder = $self;

}

entity operMaint 
{
    key ID                         : String(30);
        maintenanceOrderOperation  : String(4); // orden de operacion
        operationDescription       : String(40); // descripcion
        operationPersonResponsible : String(8); // Persona responsable
        center                     : String(10); // centro de trabajo
        puestotrabajo              : String(10); // api nueva
        plant                      : String(8); // ubicacion (colombia, peru, chile)
        maintenanceOrder           : Association to grafOrder; // orden de mtto filtro
        timereport                 : Association to many timeReportProy
                                         on timereport.report = $self;


}

entity timeReportProy 
{ //hanna reporte
    key ID                  : UUID;
        date                : Date;
        initialTime         : Time;
        finalTime           : Time;
        personas            : String(60); // descripción de list picker
        equipos             : String(60); // descripción de list picker
        comments            : String(40); // comentarios
        Tiempo              : String(10); // resta de horas
        image               : String(40);
        IsFinalConfirmation : Boolean; // confirmacion
        equipment           : Association to equipment;
        employee            : Association to employee;
        report              : Association to operMaint;
}

entity NotificacionesEnviadas 
{
    key NotificationId : String(50);
        Timestamp      : DateTime @default: current_timestamp;
}

entity NotificacionesEnviadasTiempos 
{
    key NotificationTiemposId : String(50);
        Timestamp             : DateTime @default: current_timestamp;
}

entity Proyects 
{
    key PspidEdit    : String(11); // Id orden de servicios
        Post1        : String(35); // descripcion del proyecto
        Werks        : String(10); // id del cliente
        tipoProyecto : String(40);
        grafProyects : Association to many grafProyects
                           on grafProyects.ProjectExternalID = $self;
}

entity grafProyects 
{

    key ProjectNetwork            : String(60);
        ProjectNetworkDescription : String(60); // descripcion
        ProjectExternalID         : Association to Proyects; // Id, muestra la app
        ProyectsActivities        : Association to many ProyectsActivities
                                        on ProyectsActivities.ProjectNetwork = $self;
}

entity ProyectsActivities 
{

    key ID                         : UUID;
        NetworkActivity            : String(60);
        NetworkActivityDescription : String(60); // descripcion
        ProjectNetwork             : Association to grafProyects; // Id, muestra la app
        // timeReportMainProyects     : Association to many timeReportMainProyects
        //                                  on timeReportMainProyects.report = $self;

}

// entity timeReportMainProyects { //hanna reporte
//     key ID                  : UUID;
//         date                : Date;
//         initialTime         : Time;
//         finalTime           : Time;
//         personas            : String(60); // descripción de list picker
//         equipos             : String(60); // descripción de list picker
//         transporte          : String(60);
//         comments            : String(40); // comentarios
//         Tiempo              : String(10); // resta de horas
//         image               : String(40);
//         IsFinalConfirmation : Boolean; // confirmacion
        // equipment           : Association to equipment;
        // employee            : Association to employee;
        // report              : Association to ProyectsActivities

// }






