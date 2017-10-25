import { Component, ChangeDetectorRef,ViewChild } from '@angular/core';
import { NavController,Tabs } from 'ionic-angular';
import av from '../../app/getData';
import { write } from '../write/write';
import { login } from '../login/login';
import { userInfo } from '../userInfo/userInfo';
import { imgload } from '../../providers/imgload';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class home {
  @ViewChild('mainTabs') tabRef: Tabs;
  forces:any[] = [];
  forceThen:String = '关注';
  HOME:String = 'HOT';
  constructor(private imghome:imgload, public navCtrl: NavController, public cd: ChangeDetectorRef) {    
    const nUser = new av.Query('uArtive');
    const that = this;
    const loginTime = JSON.parse(localStorage.getItem('user')).time;
    const nTime = new Date().getTime();
    if(loginTime<nTime){
      setTimeout(()=>{        
        that.navCtrl.push(login,{
          item1:''
        });             
      },200)
    }  
    nUser.find().then(function(res){
       that.forces = res.reverse();
       console.log(that.forces)
       that.cd.detectChanges();
    },function(err){
    });    
  }
  gotoUserInfo(uid){
    this.navCtrl.push(userInfo,{
      uid:uid
    });
  }
  toForce(id){
    const _this = this;
    av.User.current().follow(id).then(function(res){
       if(res){
          _this.forceThen = '已关注';         
       }
    }, function(err){
      console.dir(err);
    });
  }
  gotocreate(){
    this.navCtrl.push(write,{
			item1:''
		});
  }
}
