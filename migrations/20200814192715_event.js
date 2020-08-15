exports.up = async (knex, Promise) => {
    await knex.schema.createTable('events', (table) => {
        table.increments('id').notNullable();
        table.integer('user_id').notNullable();
        table.string('event_name').notNullable();
        table.string('description',500).notNullable();
        table.string('start_date', ).notNullable();
        table.string('end_date').notNullable();
        table.string('city').notNullable();
      });
};

exports.down = async (knex, Promise) => {
    const dropTable = await knex.schema.dropTable('events');
      return dropTable;
};
