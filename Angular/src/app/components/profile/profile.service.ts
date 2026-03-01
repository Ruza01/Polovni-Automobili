import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddCarDto } from "src/app/Dto/add-car.dto";
import { User } from "src/app/models/user.model";

const api = "http://localhost:3000";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {

    constructor(private httpClient: HttpClient){

    }

    uploadImages(files: File[], id: number){
        let formData = new FormData();
        if(files){
            files.forEach(file => {
                formData.append('file',file,file.name)
            });
        }
        return this.httpClient.post(`${api}/car/uploadImage/${id}`, formData);
    }

    getPhotosById(id: number){
        return this.httpClient.get(`${api}/car/getImage/${id}`);
    }

    getProfileImage(id: number | undefined){
        const requestOptions: Object = { responseType: 'blob'}; //ocekuje se binarni odgovor sa servera (slika u binarnom formatu )
        return this.httpClient.get<any>(`${api}/user/profile-image/${id}`, requestOptions); 
    }

    uploadImage(id: number | undefined, file: File){
        let formData = new FormData();  //koristi se za konstrukciju kljuc-vrednost parova koji se salju sa HTTP zahtevima (vezano za datoteke sa servera)
        formData.append('file', file, file.name);
        const requestOptions: Object = { responseType: 'blob' };
        return this.httpClient.post<any>(`${api}/user/uploadImage/${id}`, formData, requestOptions);
    }

    updateUser(userId: number, field: string, value: string){
        const body = { field, value};
        return this.httpClient.put<User>(`${api}/user/update/${userId}`, body);
    }
 

}