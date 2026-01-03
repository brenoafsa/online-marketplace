export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    role: "CUSTOMER" | "SELLER";
    language: "BR" | "EN";
    address: {
        street: string;
        neighborhood: string;
        latitude: number;
        longitude: number;
    }

    constructor(props: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        role: "CUSTOMER" | "SELLER";
        language: "BR" | "EN";
        address: {
            street: string;
            neighborhood: string;
            latitude: number;
            longitude: number;
        }
    }) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
        this.password = props.password;
        this.phone = props.phone;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.role = props.role;
        this.language = props.language;
        this.address = props.address;
    }
}