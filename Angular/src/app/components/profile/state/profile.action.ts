import { SafeUrl } from "@angular/platform-browser";
import { createAction, props } from "@ngrx/store";
import { User } from "src/app/Models/user.model";

export const getProfileImagee = createAction('[profile page] get profile image start', props<{ id: number | undefined }>() );
export const getProfileImageSucces = createAction('[profile page] get profile image succes', props<{ url: SafeUrl }>() );

export const uploadProfileImage = createAction('[profile page] upload profile image', props<{ id: number | undefined, file: File}>() );

export const updateUser = createAction('[User] Update User', props< {userId: number, field: string; value: string } >() );
export const updateUserSuccess = createAction('[User API] Update User Success', props< { updatedUser: User } >() );

export const loadUserProfile = createAction('[User] Load User Profile', props<{ userId: number }>() );
  
export const loadUserProfileSuccess = createAction('[User] Load User Profile Success',props<{ user: User }>());