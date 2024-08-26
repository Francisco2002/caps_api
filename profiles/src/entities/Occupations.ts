import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({ name: "occupations" })
export class Occupation {
    @PrimaryColumn()
    code: string

    @Column()
    name: string
}