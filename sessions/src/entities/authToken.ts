import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({ name: "auth_token" })
export class AuthToken {
    @PrimaryColumn()
    code: string

    @Column()
    token: string

    @Column()
    expired: boolean

    @Column({ name: "created_at" })
    createdAt: Date

    @Column({ name: "expires_at" })
    expiresAt: Date

    @Column({ name: "user_cpf" })
    userCpf: string
}