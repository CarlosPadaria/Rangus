const { EntitySchema} = require("typeorm")

module.exports = new EntitySchema({
    name: "Passos",
    tableName: "PASSOS",
    columns: {
        ID_PASSOS: {
            primary: true,
            type: "int",
            generated: true
        },
        DESCRICAO: {
            type: "varchar",
            nullable: false,
        },
        ID_RECEITA: {
            type: "int",
            nullable: false
        },
        NUMERO: {
            type: "int",
            nullable: false
        }
    },
     relations: {
         receita: {
             type: "one-to-many",
            target: "Receita",
           joinColumn: {
                name: "ID_RECEITA",
             },
             inverseside: "passos",
         },
     },
    
})
   
    
