import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { SubjectService } from '../share/subject.service';
import{UsersService} from '../users/users.service';
declare var $:any;
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
    data:any;
    id;
    p=1;
    total=0;
    socaudalam=0;
    socaudung=0;
    TraLoiDung:boolean=false;
    TraLoiSai:boolean=false;
    checked=null;
    AnsId=null;
    TotalMarks :number= 0;
    subject: Observable<any[]>;
    quiz :Observable<any[]>;
    count=0;
    getNameSubject:any;
    nameSubject=null;
    loadingNopBai:boolean=false;
    loggedIn :boolean;
    start_exam :boolean ;
    keyUser:any; 
  constructor(private router: Router,private userService : UsersService,private route:ActivatedRoute, db: AngularFireDatabase, public subjectService :SubjectService) {  
    this.route.paramMap.subscribe(pramas=>{this.id=pramas.get('subjectId')});
    this.loggedIn = (localStorage.getItem('usercurrent') != null);//kiem tra user da dang nhap chua!
    this.start_exam =this.loggedIn;
    this.keyUser=this.userService.currentUserValue;
    this.subject = this.subjectService.getSubject();
    if(this.subject==null){
      this.subjectService.quizs=[];
    }
    this.subject.subscribe(items =>{
        this.getNameSubject= items.find(item => item.Id ===this.id)
    })
    $(window).scrollTop(0);
  }

   //nhan id name subject de lay data tu database
   getId(id){
    this.subjectService.nameSubject =id;
    this.subjectService.getQuiz();
    } 
    getdata(){
      this.quiz = this.subjectService.quizs;    
    }
  ngOnInit() { 
    this.getId(this.id);
    this.getdata();
   
    setTimeout(()=>{
      if(this.subject==null){
        this.nameSubject = "Not Found data";
      }else{
      this.nameSubject = this.getNameSubject.Name;//gan ten cua mon thi
      }
    },3000)
    function get_elapsed_time_string(total_seconds) {
      function pretty_time_string(num) {
        return ( num < 10 ? "0" : "" ) + num;
      }
    
      var hours = Math.floor(total_seconds / 3600);
      total_seconds = total_seconds % 3600;
    
      var minutes = Math.floor(total_seconds / 60);
      total_seconds = total_seconds % 60;
    
      var seconds = Math.floor(total_seconds);
    
      // Pad the minutes and seconds with leading zeros, if required
      let hour = pretty_time_string(hours);
      let minute = pretty_time_string(minutes);
      let second = pretty_time_string(seconds);
    
      // Compose the string for display
      var currentTimeString = hour + ":" + minute + ":" + second;
    
      return currentTimeString;
    }
      $(document).ready(function(){
        var elapsed_seconds = 0;
        setInterval(function() {
          elapsed_seconds = elapsed_seconds + 1;
          $('#box_time').text(get_elapsed_time_string(elapsed_seconds));
        }, 1000);
      });
  }//end ngOnit

  //start exam ko can login
  btn_start(){
       this.start_exam=true;
     }

  
  AnsNext(){
    //this.ischeckQuiz=false;
    $('#btn_check').attr("disabled", true);
    $(window).scrollTop(100);
    this.socaudalam++;
    let IDdapdan =$('#AnsId').val();
    let marksAns = $('#MarksAns').val();
    if(this.checked==IDdapdan){
        this.TraLoiDung=true;
        this.socaudung++;
        this.TotalMarks+= Number(marksAns);
        setTimeout(()=>{
            this.TraLoiDung=false;
            $('#btn_check').attr("disabled", false);
            if(this.p <this.subjectService.quizs.length){this.p++;}              
        },2000)
    }else{
      this.TraLoiSai=true;
      setTimeout(()=>{
        this.TraLoiSai=false;
        $('#btn_check').attr("disabled", false);
        if(this.p <this.subjectService.quizs.length){this.p++;}              
    },2000)
    }
   
   }
  goiy(){
    alert("Tự mà làm. đéo có gợi ý đâu!");
  }
  nopBai(){
    $('#btn_nopbai').attr("disabled", true);
    
   let conf = confirm("Bạn có chắc chắn là muốn nộp bài!");
   if(conf===true){
    this.loadingNopBai = true;
    this.userService.updateUser(this.keyUser.key,{Mark:this.TotalMarks})
    setTimeout(() => {
      $('#btn_nopbai').attr("disabled", false);
      this.loadingNopBai = false; 
      this.router.navigate(['/account']);
    }, 4000) 
   }else{ $('#btn_nopbai').attr("disabled", false);}
  }
  
  isLastPage(){
    if(this.p===this.subjectService.quizs.length) return true;
  }

}
