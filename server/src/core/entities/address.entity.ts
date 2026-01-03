export class Address {
    id: string;
    street: string;
    neighborhood: string;
    latitude: number;
    longitude: number;
    userId: string;
    constructor(props: {
        id: string;
        street: string;
        neighborhood: string;
        latitude: number;
        longitude: number;
        userId: string;
    }) {
        this.id = props.id;
        this.street = props.street;
        this.neighborhood = props.neighborhood;
        this.latitude = props.latitude;
        this.longitude = props.longitude;
        this.userId = props.userId;
    }
}