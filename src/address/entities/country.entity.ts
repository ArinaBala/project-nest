import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  iso2: string;


  @OneToMany('City', (city: any) => city.country)
  cities: any[];
}