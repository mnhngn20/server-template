import { BaseEntity, Column, Entity, Index, PrimaryColumn } from "typeorm";

@Index("IDX_Person_Email", ["email"], { unique: true })
@Entity("User", { schema: "dbo" })
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;
}
