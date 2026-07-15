import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import { loginWithSession } from '../pages/LoginSessionpage';
import { AccountPage } from '../pages/AccountPage';
import { QuotePage } from '../pages/Quotepage';
import { HomePage } from '../pages/HomePage';

test.skip('User can login with session id', async ({ browser }) => {
     const { page } = await loginWithSession(browser); // Example assertion to confirm login success await expect(page).toHaveURL(/.*lightning.force.com/);


    //object3
    const contactpage1 = new AccountPage(page);
     // Inline test data 
    const contactData = {  "Salutationoption": "Mr.",
        
        "LastName" : "nikhi",
        "Email" : "nikhi123456@gmail.c",
        "contactName" : "00084187",    
    };
    

    

    /* await contactpage1.clickAcoountMenu();
    await contactpage1.OpenRelatedList();
    await contactpage1.OpenContacts();


   
    await contactpage1.fillContactForm(contactData);
    */
    
    await contactpage1.searchAndOpencontact(contactData);


    

    

});

test.skip('User can open quote', async ({ browser }) => {
     const { page } = await loginWithSession(browser); // Example assertion to confirm login success await expect(page).toHaveURL(/.*lightning.force.com/);

    const quote1= new QuotePage(page);
    const quotedata = {  
        "quoteName": "00084187",
        
           
    };
    quote1.searchAndOpenquote(quotedata);

});

test('User can login with session', async ({ browser }) => {
     const { page } = await loginWithSession(browser); // Example assertion to confirm login success await expect(page).toHaveURL(/.*lightning.force.com/);
    const quotedata = {  "quoteName": "00084187" };

    const home =new HomePage(page);

    await home.clickhomemenu();


    const quote1= new QuotePage(page);
    await quote1.searchAndOpenquote(quotedata);
    await quote1.ConfigureStandaloneProduct();
    await quote1.clickcarttab();

});


