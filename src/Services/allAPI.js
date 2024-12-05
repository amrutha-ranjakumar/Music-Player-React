import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseURL";


//1)register user
export const registerAPI = async(user)=>{
    return await commonAPI("post",`${BASE_URL}/user/register`,user,"")
}
//2)login user
export const loginAPI = async(reqBody)=>{
    return await commonAPI("post",`${BASE_URL}/user/login`,reqBody,"")
}
//3) add song
export const addprojectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${BASE_URL}/add-songs`,reqBody,reqHeader)
}
//4)get oldsongs
export const oldsongAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/oldsongs`,reqBody,reqHeader)
}
//5)get newsongs
export const newsongAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/newsongs`,reqBody,reqHeader)
}
//6)get artistongs
export const artistongsAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/artists`,reqBody,reqHeader)
}
//7)get artistongs
export const getmalayalamAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/malayalam`,reqBody,reqHeader)
}
//8)get artistongs
export const gettamilAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/tamil`,reqBody,reqHeader)
}
//9)get artistongs
export const gethindiAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/hindi`,reqBody,reqHeader)
}
//10)get artistongs
export const getenglishAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/english`,reqBody,reqHeader)
}
//11)get artistongs
export const getallsongAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/admins`,reqBody,reqHeader)
}
//12)get songs
export const getallsongsAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/songs`,reqBody,reqHeader)
}
//13)get songs
export const getallteluguAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/telugu`,reqBody,reqHeader)
}
//14)get user project
 export const userprojectAPI= async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/project/user-ptoject`,'',reqHeader)
 }
//15)Delete a project
export const  deleteprojectAPI= async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/project/remove/${id}`,{},reqHeader)
}
//16)update user project
 export const  editUserProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/projects/edit/${id}`,reqBody,reqHeader)
 }







