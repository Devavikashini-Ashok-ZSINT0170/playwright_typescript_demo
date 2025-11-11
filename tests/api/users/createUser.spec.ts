import { test, expect } from "@playwright/test"
import { createApiClient } from "../../../fixtures/apiClient"



test("Create a user", async () => {

    const apiClient = await createApiClient();

    const requestBody = {
        name: "vikas",
        email: "guna0000001@gmail.com",
        password:"vikas@09"
    }

     const response = await apiClient.post("https://practice.expandtesting.com/notes/api/users/register",{
        data:requestBody
     });

     expect(response.status()).toBe(201);
     
    console.log("Create User" + await response.text());
    
}
);