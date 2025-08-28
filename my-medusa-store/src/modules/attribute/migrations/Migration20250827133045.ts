import { Migration } from '@mikro-orm/migrations';

export class Migration20250827133045 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "attribute_value" add column if not exists "name" text not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "attribute_value" drop column if exists "name";`);
  }

}
