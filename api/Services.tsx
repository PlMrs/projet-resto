import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";

export async function getJwt(){
    const stored = await AsyncStorage.getItem('@user')

    let jwt : string = "";
    stored ? jwt = stored.replace(/['"]+/g, ''): null;

    const decoded : {exp: number,iat: number, id: number} = jwtDecode(jwt)

    return {jwtDecoded : decoded, jwt : jwt}
}

export default async function signUp(id: string, password: string) : Promise<number> {
    
    const req = await axios.post('https://digitalcampus.nerdy-bear.com/api/auth/local/',{
        identifier: id,
        password: password
    })

    if(req.status === 200){
        await AsyncStorage.setItem('@user', req.data.jwt);
    }

    return req.status
}


export async function getPlaces() : Promise<any>{

    const {jwtDecoded,jwt} = await getJwt()

    try{

    const req = await axios.get('https://digitalcampus.nerdy-bear.com/api/places?pagination%5BpageSize%5D=999999',{
        headers: {
            accept : "application/json",
            Authorization : `Bearer ${jwt}`
        },
        params: {
            populate: "users_permissions_user,type"
        } 
    } )

    if(req.status === 200){  
        return {res : req.data, userId: jwtDecoded.id}
    }
    }catch(e){
        console.log('erreur axios : ',e)
    }

    return null
}

export async function postPlaces(data: any) : Promise<any>{

    const {jwtDecoded,jwt} = await getJwt()

    try{

    const req = await axios.post('https://digitalcampus.nerdy-bear.com/api/places',{"data" :{...data.data, users_permissions_user : jwtDecoded.id}} ,{
        headers: {
            accept : "application/json",
            Authorization : `Bearer ${jwt}`
        },
        
    } )

    if(req.status === 200){  
        return req.status
    }
    }catch(e){
        console.log('erreur axios : ',e)
    }

    return null
}

export async function getTypes(){

    const {jwt} = await getJwt()

    const res = await axios.get("https://digitalcampus.nerdy-bear.com/api/types",{
        headers: {
            accept : "application/json",
            Authorization : `Bearer ${jwt}`
        },
    })

    if(res.status === 200){
        return res.data
    }
}

export async function removeList(id:number){

    const {jwt} = await getJwt()

    const res = await axios.delete(`https://digitalcampus.nerdy-bear.com/api/places/${id}`, {
        headers: {
            accept : "application/json",
            Authorization : `Bearer ${jwt}`
        },
    })
    if(res.status === 200){
        return res.status
    }
}