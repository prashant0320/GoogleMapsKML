import qSessionObject from "./qSessionObject";
import Filter from "./filter";

let caseNumberList = new qSessionObject({
  qInfo: {
    qType: "visualization"
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ["[CaseNumber]"],
      qFieldLabels: ["Case Number"]
    },
    qAutoSortByState: {
      qDisplayNumberOfRows: 1
    },
    qShowAlternatives: true,
    qInitialDataFetch: [{
      qWidth: 1,
      qHeight: 1000
    }]
  }
});
let subjectList = new qSessionObject({
  qInfo: {
    qType: "visualization"
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ["[Subject]"],
      qFieldLabels: ["Subject"]
    },
    qAutoSortByState: {
      qDisplayNumberOfRows: 1
    },
    qShowAlternatives: true,
    qInitialDataFetch: [{
      qWidth: 1,
      qHeight: 1000
    }]
  }
});
let caseOwnerList = new qSessionObject({
  qInfo: {
    qType: "visualization"
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ["[Case Owner]"],
      qFieldLabels: ["Case Owner"]
    },
    qAutoSortByState: {
      qDisplayNumberOfRows: 1
    },
    qShowAlternatives: true,
    qInitialDataFetch: [{
      qWidth: 1,
      qHeight: 1000
    }]
  }
});


$(() => {
  let caseNumberFilter = new Filter(caseNumberList, "#case-number-filter");
  let subjectFilter = new Filter(subjectList, "#subject-filter");
  let caseOwnerFilter = new Filter(caseOwnerList, "#case-owner-filter");
  //let chart = new Item ()
  Promise.all([caseNumberList.open(), subjectList.open(), caseOwnerList.open()]).then(() => {
    $("#loading").hide();
    $("#loaded").show();
    caseNumberFilter.init();
    subjectFilter.init();
    caseOwnerFilter.init();
  });
});
