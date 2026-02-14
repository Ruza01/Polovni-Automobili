import { IsString } from "class-validator";


export class UpdateFieldDto {
    
    @IsString()
    field: string;
  
    @IsString()
    value: string;
  }