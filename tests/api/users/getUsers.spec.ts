
import{test, expect} from '@playwright/test'
import { createApiClient } from '../../../fixtures/apiClient'


test("Get Users by token authentication", async()=>{

    
    const apiClient = await createApiClient();

    const loginResponse = await apiClient.post("https://practice.expandtesting.com/notes/api/users/login",{
        data:{
            email:"guna0974569@gmail.com",
            password:"vikas@09"
        }
    })

    //Logging the login response
      console.log("Token" + await loginResponse.text());

    const responseBody = await loginResponse.json();
    const token = responseBody.data.token;

    console.log("Token" + await responseBody.data.text);



    const getRequest = await apiClient.get("https://practice.expandtesting.com/notes/api/users/profile",{
        headers:{
            "x-auth-token": token,
            
        },
    });

    expect(getRequest.status()).toBe(200);

    //Logging the Users details
    console.log("Get Users" + await getRequest.text());
})