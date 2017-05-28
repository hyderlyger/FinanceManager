import { Injectable } from '@angular/core';
import { DBProvider } from '../providers/db-provider';
import Dropbox from 'dropbox';
import 'rxjs/add/operator/map';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DropboxProvider {
 
  accessToken : string;
  appKey: any;
  redirectURI: any;
  url: any;

  constructor(private dbprovider : DBProvider, public iab: InAppBrowser) {
    console.log('Hello DropboxProvider Provider');

    this.appKey = 'snwcmirqzfucjxy';
    this.redirectURI = 'http://localhost';
    this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=' + this.appKey + '&redirect_uri=' + this.redirectURI + '&response_type=token';
 
    //this.setAccessToken('eaPCGJGRTGYAAAAAAAAAtKM0DU-eYaotNT6W13L4bKu8PWjCCqkaY4xKfY9tqms5');  //my access token
  }
 
  login(){
 
    return new Promise((resolve, reject) => {
      if(this.accessToken) //already authenticated
        resolve(true);
      else{
        let browser = this.iab.create(this.url, '_blank');
  
        let listener = browser.on('loadstart').subscribe((event: any) => {
    
          //Ignore the dropbox authorize screen
          if(event.url.indexOf('oauth2/authorize') > -1){
            return;
          }
    
          //Check the redirect uri
          if(event.url.indexOf("#access_token") > -1){ //this.redirectURI) > -1 ){
            let token = event.url.split('=')[1].split('&')[0];
            this.accessToken = token;
            resolve(event.url);
            listener.unsubscribe();
            browser.close();
          } else 
          if(event.url.indexOf("access_denied") > -1)  {
            listener.unsubscribe();
            browser.close();
            reject("Could not authenticate. Please try again.");
          }
    
        });

      }

    });
  
  }

  saveDatabase()
  {
    return new Promise((resolve)=>{
      var _client = new Dropbox({ accessToken: this.accessToken });

      // Making Files to save
      var file1 : File = new File([JSON.stringify(this.dbprovider.amountEntries)], this.dbprovider.dbConstants.db_ammountenteries +".txt");
      var file2 : File = new File([JSON.stringify(this.dbprovider.accounts)], this.dbprovider.dbConstants.db_accounts +".txt");
      var file3 : File = new File([JSON.stringify(this.dbprovider.categories)], this.dbprovider.dbConstants.db_categories +".txt");

      Promise.all([ _client.filesUpload({path: '/' + file1.name, contents: file1, mode: { '.tag': 'overwrite' } }),
                    _client.filesUpload({path: '/' + file2.name, contents: file2, mode: { '.tag': 'overwrite' } }),
                    _client.filesUpload({path: '/' + file3.name, contents: file3, mode: { '.tag': 'overwrite' } }) ])
                  .then(res=>{
                    console.log(res);
                    resolve(true);
                  }).catch(error=>{
                    console.log(error);
                    resolve(false);
                  });
    });
    
  }
  restoreDatabase()
  {
    return new Promise((resolve)=>{
      var _client = new Dropbox({ accessToken: this.accessToken });
      var file1 = this.dbprovider.dbConstants.db_ammountenteries +".txt";
      var file2 = this.dbprovider.dbConstants.db_accounts +".txt";
      var file3 = this.dbprovider.dbConstants.db_categories +".txt";

      Promise.all([ _client.filesGetMetadata({path: '/' + file1}),
                    _client.filesGetMetadata({path: '/' + file2}),
                    _client.filesGetMetadata({path: '/' + file3}) ]).then(res=>{
      
                      if(res.length == 3){  //files exist

                         Promise.all([_client.filesDownload({path: '/' + file1}),
                                      _client.filesDownload({path: '/' + file2}),
                                      _client.filesDownload({path: '/' + file3}) ]).then(res => {

                                        if(res.length==3){
                                          
                                          if(res[0]["fileBlob"] && res[1]["fileBlob"] && res[2]["fileBlob"]){
                                            
                                            Promise.all([ this.readFilefromBlob(res[0].name, res[0]["fileBlob"]),
                                                          this.readFilefromBlob(res[1].name, res[1]["fileBlob"]),
                                                          this.readFilefromBlob(res[2].name, res[2]["fileBlob"]) ])
                                                          .then((tables : Array<FileContent>)=>{
                                                            //restoring data
                                                            if(tables.length == 3)
                                                            {
                                                                Promise.all([ this.dbprovider.RestoreTable(tables[0].name,tables[0].stringcontent),
                                                                              this.dbprovider.RestoreTable(tables[1].name,tables[1].stringcontent),
                                                                              this.dbprovider.RestoreTable(tables[2].name,tables[2].stringcontent) ])
                                                                              .then( () =>{
                                                                                this.dbprovider.LoadAllDatabaseData().then(()=>{
                                                                                  resolve("true");
                                                                                })
                                                                              });
                                                            }else{
                                                              resolve("Unable to Read Files");
                                                            }
                                                          });
                                          }else{
                                            resolve("Unable to Read Files");
                                          }
                                        }else{
                                          resolve("Unable to Read Files");
                                        }

                                      }).catch(error=>{ //not helping
                                        resolve("Unable to Read Files");
                                      });

                      }else{
                        resolve("File Not Found");
                      }

                    }).catch(err=>{
                      resolve("File Not Found");
                    });
    });
  }

  readFilefromBlob(name : string, blob : Blob){
    return new Promise((resolve)=>{
      var reader = new FileReader();
        reader.onloadend = (e) => {
          resolve(new FileContent(name.replace(".txt",""), e.srcElement["result"]));
        };
        reader.readAsText(blob);
    });
  }
   
}
export class FileContent {
    public constructor( public name : string,
                        public stringcontent : string)
                        {
    }
}
