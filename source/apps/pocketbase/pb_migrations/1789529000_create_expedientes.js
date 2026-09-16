/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const users = app.findCollectionByNameOrId("users");

    let collection;
    try {
      collection = app.findCollectionByNameOrId("expedientes");
    } catch (_) {
      collection = new Collection({
        type: "base",
        name: "expedientes",
        // Los expedientes, incluido el precio y las notas, son privados del administrador.
        listRule: "@request.auth.role = 'admin'",
        viewRule: "@request.auth.role = 'admin'",
        createRule: "@request.auth.role = 'admin'",
        updateRule: "@request.auth.role = 'admin'",
        deleteRule: "@request.auth.role = 'admin'",
        fields: [
          {
            name: "owner",
            type: "relation",
            required: true,
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: true,
          },
          { name: "servicio", type: "text", required: true, max: 160 },
          { name: "precio", type: "number", min: 0 },
          {
            name: "status",
            type: "select",
            required: true,
            maxSelect: 1,
            values: ["prospecto", "en_proceso", "pausado", "completado"],
          },
          { name: "notas", type: "text", max: 2000 },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
        indexes: ["CREATE INDEX `idx_expedientes_owner` ON `expedientes` (`owner`)"],
      });
      app.save(collection);
    }
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId("expedientes");
      app.delete(collection);
    } catch (e) {
      if (e.message.includes("no rows in result set")) return;
      throw e;
    }
  },
);
