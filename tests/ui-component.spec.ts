import { expect, test } from '@playwright/test'


test.describe('Form Layout Page', ()=>{

    test.beforeEach(async ({page})=>{

    await page.goto("https://playground.bondaracademy.com/")

    await page.getByText('Modal & Overlays').click();

    await page.getByText('Toastr').click();
    })

    test('checkboxes', async ({page})=>{

        await page.getByRole('checkbox', {name:'Hide on click'}).uncheck({force:true});

        const allcheckBoxes = page.getByRole('checkbox');

        for(const box of await allcheckBoxes.all()){

             await box.check({force:true});
             await expect(box).toBeChecked();
        }

    })

})
