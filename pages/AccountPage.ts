import { Page, Locator, expect } from '@playwright/test';
// 1st create class for page.
export class AccountPage {

    //variable
     page:Page;
    AccounttabMenu :Locator;
    AccountNameMenu:Locator;
    Relatedtab:Locator;
    ContactsList:Locator;//(//tbody/tr[1]/th[1])[2]
    newbtn:Locator;
    SalutationValue:Locator;
    LastName:Locator;
    Emailfield:Locator;
    savebtn:Locator;
    firstAccountCell:Locator;
    protected searchbtn:Locator;
    cancelbtn:Locator;
    public entersearchfield:Locator;




    //concstructor
    constructor(page:Page){
        this.page=page;
        this.AccounttabMenu=page.locator("a[title='Accounts'] span[class='slds-truncate']");
        this.AccountNameMenu=page.getByRole('button', { name: 'Sort by:Account Name' });
        this.firstAccountCell = page.locator('(//tbody//tr[1]//th[1])[1]');
        this.Relatedtab=page.getByRole('tab', { name: 'Related' });
        this.ContactsList=page.locator("//article[@aria-label='Contacts']//a[@class='slds-card__header-link baseCard__header-title-container']");
        this.newbtn=page.locator("//div[@class='slds-media slds-media--center slds-has-flexi-truncate']//button[@name='NewContact'][normalize-space()='New']");
        this.SalutationValue=page.locator("[name='salutation']");
        this.LastName=page.locator('[name="lastName"]');
        this.Emailfield=page.locator('[name="Email"]');
        this.savebtn=page.locator("button[name='SaveEdit']");
        this.searchbtn=page.getByRole('button', { name: 'Search' });
        this.entersearchfield=page.getByRole('searchbox');
        this.cancelbtn =page.locator('[name="CancelEdit"]');

    }

    //methods

    async clickAcoountMenu(){
        await this.AccounttabMenu.click();
        await expect(this.firstAccountCell).toBeVisible({ timeout: 10000 });
        const cellText = await this.firstAccountCell.textContent();
        console.log(cellText);
        await this.page.locator("a[title='Autotest1'] slot span").click();
        
        
    }

    async OpenRelatedList(){
        await this.Relatedtab.click();
        // Wait for the element with class slds-tabs_card
        await this.page.waitForSelector('.slds-tabs_card');
    }

    async OpenContacts(){
        // Wait until the page is fully loaded 
        await this.page.waitForLoadState('load');
        const textcontact=await this.ContactsList.textContent();
        console.log(textcontact);

        
        await this.newbtn.click();
        

    }

    async fillContactForm(data: { Salutationoption: string; Email: string; LastName: string }): Promise<void> {
        const textfield = await this.page.getByText('*Name');
        console.log(textfield);
        
        await this.SalutationValue.click(); // open dropdown
        await this.page.getByRole('option', { name: data.Salutationoption }).click(); // select value

        await this.LastName.fill(data.LastName);
        await this.Emailfield.fill(data.Email);
        await this.savebtn.click();
        await this.cancelbtn.click();//cancel btn

    }

    

    

  async searchAndOpencontact(data: { contactName: string }): Promise<void> {
    const page = this.page;
    const contactName = data.contactName.trim();

    console.log(`🔍 Searching for Quote: ${contactName}...`);

    await this.searchbtn.click();
    await this.entersearchfield.fill(contactName);
    await page.keyboard.press('Enter');

    await page.getByRole('heading', { name: 'Search Results' }).waitFor();

    await page.getByRole('link', { name: contactName, exact: true }).first().click();

    await page.waitForTimeout(3000);

    console.log(`✓ Quote opened: ${contactName}`);
  }
}


