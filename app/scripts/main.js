$(document).ready(function(){
  $('.info').on('change', function(){
    var redStar = this.id;
    redStar = '.'+redStar;
    if($(this).val().length > 0){
      $(redStar).removeClass('fa-asterisk');
    }else{
      $(redStar).addClass('fa-asterisk');
    }
  });

  $('#questions').on('change', function(){
    var qValue = this.value;
    // This is where the questions will be a hide show
    if(qValue === 'insurance'){
      console.log('HelloFriend');
    }else{
      console.log(qValue);
    }
  });

  $("[name='Affiliated business']").click(function(){
    if(this.value === 'Yes'){
      $('.afbYes').show();
    }else{
      $('.afbYes').hide();
    }
  });

  $('#falseified').click(function(){
    if($('#falseified').is(':checked')){
      $('#button').prop('disabled', false);
    }else{
      $('#button').prop('disabled', true);
    }
  });
});


// To Send Email from Form
function validEmail(email){
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function getFormData(){
  var elements = document.getElementById('dean').elements;
  var fields = Object.keys(elements).map(function(k){
    if(elements[k].name !== undefined){
      return elements[k].name;
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self){
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    var str = '';
    if(elements[k].type === 'checkbox'){
      str = str + elements[k].checked + ', ';
      data[k].str.slice(0,-2);
    }else if(elements[k].length){
      for(var i = 0; i < elements[k].length; i++){
        if(elements[k].item(i).checked){
          str = str + elements[k].item(i).value + ', ';
          data[k] = str.slice(0,2);
        }
      }
    }
  });
  console.log(data);
  return data;
}

function handleFormSubmit(event){
  event.preventDefault();
  var data = getFormData();
  if(!validEmail(data.email)){
    return false;
  }else{
    var url = event.target.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
      console.log(xhr.status, xhr.statusText);
      console.log(xhr.responseText);
      document.getElementById('dean').style.display = 'none';
      document.getElementById('thankyou_message').style.display = 'block';
      return;
    };
    var encoded = Object.keys(data).map(function(k){
      return encodeURIComponent(k)+ '='+encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
  }
}

function loaded(){
  console.log('Forms Ready!');
  var form = document.getElementById('dean');
  form.addEventListener('submit', handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);
