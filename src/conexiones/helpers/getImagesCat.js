import React from 'react';

const GetImagesCat = async() => {
    const url = "https://api.thedogapi.com/v1/breeds";
    const res = await fetch(url);

 
    const imagen = await res.json();

    return imagen
}

export default GetImagesCat;
