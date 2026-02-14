import { createReducer, on } from "@ngrx/store";
import { initialState } from "./profile.state";
import { getProfileImageSucces, updateUserSuccess } from "./profile.action";
import { state } from "@angular/animations";



const _profileReducer = createReducer(initialState,
    on(getProfileImageSucces, (state, action) => {
        return{
            ...state,
            imageUrl: action.url
        }
    }),
    on(updateUserSuccess, (state, { updatedUser }) => ({
        ...state,
        user: updatedUser
      }))
)

export function ProfileReducer(state: any, action: any){
    return _profileReducer(state,action);
}

