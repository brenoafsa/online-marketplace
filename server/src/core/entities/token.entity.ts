export class Token {
    id: string;
    token: string;
    expiresAt: Date;
    userId: string;
    constructor(props: {
        id: string;
        token: string;
        expiresAt: Date;
        userId: string;
    }) {
        this.id = props.id;
        this.token = props.token;
        this.expiresAt = props.expiresAt;
        this.userId = props.userId;
    }
}