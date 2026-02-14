import { IsNotEmpty, isNotEmpty } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";


export class carDto {

    @IsNotEmpty()
    stanje: string;

    @IsNotEmpty()
    marka: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    godiste: number;

    @IsNotEmpty()
    kilometraza: number;

    @IsNotEmpty()
    karoserija: string;
    
    @IsNotEmpty()
    gorivo: string;

    @IsNotEmpty()
    kubikaza: number;

    @IsNotEmpty()
    snagaMotora: number;

    @IsNotEmpty()
    cena: number;

    @IsNotEmpty()
    fiksnaCena: string;

    @IsNotEmpty()
    zamena: string;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    images: string[]


}