import axios from 'axios'
export async function getToken() {
    const identifier = process.env.NEXT_PUBLIC_STRAPIUN;
    const password = process.env.NEXT_PUBLIC_STRAPIPW;
    let headers = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/local', { //Strapi Email Post, Authenticate
        identifier,
        password,
    }).then((res) => {
        console.log(' get Token :' + res.status)
       let response = {
            'Authorization': 'Bearer ' + res.data.jwt
        }
        return response
    })
    return headers
}
export function fisherYates(myArray) {
    var i = myArray.length;
    if (i == 0) return false;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
}
export function replaceFolder(myArray) {
    myArray.forEach(function (myArrayItem) {
        myArrayItem.upload.url = myArrayItem.upload.url.replace("/uploads/", "/uploads/optimized/")

    })
}