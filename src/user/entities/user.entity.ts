import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ nullable: false, length: 255 })
  password_has: string; 

  @Column({ nullable: false, length: 50 })
  fullname: string; 

  @Column({ default: false })
  is_block: boolean;
}