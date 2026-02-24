import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfileService } from "../profile.service";
import { getProfileImagee, getProfileImageSucces, updateUser, updateUserSuccess, uploadProfileImage } from "./profile.action";
import { exhaustMap, map, mergeMap, tap } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class ProfileEffects {

    constructor(private actions$: Actions,private profileService: ProfileService, private sanitizer: DomSanitizer){
    }

    profileImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProfileImagee),
            exhaustMap(action => this.profileService.getProfileImage(action.id) 
                .pipe(
                    map( blob => {
                        let objectUrl = URL.createObjectURL(blob); 
                        let url = this.sanitizer.bypassSecurityTrustUrl(objectUrl); 
                        return getProfileImageSucces({url})
                    })
                ))
        )
    })

    uploadProfileImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(uploadProfileImage),
            exhaustMap(action => this.profileService.uploadImage(action.id, action.file)
                .pipe(
                map(blob => {
                    let objectUrl = URL.createObjectURL(blob);
                    let url = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                    return getProfileImageSucces({url});
                })
            ))
        )
    })

    updateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateUser),
            exhaustMap(action => this.profileService.updateUser(action.userId, action.field, action.value)
            .pipe(
                map(updatedUser => updateUserSuccess({updatedUser}))
            ))
        )
    })
        
}