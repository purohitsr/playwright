import { test } from '@playwright/test'

test.beforeEach(async ({page})=>{

    await page.goto("https://playground.bondaracademy.com/")
})
test('this is my first test', async ({page})=>{

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test('thisis a test for learning locators', async ({page})=>{
    // By attribute
    await page.locator('[title="Forms"]').click();

    // By full text

    await page.locator(':text.is("Playground")').isVisible();

})

test('user facing locators', async ({page})=>{
    
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.getByRole('button',{name:'Sign in'}).first().click()
    await page.getByRole('textbox',{name:'Email'}).first().fill("test.gmail.com")
    await page.getByLabel('Email').first().fill("Hello@gmail.com")
    await page.getByPlaceholder('Jane Doe').fill('saurav Ranjan Purohit')

})


