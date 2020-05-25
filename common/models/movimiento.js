'use strict';

module.exports = function(Movimiento) {
    Movimiento.observe('before save', async (ctx) => {
        try {
            var Producto = Movimiento.app.models.Producto;
            if (ctx.isNewInstance) {
                let producto = await Producto.findById(ctx.instance.productoId);
                if (ctx.instance.tipo == 1) {
                    producto.cantidad = producto.cantidad + ctx.instance.cantidad;
                    console.log(producto.cantidad);
                    await producto.save();
                }
                if (ctx.instance.tipo == 2) {
                    producto.cantidad = producto.cantidad - ctx.instance.cantidad;
                    await producto.save();
                }
            }
        } catch (error) {
            return error;
        }
    });
};
