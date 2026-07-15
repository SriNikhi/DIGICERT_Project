import { Page, Locator } from '@playwright/test';
// 1st create class for page.
export class HomePage {

    //variables

    private readonly page :Page;
    private readonly viewprofilemenu:Locator;
    private readonly logoutbtn:Locator;
    public homemenu:Locator;

    //constructir   
    constructor(page:Page){
        this.page=page;
        this.viewprofilemenu=this.page.getByRole('button', { name: 'View profile' });
        this.logoutbtn=this.page.getByRole('link', { name: 'Log Out' });
        this.homemenu=this.page.locator('span:has-text("Home")');

    }


    //methods

    async clickhomemenu(){
        await this.homemenu.click();
    }
    async openprofilemenu(){
        await this.viewprofilemenu.click();
    }

    async clickonlogout(){
        await this.logoutbtn.click();

    }

}
