import { Page, Locator } from '@playwright/test';
// 1st create class for page.
export class LoginPage {

    //variables
   private readonly page:Page;
   
   UsernameInput:Locator;
   PasswordnameInput:Locator;
   LoginButton:Locator;

    //constructor
    constructor(page:Page){
        this.page=page;
        this.UsernameInput= this.page.locator('#username');
        this.PasswordnameInput=this.page.locator('#password');
        this.LoginButton=this.page.locator('input[name="Login"]');
    }
    //methods
    async performLogin(url:string,username:string, passwordname:string){
        await this.page.goto(url);
        await this.UsernameInput.clear();
        await this.UsernameInput.fill(username);

        await this.PasswordnameInput.clear();
        await this.PasswordnameInput.fill(passwordname);

        await this.LoginButton.click();



    }

    


}