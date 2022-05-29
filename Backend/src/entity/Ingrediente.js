const { EntitySchema} = require("typeorm")

module.exports = new EntitySchema({
    name: "Ingrediente",
    tableName: "INGREDIENTE",
    columns: {
        ID_INGREDIENTE: {
            primary: true,
            type: "int",
            generated: true
        },
        NOME: {
            type: "varchar",
            nullable: false,
        },
        ID_RECEITA: {
            type: "int",
            nullable: false
        },
    },
     relations: {
         receita: {
             type: "one-to-many",
            target: "Receita",
           joinColumn: {
                name: "ID_RECEITA",
             },
             inverseside: "ingrediente",
         },
     },
    
})
   
    
