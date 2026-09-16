/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const collection = new Collection({
      type: "view",
      name: "horarios_ocupados",
      // Solo fecha y hora: no se divulgan datos de otras personas.
      viewQuery: "SELECT id, fecha, hora FROM citas WHERE status != 'cancelada'",
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
    });
    app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("horarios_ocupados");
    app.delete(collection);
  },
);
