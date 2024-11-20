import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from "typeorm";
import { Organo } from "./Organo";
import * as bcrypt from "bcrypt";

/**
 * Representa un usuario registrado en la plataforma.
 */
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contraseña: string;

  @Column({ default: "usuario" })
  rol: string;

  @OneToMany(() => Organo, (organo) => organo.proveedor)
  organos: Organo[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }
}
