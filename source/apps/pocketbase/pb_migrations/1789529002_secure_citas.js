/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const citas = app.findCollectionByNameOrId("citas");
    citas.createRule =
      "@request.auth.id != '' && @request.body.owner = @request.auth.id && @request.body.status = 'pendiente'";
    citas.updateRule =
      "@request.auth.role = 'admin' || (owner = @request.auth.id && @request.body.owner:changed = false && @request.body.fecha:changed = false && @request.body.hora:changed = false && @request.body.servicio:changed = false && @request.body.notas:changed = false && @request.body.status = 'cancelada')";
    citas.deleteRule = "@request.auth.role = 'admin'";
    app.save(citas);
  },
  (app) => {
    const citas = app.findCollectionByNameOrId("citas");
    citas.createRule = "@request.auth.id != ''";
    citas.updateRule =
      "@request.auth.id != '' && (@request.auth.id = owner || @request.auth.role = 'admin')";
    citas.deleteRule =
      "@request.auth.id != '' && (@request.auth.id = owner || @request.auth.role = 'admin')";
    app.save(citas);
  },
);
