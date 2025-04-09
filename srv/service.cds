using { Test as my } from '../db/schema.cds';

@path : '/service/TestService'
service TestService
{
    @odata.draft.enabled
    entity Cliente as
        projection on my.Cliente;

    @odata.draft.enabled
    entity equipment as
        projection on my.equipment
        {
            *
        }
        excluding
        {
            partner,
            catalogProfile,
            report,
            failure,
            items,
            timereport
        };

    @odata.draft.enabled
    entity sistemas as
        projection on my.sistemas
        {
            *
        }
        excluding
        {
            failure,
            partes,
            fallas,
            catalogProfile
        };

    @odata.draft.enabled
    entity partes as
        projection on my.partes
        {
            *
        }
        excluding
        {
            failure,
            maintNotifObjPartCodeGroup
        };

    @odata.draft.enabled
    entity fallas as
        projection on my.fallas
        {
            *
        }
        excluding
        {
            failure,
            maintNotifOvwDamageCodeGroup
        };

    @odata.draft.enabled
    entity failure as
        projection on my.failure
        {
            *
        }
        excluding
        {
            equipo,
            sistemas,
            partes,
            fallas,
            files
        };

    @odata.draft.enabled
    entity files as
        projection on my.files
        {
            *
        }
        excluding
        {
            failure,
            report
        };

    @odata.draft.enabled
    entity items as
        projection on my.items
        {
            *
        }
        excluding
        {
            equipment,
            report
        };

    @odata.draft.enabled
    entity report as
        projection on my.report
        {
            *
        }
        excluding
        {
            equipment,
            files,
            items
        };

    @odata.draft.enabled
    entity employee as
        projection on my.employee
        {
            *
        }
        excluding
        {
            equipment,
            timereport
        };

    @odata.draft.enabled
    entity proyOrder as
        projection on my.proyOrder
        {
            *
        }
        excluding
        {
            grafOrder
        };

    @odata.draft.enabled
    entity grafOrder as
        projection on my.grafOrder
        {
            *
        }
        excluding
        {
            serviceDocId,
            operMain
        };

    @odata.draft.enabled
    entity operMaint as
        projection on my.operMaint
        {
            *
        }
        excluding
        {
            maintenanceOrder,
            timereport
        };

    @odata.draft.enabled
    entity timeReportProy as
        projection on my.timeReportProy
        {
            *
        }
        excluding
        {
            equipment,
            employee,
            report
        };

    @odata.draft.enabled
    entity NotificacionesEnviadas as
        projection on my.NotificacionesEnviadas;

    @odata.draft.enabled
    entity NotificacionesEnviadasTiempos as
        projection on my.NotificacionesEnviadasTiempos;

    @odata.draft.enabled
    entity Proyects as
        projection on my.Proyects
        {
            *
        }
        excluding
        {
            grafProyects
        };

    @odata.draft.enabled
    entity grafProyects as
        projection on my.grafProyects
        {
            *
        }
        excluding
        {
            ProjectExternalID,
            ProyectsActivities
        };

    @odata.draft.enabled
    entity ProyectsActivities as
        projection on my.ProyectsActivities
        {
            *
        }
        excluding
        {
            ProjectNetwork
        };
}

annotate TestService with @requires :
[
    'authenticated-user'
];
