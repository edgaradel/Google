/*
  Donwload and Export to Drive daily Reports Basic, Conv and Video DCM - LATAM
*/

function DownloadDCMReportsLatam() 
{
          
  //Date One day before the runing day
  var date = Utilities.formatDate(new Date(Date.now() - 1*24*60*60*1000),"GMT-05:00","dd/MM/yyyy");
  //ProfileID
  var id_pf  = 4092538;
  //DCM Reports folder ID
  var id_folders = ['0B7ugPHSFvzjKcXRXX1BZdkhqQk0','0B7ugPHSFvzjKOGhqa1FydFlYVlU','0B7ugPHSFvzjKVlJfb3RBOEp1ekk']; //'basic', 'conversions', 'streamVideo'
  //Reports ID's
  var id_reports = ['98067874','98068761','98072139']; //'basic', 'conversions', 'streamVideo'
  //Name Files
  var name_files = ['Basic_Daily_Latam','Conversions_Daily_Latam','StreamV_Daily_Latam'];
  
  //Create Folder Drive, Just the First Time
  //var dFolder = DriveApp.createFolder("DCM Reports");
  //Logger.log(dFolder.getId());
 
  for (var i = 0; i < id_reports.length; i++)
  {
    //Obtiene Folder correspondiente
    var dFolder = DriveApp.getFolderById(id_folders[i]);
    //Busca último File creado índice [0]
    var inter = DoubleClickCampaigns.Reports.Files.list(id_pf, id_reports[i]);
    var reportFile = inter.items[0];        
    
    //Drive Folder
    Logger.log(dFolder.getName())
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
