
//======================== Wait for the conetent of extension to load=================//

document.addEventListener('DOMContentLoaded', () =>{
    document.querySelector('#GetCsv').addEventListener('click', DownloadCsv)


    //========== function to download csv ===========================//
    function DownloadCsv()
    {
        
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            console.log(tabs[0].url);
            let pageUrl = tabs[0].url ;
            jQuery.get( pageUrl, function( data ) {
            console.log(data);  
            console.log(jQuery(data).find( "table" ).prevObject[3]);  
            let MyHTMLtable = jQuery(data).find( "table" ).prevObject[3];
            
            console.log(MyHTMLtable.querySelectorAll('tr').length)
                let i;
                let row = '';
            for(i=0;i<MyHTMLtable.querySelectorAll('tr').length;i++)
            {
                

               //console.log( MyHTMLtable.querySelectorAll('tr')[i])

               current_row =  MyHTMLtable.querySelectorAll('tr')[i];

               //console.log(current_row.querySelectorAll('td').length)

               if(current_row.querySelectorAll('th').length)
               {
                    current_row_size = current_row.querySelectorAll('th').length;

                    let j;
                    for(j=0;j<current_row_size;j++)
                    {
                     
                      console.log(current_row.querySelectorAll('th')[j].textContent + ',')
                      row = row + current_row.querySelectorAll('th')[j].textContent
                      
                      if(j != current_row_size - 1)
                      {
                          // if current column is not last then only add comma
                          row += ','
                      }
     
                     
                    }
                    
                    
                          // append new line feed to the end of each row
                         row += '\n';
               }








               current_row_size = current_row.querySelectorAll('td').length;
                let j;
               for(j=0;j<current_row_size;j++)
               {
                 console.log(current_row.querySelectorAll('td')[j].textContent + ',')
                 row = row + current_row.querySelectorAll('td')[j].textContent

                 if(j != current_row_size - 1)
                 {
                     // if current column is not last then only add comma
                     row += ','
                 }

                
               }
               
               
                     // append new line feed to the end of each row
                    row += '\n';
               
               
            }
            let csv ='';
            // append row to CSV content
            csv += row;
            console.log("here is the csv data")
            console.log(csv)


            // create download link on the target page
            jQuery('body').append('<a download="proxies.csv">Download Your file</a>');
                    
            // create object URL
            jQuery('a[download="proxies.csv"]').attr('href', window.URL.createObjectURL(new Blob([csv], {type: 'text/csv'})));
            
            // mimic download link click
            jQuery('a[download="proxies.csv"]')[0].click();
                       }
            )

            })
        }
});