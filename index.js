// import * from 'cypress'
const cypress = require('cypress')
let stds = [
    ["8129453800", "510"],
  ];
  
  describe("template spec", () => {
  
  
    it("a", () => {
      stds.forEach((e) => {
        cy.visit("https://portal.dhiu.in/parent");
        cy.get("#UserName").type(e[0]);
        cy.get("#Password").type(e[1]);
        cy.get("[type=submit]").click();
        cy.visit("https://portal.dhiu.in/Parent/ParentsDetails/HallTicket")
        cy.get("option").contains("Half Yearly Examination").invoke("attr","value").then(e=>{
        console.log(e);
          cy.request({
            method: "POST",
            url: "https://portal.dhiu.in/Parent/ParentsDetails/HallTicket",
            form: true,
            body: { ExamsofClassId: e },
            encoding: "binary",
          }).then((r) => {
            cy.writeFile(`./files/${e[1]}.pdf`, r.body, "binary");
          });
        })
        
      });
    });
  });
  
  Cypress.on("uncaught:exception", (err, runnable) => {
   
    return false;
  });