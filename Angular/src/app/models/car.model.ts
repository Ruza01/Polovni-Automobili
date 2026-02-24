
export interface Car{
    id: number;
    stanje: string;
    marka: string;
    model: string;
    godiste: number;
    kilometraza: number;
    karoserija: string;
    gorivo: string;
    kubikaza: number;
    snagaMotora: number;
    cena: number;
    fiksnaCena: string;
    zamena: string;
    images: { id: number, imagePath: string}[];
}