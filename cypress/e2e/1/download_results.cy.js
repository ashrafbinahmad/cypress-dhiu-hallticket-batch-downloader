// import * from 'cypress'
// const cypress = require('cypress')
// const { default: students } = require('./students')
// const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');
const students = require('./students')

const USER_NAME = "MARK LIST"
const PASSWORD = "1"

const CLASS_NOW_LOADING = "1"


let token = "XaelIuLQcQKQJDwa2MgnU8eb5du4P-o3ID3OzZlRlaP9DAJifaSzEIBlBYD_OmSAVL2zb8FFUQZ5osPzHo9dlbkljbI1"
const classId = 273
const divId = 2004
const examId = 2171
let fullLink = "https://portal.dhiu.in/Examination/MarkList/PrintStudentWise?__RequestVerificationToken="+token+"&pdfprintBtn=Pdf+Print&ClassId="+classId+"&DivMasterId="+divId+"&ExamMasterId="+examId+"&studentId="
  describe("dsf", () => {
  
  
    it("a", () => {
    cy.visit("https://portal.dhiu.in/Dashbord");
    cy.get("#UserName").type(USER_NAME);
    cy.get("#Password").type(PASSWORD);
    cy.get("[type=submit]").click();
    // token = cy.getCookie("__RequestVerificationToken")
    students.forEach(student => {
        cy.visit("https://portal.dhiu.in/Examination/MarkList/StudentWiseMarkList")
          cy.request({
            method: "POST",
            url: "https://portal.dhiu.in/Examination/MarkList/PrintStudentWise?__RequestVerificationToken="+cy.getCookie("__RequestVerificationToken")+"&pdfprintBtn=Pdf+Print&ClassId="+classId+"&DivMasterId="+divId+"&ExamMasterId="+examId+"&studentId=" + student["@value"] ,
            form: true,
            body: { ClassId: classId,  __RequestVerificationToken: token, DivMasterId: divId,  ExamMasterId:examId, studentId: parseInt(student["@value"])  },
            encoding: "binary",
          }).then((r) => {
            cy.writeFile(`./files_result/${student["#text"]}.pdf`,r.body,'ascii');
          });
        // cy.downloadFile(fullLink + student["@value"],`./files_result`,`${student["#text"]}.pdf`)
        
        
      });
    });
  });
  
  Cypress.on("uncaught:exception", (err, runnable) => { 
   
    return false;
  });