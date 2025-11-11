import { test, expect, APIRequestContext } from '@playwright/test'
import { createApiClient } from '../../../fixtures/apiClient'
import { log } from 'console';

let apiContext: APIRequestContext;

test.beforeAll("setUp", async () => {
    apiContext = await createApiClient();
})

let token: string;

test("Creating a note", async () => {
    await test.step("Validating the token", async () => {
        let loginResponse = await apiContext.post("https://practice.expandtesting.com/notes/api/users/login", {
            data: {
                email: "guna0000001@gmail.com",
                password: "vikas@09"
            }
        })

        expect(loginResponse.status()).toBe(200);

        let responseBody = await loginResponse.json();
        token = responseBody.data.token;

    })


    await test.step("creating a note", async () => {
        let requestBody = await apiContext.post("https://practice.expandtesting.com/notes/api/notes", {
            headers: {
                "x-auth-token": token
            },
            data: {
                title: "TODO",
                description: "Action items for today",
                category: "Home"

            }
        })

        expect(requestBody.status()).toBe(200);
        console.log("Note Created:" + await requestBody.text());

    })

})

