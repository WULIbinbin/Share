import { Component ,ChangeDetectorRef } from '@angular/core';
import { NavController, ToastController, AlertController, NavParams,Tabs,Platform } from 'ionic-angular';
import av from '../../app/getData';
import { home } from '../home/home';

@Component({
	selector: 'page-userInfo',
	templateUrl: 'userInfo.html'
})
export class userInfo {
    username:string = '';
    uicon:string = '';
    uid:string = '';
	constructor(public uidparam:NavParams,public cdsx: ChangeDetectorRef,public uidnav:NavController) {
        let that = this;
        if(uidparam.get('uid')){
            this.uid = uidparam.get('uid');
            const getUser = new av.Query('_User');
            getUser.get(this.uid).then(function(res) {
                that.uid = res.id;
                that.username = res.attributes.username;
                if(res.attributes.uIcon){
                    that.uicon = res.attributes.uIcon;
                }
                that.cdsx.detectChanges();
            }, function(error) {
    
            });
        }else{
            this.uidnav.pop();
        }
		
	}
    showQuan (){
		
	}
}
