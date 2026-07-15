import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import dotenv from 'dotenv';
import { HomePage } from '../pages/HomePage';
import { url } from 'node:inspector';
dotenv.config({ path: '../.env' }); // ✅ relative to tests folder
 import { AccountPage } from '../pages/AccountPage';

test.skip('User can login, and add go to home page', async({page})=>{
const url = process.env.SF_URL;
const username = process.env.SF_USERNAME;
const password = process.env.SF_PASSWORD;
console.log('ENV check:', process.env.SF_URL, process.env.SF_USERNAME, process.env.SF_PASSWORD);


if (!url || !username || !password) { 
    throw new Error('Missing environment variables. Check your .env file.');
 }


//object1
const loginpage = new LoginPage(page);
await loginpage.performLogin(url,username,password);

// wait until the home page is loaded 
await page.waitForURL('**/lightning/page/home', { timeout: 30000 }); 
// now validate 
await expect(page).toHaveURL('https://connect-momentum-2874--qasandbox.sandbox.lightning.force.com/lightning/o/Lead/list?filterName=__Recent');

});

//test("verify Homepage",async({page})=>{

//console.log("homepage opened");


//});
test.skip('User can click on logout', async({page})=>{
 
    //object2
const homepage = new HomePage(page);
 await homepage.openprofilemenu();
 await homepage.clickonlogout();
//await page.waitForURL("https://digicert--rcadevpro.sandbox.lightning.force.com", { timeout: 70000 }); 
// now validate 
await expect(page).toHaveURL('https://digicert--rcadevpro.sandbox.my.salesforce.com/', {timeout: 10000});



});

test('User can create contact', async({page})=>{

    //object3
    const contactpage = new AccountPage(page);

    

    await contactpage.clickAcoountMenu();
    await contactpage.OpenRelatedList();
    await contactpage.OpenContacts();

    // Inline test data 
    const contactData = {  "Salutationoption": "Mr.",
        
        "LastName" : "nikhi",
        "Email" : "nikhi123456@gmail.c" };
    
    await contactpage.fillContactForm(contactData);
    


});

