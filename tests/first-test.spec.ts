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

    await page.locator('nb-card', {hasText: 'Horizontal form'}).getByRole('button').click();
    await page.locator('nb-card', {hasText: 'Horizontal form'}).getByRole('textbox').first().fill('aayanshpurohit@gmail.com');



})


test('locating child element', async ({page})=>{

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    // child element way 1
    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();

    // child element way 2
    await page.locator('nb-card nb-radio-group :text-is("Option 2")').click();

    // way 3
    await page.locator('nb-card').getByRole('button', {name:'Sign In'}).first().click();
   
     // way 4

})

test('locating parent element', async ({page})=>{

    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click();
})


