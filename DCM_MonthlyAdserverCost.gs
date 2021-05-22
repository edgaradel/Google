/*
  Download and Export to Drive daily Reports AdServerCost DCM - MEX
*/

function DownloadDCMReportsAdServer() 
{
          
  //Date One day before the runing day
  var date = Utilities.formatDate(new Date(Date.now() - 1*24*60*60*1000),"GMT-05:00","dd/MM/yyyy");
  //ProfileID
  //var id_pf  = 3154245;
  var ids_pf = ['3154245','4270817','4272053']; //OMD, Bacardi, Luxottica
  
  //DCM Reports folder ID Drive
  var id_folder = '0B7ugPHSFvzjKVnpCeEQ3TVNnNFE';
  //Reports ID's
  var id_reports = ['102275974','111725179','111719075']; //ASC OMD, ASC Bacardi, ASC Luxottica
  //Name Files
  var name_files = ['AdSCost_Monthly_OMD','AdSCost_Monthly_Bacardi','AdSCost_Monthly_Luxottica'];
  
  //Create Folder Drive, Just the First Time
  //var dFolder = DriveApp.createFolder("DCM Reports");
  //Logger.log(dFolder.getId());
  
  var dFolder = DriveApp.getFolderById(id_folder);
  Logger.log(dFolder);
 
  for (var i = 0; i < id_reports.length; i++)
  {
    Logger.log(ids_pf[i])
    Logger.log(id_reports[i])
    //Busca último File creado índice [0]
    var inter = DoubleClickCampaigns.Reports.Files.list(ids_pf[i], id_reports[i]);
    var reportFile = inter.items[0];        
    
    //File ID a descargar
    Logger.log(reportFile.id);
    
    if(reportFile.urls) 
    {
        var httpOptions = {
          'method' : 'get',
          'headers': {'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()}             
        }
        //Limited by 10MB
        var contents = UrlFetchApp.fetch(reportFile.urls.apiUrl, httpOptions);
        
        //Logger.log(contents);
        
        //Create CSV en DCM Reports/
        dFolder.createFile(name_files[i] + '-' + date, contents, MimeType.CSV);
    }        
  }
}
