import { test, expect } from '@playwright/test'
import { createApiClient } from '../../../fixtures/apiClient'

test("Change password using token", async () => {
    const apiClient = await createApiClient();

    await test.step("Validating the login API", async () => {

        const loginResponse = await apiClient.post(
            "https://practice.expandtesting.com/notes/api/users/login",
            {
                data: {
                    email: "guna0974569@gmail.com",
                    password: "deva@0908"
                }
            }
        );

        await test.step("Validating the status code", async () => {
            expect(loginResponse.status()).toBe(200);
            console.log("Token is validated: " + await loginResponse.text());
        });

        const responseBody = await loginResponse.json();
        const token = responseBody.data.token;

        await test.step("Validating the change password scenario", async () => {
            const changePassword = await apiClient.post(
                "https://practice.expandtesting.com/notes/api/users/change-password",
                {
                    headers: {
                        "x-auth-token": token
                    },
                    data: {
                        currentPassword: "deva@0908",
                        newPassword: "lachu@0908"
                    }
                }
            );

            test.step("Validating the status code", async()=>{
            expect(changePassword.status()).toBe(200);
            console.log("New password updated: " + await changePassword.text());
            })
        });

    });
}); 
