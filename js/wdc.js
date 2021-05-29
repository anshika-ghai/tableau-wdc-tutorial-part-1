(function () {
    var myConnector = tableau.makeConnector();
  
    // This creates the Web Data Connector schema that
    // describes the information returned by hte WDC.
    myConnector.getSchema = function (schemaCallback) {
       var cols = [{
          id: "id",
          dataType: tableau.dataTypeEnum.int
       }, {
          id: "name",
          dataType: tableau.dataTypeEnum.string
       }, {
          id: "lat",
          dataType: tableau.dataTypeEnum.float
       }, {
         id: "long",
         dataType: tableau.dataTypeEnum.float
      }, {
         id: "status",
         dataType: tableau.dataTypeEnum.string
      }];
  
       var tableSchema = {
          id: "WDC1",
          alias: "Roedan API DATA",
          columns: cols
       };
       schemaCallback([tableSchema]);
    };
  
    // This function is called when data is required from the
    // Web Data Connector.
    myConnector.getData = function (table, doneCallback) {
       tableData = [];
  
       // We are manually adding data, but in future tutorials
       // we will connect to an external data source using the
       // ajax function.
       tableData.push(
         {"id": "93", "name": "Robert", "lat": "51.59923", "long": "-1.780778","status":"moving"},
         {"id": "95", "name": "Will", "lat": "52.649917", "long": "-1.070568","status":"stopped"},
         {"id": "51", "name": "Adam ", "lat": "51.755808", "long": "-0.426903","status":"offline"},
         {"id": "89", "name": "Blaine", "lat": "51.475328", "long": "-2.648648","status":"engine"},
         {"id": "21", "name": "Andy", "lat": "52.607458", "long": "1.291908","moving":"blue"},
         );
  
       table.appendRows(tableData);
       doneCallback();
    };
  
    // This is reqired to register the Web Data Connector.
    tableau.registerConnector(myConnector);
  
    // Once the document has loaded we will attached functionality
    // to the submitButton.
    $(document).ready(function () {
       $("#submitButton").click(function () {
          tableau.connectionName = "Roedan API Data Connected";
          tableau.submit();
       });
    });
 })();