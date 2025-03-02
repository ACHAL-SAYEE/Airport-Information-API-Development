const { EntitySchema } = require("typeorm");

const Airport = new EntitySchema({
    name: "Airport",
    tableName: "airport",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            unique: true,
        },
    },
});

module.exports = { Airport };
