/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const users = app.findCollectionByNameOrId("users");

    let collection;
    try {
      collection = app.findCollectionByNameOrId("citas");
    } catch (_) {
      collection = new Collection({
        type: "base",
        name: "citas",
        // El dueño de la cita puede verla; el admin puede ver todas.
        listRule:
          "@request.auth.id != '' && (@request.auth.id = owner || @request.auth.role = 'admin')",
        viewRule:
          "@request.auth.id != '' && (@request.auth.id = owner || @request.auth.role = 'admin')",
        createRule: "@request.auth.id != ''",
        updateRule:
          "@request.auth.id != '' && (@request.auth.id = owner || @request.auth.role = 'admin')",
        deleteRule:
          "@request.auth.id != '' && (@request.auth.id = owner || @request.auth.role = 'admin')",
        fields: [
          {
            name: "fecha",
            type: "text",
            required: true,
            max: 10,
            pattern: "^\\d{4}-\\d{2}-\\d{2}$",
          },
          {
            name: "hora",
            type: "text",
            required: true,
            max: 10,
          },
          {
            name: "servicio",
            type: "text",
            max: 120,
          },
          {
            name: "status",
            type: "select",
            required: true,
            maxSelect: 1,
            values: ["pendiente", "confirmada", "cancelada"],
          },
          {
            name: "notas",
            type: "text",
            max: 500,
          },
          {
            name: "owner",
            type: "relation",
            required: true,
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: true,
          },
          {
            name: "created",
            type: "autodate",
            onCreate: true,
            onUpdate: false,
          },
          {
            name: "updated",
            type: "autodate",
            onCreate: true,
            onUpdate: true,
          },
        ],
        indexes: [
          "CREATE UNIQUE INDEX `idx_citas_slot` ON `citas` (`fecha`, `hora`) WHERE `status` != 'cancelada'",
        ],
      });
      app.save(collection);
    }
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId("citas");
      app.delete(collection);
    } catch (e) {
      if (e.message.includes("no rows in result set")) return;
      throw e;
    }
  },
);
