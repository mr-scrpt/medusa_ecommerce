import { Migration } from '@mikro-orm/migrations';

export class Migration20250824114846 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "attribute_value" add constraint "attribute_value_attribute_id_foreign" foreign key ("attribute_id") references "attribute" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "attribute_value" drop constraint if exists "attribute_value_attribute_id_foreign";`);
  }

}
