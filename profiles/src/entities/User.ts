import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { Occupation } from "./Occupations"
import { Role } from "./Role"

@Entity({ name: "users" })
export class User {
    @PrimaryColumn()
    cpf: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    username: string

    @Column()
    enabled: boolean
    
    @Column()
    role_code: string

    @Column()
    occupation_code: string

    @ManyToOne(() => Role)
    @JoinColumn({ name: "role_code" })
    role: Role

    @ManyToOne(() => Occupation)
    @JoinColumn({ name: "occupation_code" })
    occupation: Occupation
}