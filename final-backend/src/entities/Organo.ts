
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";

/**
 * Representa un órgano disponible para donación.
 */
@Entity()
export class Organo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  tipo: string;

  @Column({ length: 100 })
  donante: string;

  @Column({ type: "date" })
  fechaDisponibilidad: Date;

  @Column({ default: false })
  verificado: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.organos, { nullable: false, onDelete: "CASCADE" })
  proveedor: Usuario;
}
