import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @ManyToOne('Country', (country: any) => country.cities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: any;

  @Column()
  country_id: number;
}