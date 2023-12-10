export class User {
    username: string;
    times: TimeRecord;
    constructor(username: string, times?: TimeRecord) {
        this.username = username;
        this.times = times || { home: 0, table: 0, about: 0 };
    }
}
export interface TimeRecord {
    home: number;
    table: number;
    about: number;
}
