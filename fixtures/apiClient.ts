
import {APIRequestContext, request} from '@playwright/test'

export async function createApiClient(): Promise<APIRequestContext> {
    return await request.newContext(
        {
            baseURL:"practice.expandtesting.com/notes/api",
            extraHTTPHeaders:{
                "Content-Type":"application/json"
            }
        }
    )
}