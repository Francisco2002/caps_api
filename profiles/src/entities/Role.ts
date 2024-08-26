import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({ name: "roles" })
export class Role {
    @PrimaryColumn()
    code: string

    @Column()
    name: string
}