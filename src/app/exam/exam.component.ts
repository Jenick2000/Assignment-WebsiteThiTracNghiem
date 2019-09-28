import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  constructor() { }
  start:boolean=true;
  exam:boolean=false;
  // click start
  btn_start(){
    this.start=false;
    this.exam=true;
    }
  ngOnInit() {
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



}
