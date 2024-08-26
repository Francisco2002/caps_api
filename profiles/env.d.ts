interface UserStoreData {
    cpf: string,
    name: string,
    email: string,
    occupation_code: string,
    role_code: string
}

interface UserUpdateData extends Omit<UserStoreData, "cpf"> {}