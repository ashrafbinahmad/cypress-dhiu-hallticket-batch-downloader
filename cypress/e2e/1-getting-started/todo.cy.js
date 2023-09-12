// import * from 'cypress'
// const cypress = require('cypress')
const credentials = require('./credentials')

const CLASS_TO_LOOP = "10"
let stds = [
    ["8129453800", "510"],
  ];
  
  describe("template spec", () => {
  
  
    it("a", () => {
      credentials[CLASS_TO_LOOP].forEach((candidate) => {
        cy.visit("https://portal.dhiu.in/parent");
        cy.get("#UserName").type(candidate["username"]);
        cy.get("#Password").type(candidate["password"]);
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
            cy.writeFile(`./files/${CLASS_TO_LOOP}/${candidate.username}.pdf`, r.body, "binary");
          });
        })
        
      });
    });
  });
  
  Cypress.on("uncaught:exception", (err, runnable) => {
   
    return false;
  });