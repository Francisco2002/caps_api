import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({ name: "users" })
export class User {
    @PrimaryColumn()
    cpf: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    username: string

    @Column()
    enabled: boolean

    @Column({ name: "occupation_code" })
    occupationCode: string

    @Column({ name: "role_code" })
    roleCode: string
}