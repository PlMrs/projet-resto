export interface restaus{
    attributes: {
        "address": string,
        "comment": string,
        "createdAt": string,
        "gone": boolean,
        "latitude": number,
        "longitude": number,
        "publishedAt": string,
        "title": string,
        "updatedAt": string,
        "type": {
                "data": {
                "attributes": {
                    "createdAt": string,
                    "description": string,
                    "name": string,
                    "publishedAt": string,
                    "updatedAt": string,
                },
                "id": number,
                }
        },
        "users_permissions_user": {
            "data":  {
                "attributes": {
                  "blocked": boolean,
                  "confirmed": boolean,
                  "createdAt": string,
                  "email": string,
                  "provider": string,
                  "updatedAt": string,
                  "username": string,
                },
                "id": number,
            }
        }   
    }
}