/*
  Generar histórico de DCM LATAM
*/

function CreateDCMReportsLatam() {
    //Date  
    var date = Utilities.formatDate(new Date(), "GMT-05:00", "MM/dd/yyyy HH:mm");
    //ProfileID
    var id_pf  = 4092538;
    //AcountID
    var acc_id = 5841;
    //DCM Reports folder ID
    var id_folder = '0B7ugPHSFvzjKRXd6RnBrWm4zOVU';
    //Reports ID's
    var id_reports = ['98067874','98068761','98072139']; //'basic', 'conversions', 'streamVideo'
    //Name Files
    var name_files = ['Basic_Daily_Latam','Conversions_Daily_Latam','StreamV_Daily_Latam'];   
    //Name Reports
    var name_reports = ['Report_Basic_Daily_Latam','Report_Conversions_Daily_Latam','Report_StreamV_Daily_Latam'];
    //Número de meses a iterar
    var num_meses = 4;   //Hasta Julio
     
    //Itera por Reporte  
    //Script runtime = 6min, por esto se ejecuta 1 por 1
    for (var i=2; i<3/*name_reports.length*/; i++)
    {
        Logger.log('i:'+i)
        //Itera por Mes
        for (var j=0; j<num_meses; j++)
        {   
            
            if (j==0|j==2|j==4) num_days=31;
            else if (j==3|j==5) num_days=30;
            else if (j==1) num_days=28;
            else if (j==6) num_days=31; //No ha terminado el mes
            
            Logger.log('j:'+j);
            
            //Itera por Día del mes
            for (var k=0; k<num_days; k++)
            {                
                var date_dyn='2017-';
                var date_dyn = date_dyn.concat(j+1,'-',k+1);                                
                Logger.log(date_dyn);
                
                var lmt = DoubleClickCampaigns.Reports.get(id_pf, id_reports[i]).lastModifiedTime;
                var resource = {
                        "ownerProfileId": id_pf,
                        "lastModifiedTime": lmt,
                        "accountId": acc_id,
                        "type": "STANDARD",
                        "name": name_reports[i],
                        "criteria": 
                        {
                            "dateRange": {
                                "endDate": date_dyn,
                                "startDate": date_dyn
                            }
                        }               
                }; 
                Logger.log('patch'+id_reports[i]);
                
                DoubleClickCampaigns.Reports.patch(resource, id_pf, id_reports[i]);  //Actualiza parcialmente el reporte
                DoubleClickCampaigns.Reports.run(id_pf, id_reports[i]);  //Ejecuta Reporte                
            }                                                               
        }
    }    
}
