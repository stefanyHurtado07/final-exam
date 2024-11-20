import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from "typeorm";
import { Organo } from "./Organo";
import * as bcrypt from "bcrypt";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ length: 50 })
  nombre: string = "";

  @Column({ unique: true })
  email: string = "";

  @Column()
  contraseña: string = "";

  @Column({ default: "usuario" })
  rol: string = "usuario";

  @OneToMany(() => Organo, (organo) => organo.proveedor)
  organos: Organo[] = [];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }
}
