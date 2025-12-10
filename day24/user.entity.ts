import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  // Define user properties here
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;
}
