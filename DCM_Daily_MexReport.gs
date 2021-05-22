/*
  Download and Export to Drive daily Reports Basic, Conv and Video DCM - MEX
*/

function DownloadDCMReportsD() 
{
          
  //Date One day before the runing day
  var date = Utilities.formatDate(new Date(Date.now() - 1*24*60*60*1000),"GMT-05:00","dd/MM/yyyy");
  //ProfileID
  var id_pf  = 3154245;
  //DCM Reports folder ID
  //var id_folder = '0B7ugPHSFvzjKRXd6RnBrWm4zOVU';
  var id_folders = ['0B7ugPHSFvzjKLVVnam9kQXVGdDA','0B7ugPHSFvzjKTEpvN0FqUWRJVHM','0B7ugPHSFvzjKRFpBbERZT2x3SGs']; //'basic', 'conversions', 'streamVideo'
  //Reports ID's
  var id_reports = ['97362176','97361070','97361162']; //'basic', 'conversions', 'streamVideo'
  //Name Files
  var name_files = ['Basic_Daily','Conversions_Daily','StreamV_Daily'];
  
  //Create Folder Drive, Just the First Time
  //var dFolder = DriveApp.createFolder("DCM Reports");
  //Logger.log(dFolder.getId());
  
  //var dFolder = DriveApp.getFolderById(id_folder);
 
  for (var i = 0; i < id_reports.length; i++)
  {
    //Obtiene Folder correspondiente
    var dFolder = DriveApp.getFolderById(id_folders[i]);
    //Busca último File creado índice [0]
    var inter = DoubleClickCampaigns.Reports.Files.list(id_pf, id_reports[i]);
    var reportFile = inter.items[0];        
    
    //Drive Folder
    Logger.log(dFolder.getName());
    //File ID a descargar
    Logger.log(reportFile.fileName);    
    
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
