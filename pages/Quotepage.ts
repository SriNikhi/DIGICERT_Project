import { Page, Locator, expect } from '@playwright/test';
import { AccountPage } from './AccountPage';




export class QuotePage extends AccountPage {
    page:Page;
     searchbtn1:Locator;
        
    entersearchfield1:Locator;
    browsecatalogs:Locator;
    allproducts:Locator;
    allproductsbtn:Locator;
    nextbtn:Locator;
    savequote:Locator;
    carttab:Locator;

    productID:Locator;

    // store selected products as a class property 
     selectedProducts: string[] = [];
    
   

  constructor(page: Page) {
    super(page);
      this.page=page;
       this.searchbtn1=page.getByRole('button', { name: 'Search' });
        this.entersearchfield1=page.getByRole('searchbox');
        this.browsecatalogs = page.getByRole('button', { name: 'Browse Catalogs' });
        this.allproducts = page.getByRole('rowheader', { name: 'All Products' });
        this.allproductsbtn=page.locator("//tbody/tr[6]/td[1]");
        this.nextbtn= page.getByText('Next', { exact: true });
        this.savequote=page.getByRole('button', { name: 'Save Quote' });
        this.carttab=page.getByRole('tab', { name: /Cart/i });
        this.productID=page.locator("a[class='cell-link inner-focus']");     
  }
 // async clickAcoountMenu(): Promise<void> {
      
 // }
  async searchAndOpenquote(quotedata: { quoteName: string }): Promise<void> {
    const page = this.page;
    await this.searchbtn1.click();
    const contactName = quotedata.quoteName.trim();

    console.log(`🔍 Searching for Quote: ${quotedata.quoteName}...`);

    
    await this.entersearchfield1.fill(quotedata.quoteName);
    await page.keyboard.press('Enter');

    await page.waitForSelector("table.slds-table");

    //await page.getByRole('link', { name: quotedata.quoteName, exact: true }).first().click();
    //await page.locator("(//table[contains(@class,'slds-table')]//tr[1]//th)[1]").click();
    const firstCell = page.locator("//tbody//th//a"); 
    await firstCell.click();

    await page.waitForTimeout(3000);

    console.log(`✓ Quote opened: ${quotedata.quoteName}`);
  }

  async ConfigureStandaloneProduct(){
    //await super.clickAcoountMenu(); //parent class method
    //await this.AccounttabMenu         // parent class variable.
    
    await this.browsecatalogs.click();
    await this.allproducts.click();
   
    await this.allproductsbtn.click();
    await this.nextbtn.click();
    // Wait for product table to load 
    await this.page.waitForSelector("table.slds-table tbody");
    // Get all product rows 
    const productRows = this.page.locator("table.slds-table tbody tr"); 
    const rowCount = await productRows.count();
    //const selectedProducts: string[] = [];
    this.selectedProducts = [];
    // Loop through each row
     for (let i = 0; i < rowCount; i++)
         { 
            
            const gearIcon = productRows.nth(i).locator("button[title='Configure']");
            // Check if gear icon is disabled 
            const isDisabled = await gearIcon.getAttribute('disabled') !== null; 
            
            

            
            if (isDisabled) {
                const productName = await productRows.nth(i).locator("div[class='slds-truncate slds-m-bottom_x-small heading-style']").innerText();;
           //const productNames=.innerText(); productName
                
            this.selectedProducts.push(productName);
                
                // Click the Add button 
                const addButton = productRows.nth(i).locator("button", { hasText: "Add" }); 
                await addButton.click(); 
            console.log(`✅ Added product from row ${i + 1}`);
            
            
             }

         }

         console.log("✅ Selected Products:", this.selectedProducts);

         await this.savequote.click();
        
    }

    async clickcarttab(){
        await this.carttab.click();
        
    const rowCount = await this.productID.count();
    const productIds: string[] = [];

    for (let i = 0; i < rowCount; i++) {
    
    const productIdCell = this.productID.nth(i); // adjust if Product ID is in a different column
    const productIdText = await productIdCell.innerText();
    productIds.push(productIdText.trim());
    }

    console.log("📦 Product IDs:", productIds);


    // Compare arrays 
    const missingProducts: string[] = []; 
    for (const product of this.selectedProducts) 
        {
             if (!productIds.includes(product))
                 {
                     missingProducts.push(product);

                  } 
        }
            if (missingProducts.length === 0) 
                {
                     console.log("✅ All selected products are present in the cart."); 
                }
                 else
                     { console.log("❌ Missing products in cart:", missingProducts); 

                     }

        }




}

