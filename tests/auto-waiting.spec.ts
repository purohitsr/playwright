import { expect, test } from '@playwright/test'

test.beforeEach(async ({page})=>{

    await page.goto("https://playground.bondaracademy.com/")

    await page.getByText('Modal & Overlays').click();

    await page.getByText('Dialog').click();
})


test('auto wait tests', async ({page})=>{


    const dialogwithDelayForm = page.locator('nb-card',{hasText:'Open Dialog With Delay'});

    await dialogwithDelayForm.getByRole('button',{name:'3 seconds'}).click();

    const dialogContainer = page.locator('nb-dialog-container');

     // auto wait for below method is not implemented by playwright implementation . refer playwright doc to get list of method that auto waits
    
    // const dialogheaderText = await dialogContainer.locator('nb-card-header').textContent();

    const dialogheaderText = await dialogContainer.locator('nb-card-header').allTextContents();


    // this will fail as it will return an empty array
    expect (dialogheaderText).toEqual('Friendly reminder');

    // auto wait for click as per playwright implementation . refer playwright doc to get list of method that auto waits
    
    await dialogContainer.getByRole('button',{name:'OK'}).click();
})


test('alternate way', async ({page})=>{


    const dialogwithDelayForm = page.locator('nb-card',{hasText:'Open Dialog With Delay'});

    await dialogwithDelayForm.getByRole('button',{name:'3 seconds'}).click();

    const dialogContainer = page.locator('nb-dialog-container');

    // option 1

    // await dialogContainer.waitFor();

   // option 2 wait for selector 

    // await page.waitForSelector('nb-dialog-container');

    // option 3 wait for api call

    await page.waitForResponse("**/delay/*")

    const dialogheaderText = await dialogContainer.locator('nb-card-header').allTextContents();


    // this will fail as it will return an empty array
    expect (dialogheaderText).toContain('Friendly reminder');

    // auto wait for click as per playwright implementation . refer playwright doc to get list of method that auto waits
    
    await dialogContainer.getByRole('button',{name:'OK'}).click();
})


