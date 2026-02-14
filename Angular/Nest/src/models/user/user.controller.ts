import { BadRequestException, Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRegisterRequestDto } from "./DTOs/user-register.req.dto";
import { SETTINGS } from "src/app.utils";
import { User } from "./entities/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { existsSync, mkdirSync, readdir, unlink } from "fs";
import { of } from "rxjs";
import { UpdateFieldDto } from "./DTOs/dataField.dto";



@Controller('user')
export class UserController {

    constructor(private userService: UserService ){
    }

    @Post('/register')
    async doUserRegistration( @Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegisterRequestDto ): Promise<User> {
        return await this.userService.doUserRegistration(userRegister);
    }m

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file', { 
        storage: diskStorage({
            destination(req, file, callback) {
                const start = req.url.indexOf("uploadImage/");
                const userId = req.url.substring(start+12);

                const uploadPath = `./uploads/carImages/${userId}`;
                if(!existsSync(uploadPath))
                    mkdirSync(uploadPath, {recursive:true});
                else
                    deleteFiles(uploadPath);

                callback(null, uploadPath);
            },
            filename(req, file, callback) {
                const newFileName = `image_${Date.now()}.jpg`;
                callback(null, newFileName);
            },
        }),
        fileFilter(req, file, callback) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            {
                return callback(null, false);
            }
            callback(null, true);
        },
    }))
    async uploadImage(@UploadedFile() file:Express.Multer.File, @Param('id', ParseIntPipe) id:number, @Res() res) { 
        if(!file){
            throw new BadRequestException("File is not an image");
        }
        else{
            let user = await this.userService.getUserById(id);
            user.profileImagePath = file.filename;
            this.userService.updateUser(id, user);
			
			const imagePath = `${process.cwd()}/uploads/carImages/${id}/${user.profileImagePath}`;
			
			return of(res.sendFile(imagePath));
        }
    }

    @Get('profile-image/:id')
    async getProfileImage(@Param('id', ParseIntPipe) id:number, @Res() res) {  
        
        const user = await this.userService.getUserById(id);
        let imagePath;
        if(user.profileImagePath != null){
            imagePath = `${process.cwd()}/uploads/carImages/${id}/${user.profileImagePath}`; 
        }
        else{
            imagePath = `${process.cwd()}/uploads/carImages`;
        }
        
        return of(res.sendFile(imagePath)); 
    }

    @Put('update/:id')
    updateUserField(@Param('id', ParseIntPipe) id: number, @Body() updateData: UpdateFieldDto) {
      console.log('Received ID:', id);
      console.log('Received Body:', updateData);
      console.log('Received Body:', updateData.field);
      console.log('Received Body:', updateData.value);
      return this.userService.updateUserField(id, updateData.field, updateData.value);
    }
}

function deleteFiles(path:string){
    readdir(path, (err, files) => {
        if(err) throw new BadRequestException("could not read directory");

        files.forEach(file => {
            const file_path = path + "/" + file;
            unlink(file_path, (err) => {
                if(err) throw new BadRequestException("Could not delete file");
                console.log("Deleted" + file_path);
            });
        })
    })
}
