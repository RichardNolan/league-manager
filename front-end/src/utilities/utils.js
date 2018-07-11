import React from 'react'
import USER from '../USER'

export const typeOfUser = (user)=>{
    let keys = Object.keys(user)
                    .filter(key=>key.match(/is[A-Z]/))
                    .filter(key=>user[key])
    return keys[0]
}


export const injectUser = Component=> props=> {
    return(
        <USER.Consumer>
            { ( {user} )=><Component user={user.user} {...props} />}
        </USER.Consumer>
    )
}