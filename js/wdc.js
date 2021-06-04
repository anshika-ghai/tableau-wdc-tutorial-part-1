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
      } , {
         id: "lat",
         dataType: tableau.dataTypeEnum.float
      }, {
        id: "long",
        dataType: tableau.dataTypeEnum.float
     } ];
 
      var tableSchema = {
         id: "WDC1",
         alias: "Roedan API DATA",
         columns: cols
      };
      schemaCallback([tableSchema]);
   };




   myConnector.getData = function (table, doneCallback) {
      let tableData = [];
      var i = 0;
     
      $.getJSON(
        "https://track.roedan.com/api/get_devices?user_api_hash=$2y$10$Wj6i9fpdxW8wrvBZNDSM0O7JuTzNQwep/g5d4eX.WIoF6IDtDdpGy&lang=en",
        function (resp) {
          // Iterate over the JSON object
          for (i = 0, len = resp.length; i < len; i++) {
              for(j = 0, itemleng = resp[i].items.length;j<itemleng; j++){
            tableData.push({
               "id": resp[0].items[j].id,
               "name": resp[0].items[j].name,
               "lat" : resp[0].items[j].lat,
               "long": resp[0].items[j].lng,             
           });
         }
      }
        
          table.appendRows(tableData);
          doneCallback();
        
        }
      );
    };


 /*
    myConnector.getData = function(table, doneCallback) {
     $.getJSON("C:\Users\Owner\Documents\data_AG\response.json", function(resp) {
         var feat = resp.features,
             tableData = [];
        print("features aree" + feat)
         // Iterate over the JSON object
         for (var i = 0, len = feat.length; i < len; i++) {
             tableData.push({
                 "id": feat[i].id,
                 "name": feat[i].properties.name,
                 "lat" : feat[i].properties.lat,
                 "long": feat[i].properties.long,
                 "status" : feat[i].properties.status              
             });
         }
         print("checkingggggggggg2 "+tableData)
         table.appendRows(tableData);
         doneCallback();
     });

 };  */


   // This function is called when data is required from the
   // Web Data Connector.
    /*myConnector.getData = function (table, doneCallback) {
      tableData = [];
 
      // We are manually adding data, but in future tutorials
      // we will connect to an external data source using the
      // ajax function.
      tableData.push(
        {"id": "93", "name": "Robert", "lat": "52.59923", "long": "-1.780778","status":"moving"},
        {"id": "95", "name": "Will", "lat": "52.649917", "long": "-1.070568","status":"stopped"},
        {"id": "51", "name": "Adam ", "lat": "51.755808", "long": "-0.426903","status":"offline"},
        {"id": "89", "name": "Blaine", "lat": "51.475328", "long": "-2.648648","status":"engine"},
        {"id": "21", "name": "Andy", "lat": "52.607458", "long": "1.291908","status":"blue"},
        );
      console.log("Connector checkinngggggg" +tableData); 
      table.appendRows(tableData);
      console.log("print table"+table)
      doneCallback();
   };*/
  
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