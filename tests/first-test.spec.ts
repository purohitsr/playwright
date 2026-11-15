import { expect, test } from '@playwright/test'

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

     await page.locator('nb-card').nth(3).getByRole('button').click();
})

test('locating parent element', async ({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button').click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox').first().fill('Hello');
    await page.locator('nb-card').filter({hasText: 'Using the grid'}).getByRole('button').click();

    // multiple filter

    await page.locator('nb-card')
    .filter({has: page.locator('nb-checkbox')})
    .filter({hasText: 'Sign in'})
    .getByLabel('Email')
    .fill("srpsilicon@gmail.com");


    // traversing parent
    await page.locator('Using the Grid').locator('..').getByRole('button').click();
})

test('reusing the locators', async ({page})=>{

    const basicFormSection = page.locator('nb-card', {hasText: 'Basic form'});
    await basicFormSection.getByLabel('Password').fill('playwright');


})

test('extracting text from ', async ({page})=>{
     await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    const basicFormSection = page.locator('nb-card', {hasText: 'Basic form'});
    const submitButtonText = await basicFormSection.getByRole('button').textContent();
    expect(submitButtonText).toEqual('Submit');

    // extract multiple text values

    const allRadioButtonValues  = await page.locator('nb-radio').allTextContents();
    console.log(allRadioButtonValues);
    expect(allRadioButtonValues).toContain('Option 1');

    // extracting input fields value

    const emailField =  basicFormSection.getByRole('textbox', {name: 'Email'})
    await emailField.fill('srpsilsicon@gmail.com');
    const emailFieldValue = emailField.inputValue();
    console.log(emailFieldValue);

})


test('Assertions', async ({page})=>{

    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const usingtheGridSectionButton = page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('button')
   
    // generic asserion
    const value = 5;
    expect(value).toEqual(5);

    const submitButtonText = await usingtheGridSectionButton.textContent();
    expect(submitButtonText).toEqual('Sign in');

    // Locator Asserion

    await expect(usingtheGridSectionButton).toHaveText('Sign in');

    // soft Assertion
    await expect.soft(usingtheGridSectionButton).toHaveText('Sign in');


})

