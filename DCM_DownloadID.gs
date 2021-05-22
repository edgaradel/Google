/*
  Descargar histórico DCM MEX
*/

function DownloadDCMReportsID() 
{
      //ProfileID
      var id_pf  = 3154245;      
      //Reports ID's
      var id_reports = ['97362176','97361070','97361162']; //'basic', 'conversions', 'streamVideo'
      //DCM Reports folder ID
      var id_folder = '0B7ugPHSFvzjKRXd6RnBrWm4zOVU';
      //Name Files
      var name_files = ['Basic_Daily','Conversions_Daily','StreamV_Daily'];   
      //Basic Report Files
      var file_id0=['591305217','591302238','591305213','591305212','591304894','591302227','591305127'];
    
    //Conversions Report Files                  
    var file_id0=['591305227','591302245','591302248','591305224','591305223','591304906','591302239'];
                 
    //Stream Report Files
    var file_id=['591305137','591305135','591304913','591304912','591302250','591302251','591305228'];
 
     var dFolder = DriveApp.getFolderById(id_folder);
     Logger.log(dFolder);
     

    for (var i = 0; i < file_id.length; i++)
    {
      var reportFile = DoubleClickCampaigns.Reports.Files.get(id_pf, id_reports[2], file_id[i]); 
      Logger.log(reportFile.id)
      Logger.log(reportFile.dateRange.startDate)
      if(reportFile.urls) 
      {
        var httpOptions = {
          'method' : 'get',
          'headers': {'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()}             
        }
        //Limited by 10MB
        var contents = UrlFetchApp.fetch(reportFile.urls.apiUrl, httpOptions);                          
        
        //Create CSV en DCM Reports/
        dFolder.createFile(name_files[2] + '-' + reportFile.dateRange.startDate, contents, MimeType.CSV);
      }
    }                      
}
