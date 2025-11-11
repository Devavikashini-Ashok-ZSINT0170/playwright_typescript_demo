import {test, expect} from '@playwright/test'
import { createApiClient } from '../../../fixtures/apiClient'

test("Login User", async()=> {
    const apiClient = await createApiClient();

    const requestBody = {
        email:"guna0000001@gmail.com",
        password:"vikas@09"
    }

    const response = await apiClient.post("https://practice.expandtesting.com/notes/api/users/login",{
        data:requestBody
    });

    expect(response.status()).toBe(200);
    console.log("Login Successfull" + await response.text());

    const responseBody = await response.json();
    const token = responseBody.data.token;
    console.log("Token" + token);

    

});

