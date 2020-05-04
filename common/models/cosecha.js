'use strict';

module.exports = function(Cosecha) {
    Cosecha.observe('after save', async (ctx) => {
        try {
            
            let Inventario = Cosecha.app.models.Inventario;
            let Bitacora = Cosecha.app.models.Bitacora;
            let Cultivo = Cosecha.app.models.Cultivo;
            if (ctx.isNewInstance) {
                // Crea la instancia del cultivo
                let data = {
                    cosechaId: ctx.instance.id,
                    tipo_cultivo: ctx.instance.tipo_cultivo,
                    temporada: ctx.instance.temporada,
                    hectareas: ctx.instance.hectareas,
                    costo_inicial: ctx.instance.costo_inicial,
                    fecha_siembra: ctx.instance.fecha_siembra
                }
                let res = await Cultivo.create(data);
                res ? console.log('Cultivo registrado') : console.log('Cultivo no registrado');
                // Crea la instancia de la bitacora
                data = {
                    cosechaId: ctx.instance.id,
                    plagas: ctx.instance.plagas,
                    crecimiento: ctx.instance.crecimiento,
                    mano_obra: ctx.instance.mano_obra,
                    clima: ctx.instance.clima,
                    fecha_siembra: ctx.instance.fecha_siembra 
                }
                res = await Bitacora.create(data);
                res ? console.log('Bitacora registrada') : console.log('Bitacora no registrada');
    
                // data = {
                //     AppUserId: ctx.instance.AppUserId,
                //     comentarios: ctx.instance.comentarios
                // }
                // await Cosecha.replaceById(ctx.instance.id, data);
            } else {
                
            }
        } catch (e) {
            console.log(e);
            return e;
        }
    });
};
