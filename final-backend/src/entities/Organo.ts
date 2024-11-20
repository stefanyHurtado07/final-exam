import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Organo {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ length: 50 })
  tipo: string = "";

  @Column({ length: 100 })
  donante: string = "";

  @Column({ type: "date" })
  fechaDisponibilidad: Date = new Date();

  @Column({ default: false })
  verificado: boolean = false;

  @ManyToOne(() => Usuario, (usuario) => usuario.organos, { nullable: false, onDelete: "CASCADE" })
  proveedor: Usuario = new Usuario();
}

