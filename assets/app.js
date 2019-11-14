function toHex(s) {
	// utf8 to latin1
	var s = unescape(encodeURIComponent(s))
	var h = ''
	for (var i = 0; i < s.length; i++) {
			h += s.charCodeAt(i).toString(16)
	}
	return h
}

function fromHex(h) {
	var s = ''
	for (var i = 0; i < h.length; i+=2) {
			s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
	}
	return decodeURIComponent(escape(s))
}

var word_enc='d0b2d0b0d180d18f20d0b2d0b5d0bbd0b8d0bad0bed0bbd0b5d0bfd0bdd0b0';
var word=fromHex(word_enc);

function unique_char(str1)
{
 var str=str1;
 var uniql="";
 for (var x=0;x < str.length;x++)
 {

 if(uniql.indexOf(str.charAt(x))==-1)
  {
  uniql += str[x];  
  
   }
  }
  uniql=uniql.split('').sort().join('');
  return uniql;  
}  

var app0 = new Vue({
	el: '#secretapp',
	data: {
		input_answer: ''
	},
	computed:{
		input_answer_l:function(){
			if(!this.input_answer){
				this.input_answer='';
			}
			return this.input_answer.toLowerCase();
		},
		state1:function(){
			var res=false;
			if(this.input_answer_l.length==word.length){
				res=true;
			}
			return res;
		},
		state5:function(){
			var res=false;
			if(this.input_answer_l==word){
				res=true;

			}
			
			return res;
		},
		state6:function(){
			var res=false;
			if( unique_char(this.input_answer_l) == unique_char(word) ){
				res=true;
			}
			return res;
		},
		state7:function(){
			var res=false;
			if(this.input_answer_l.indexOf(' ')==word.indexOf(' ')){
				res=true;
			}
			return res;
		},
		state8:function(){
			var res=false;
			var parts=this.input_answer_l.split(' ');
			if((parts.length>1) && (parts[1].substring(0,7)==word.split(' ')[1].substring(0,7) ) ){
				res=true;
			}
			return res;
		},
		state9:function(){
			var res=false;
			if(this.input_answer_l.substring(0,1) == word.substring(0,1)){
				res=true;
			}
			return res;
		},
		state10:function(){
			var res=false;
			if( this.input_answer_l.endsWith( word.substring(word.length,word.length-1) ) ){
				res=true;
			}
			return res;
		},
		state11:function(){
			var res=true;
			var word_chars=unique_char(word);
			var input_chars=unique_char(this.input_answer_l);
			
			for (var x=0;x < input_chars.length;x++)
			{

				if(word_chars.indexOf(input_chars.charAt(x))==-1)
				{
					res=false;
					break;
				}
			}

			return res;
		},
		state12:function(){
			var res=false;
			var parts=this.input_answer_l.split(' ');
			if((parts.length>1) && (parts[1].substring(0,1)==word.split(' ')[1].substring(0,1) ) ){
				res=true;
			}
			return res;
		},
		
	}
});
Vue.component('indicator', {
	props: ['state'],
	template: '<div class="indicator-wrapper"><slot></slot><span :class="{\'indicator\':true,\'indicator_on\':state}"></span></div>'
});

var element=document.getElementById('secretapp-input');

//
element.value="что-то тут надо ввести";
var event;
if(document.createEvent){
    event = document.createEvent("HTMLEvents");
    event.initEvent("input", true, true);
    event.eventName = "input";
    element.dispatchEvent(event);
} else {
    event = document.createEventObject();
    event.eventName = "input";
    event.eventType = "input";
    element.fireEvent("on" + event.eventType, event);
}
element.value="";
//

var buttons=document.querySelectorAll('.hint-wrapper button');
for(var i=0;i<buttons.length;i++){
	buttons[i].addEventListener('click',function(ev){
		ev.preventDefault();
		var hint=this.parentElement.querySelector('.hint');
		hint.classList.toggle('show');
		hint.parentElement.classList.toggle('show');
	});
}
