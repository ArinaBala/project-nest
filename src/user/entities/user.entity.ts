import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity('users')
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

  @OneToMany('Address', (address: any) => address.user)
  addresses: any[];
}