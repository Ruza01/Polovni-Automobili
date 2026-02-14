
import { DataSourceOptions } from "typeorm";


export const typeOrmConfig: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
    synchronize: true,
    database: "PolovniAutomobiliDB"
}