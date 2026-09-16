/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const users = app.findCollectionByNameOrId("users");

    // Añadir campo `role` si no existe (member / admin).
    if (!users.fields.getByName("role")) {
      users.fields.add(
        new SelectField({
          name: "role",
          required: true,
          maxSelect: 1,
          values: ["member", "admin"],
        }),
      );
    }

    // Bloquear el campo privilegiado `role`:
    // - en update: el usuario no puede cambiar su propio rol (salvo admin)
    // - en create (registro público): no puede enviar role, o solo "member"
    const roleUpdateRule =
      "(id = @request.auth.id && @request.body.role:changed = false) || @request.auth.role = 'admin'";
    const roleCreateRule =
      "@request.body.role:isset = false || @request.body.role = 'member'";

    users.createRule = roleCreateRule;
    users.updateRule = roleUpdateRule;
    // El admin puede ver a todos los usuarios; cada usuario solo se ve a sí mismo.
    users.listRule = "id = @request.auth.id || @request.auth.role = 'admin'";
    users.viewRule = "id = @request.auth.id || @request.auth.role = 'admin'";
    app.save(users);

    // El administrador se provisiona fuera del código con una contraseña privada.
  },
  (app) => {
    try {
      const users = app.findCollectionByNameOrId("users");
      users.fields.removeByName("role");
      app.save(users);
    } catch (e) {
      if (e.message.includes("no rows in result set")) return;
      throw e;
    }
  },
);
