$(document).ready(function(){
  $('.info').on('change', function(){
    var something = this.id;
    something = '.'+something;
    if($(this).val().length > 0){
      $(something).removeClass('fa-asterisk');
    }else{
      $(something).addClass('fa-asterisk');
    }
  });
});
