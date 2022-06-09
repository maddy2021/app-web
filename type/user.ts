export interface UserFormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export interface UserFormDataWithID extends UserFormData {
    id: number;
}