/*
  Reach Reports, aún no se implementa esta Data
*/

function DownloadDCMReportsM() 
{
          
  //Date  
  var date = Utilities.formatDate(new Date(), "GMT-05:00", "MM/dd/yyyy HH:mm");
  //ProfileID
  var id_pf  = 3154245;
  //DCM Reports folder ID
  var id_folder = '0B7ugPHSFvzjKRXd6RnBrWm4zOVU';
  //Reports ID's
  var id_reports = ['91393947','91394165']; //'ReachMedia', 'ReachCampaign'
  //Name Files
  var name_files = ['ReachMedia_Daily','ReachCampaign_Daily'];
  
  //Create Folder Drive, Just the First Time
  //var dFolder = DriveApp.createFolder("DCM Reports");
  //Logger.log(dFolder.getId());
  
  var dFolder = DriveApp.getFolderById(id_folder);
  Logger.log(dFolder);
 
  for (var i = 0; i < id_reports.length; i++)
  {
    //Busca último File creado índice [0]
    var inter = DoubleClickCampaigns.Reports.Files.list(id_pf, id_reports[i]);
    var reportFile = inter.items[0];        
    
    //File ID a descargar
    Logger.log(reportFile.id);
    Logger.log(reportFile.urls);
    
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
