document.getElementById("para1").innerHTML = formatAMPM();

function formatAMPM() {
var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
return days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear();
}

// Mostrar/Ocultar input nueva tarea
$(".add").on("click", function(){
	$("input.new").slideToggle(300);
	$(this).toggleClass("fa-plus").toggleClass("fa-minus");
});

// INPUT TODO 
$("body").on("keypress", "input", function(event){
	if(event.which === 13 && $(this).val().length > 0){
		if($(this).hasClass("new"))
			crearTarea($(this));
		else
			$(this).parent().text($(this).val().trim());
	}
});

// buat todo 
function crearTarea(el){
	$("ul").append(
		"<li><span class='erase'><i class='fa fa-times'></i></span>" + 
		"<span class='texto'>" + el.val().trim() + "</span>" + 
		"<span class='editor'><i class='fa fa-edit'></i></span></li>"
	);
	el.val("");
	$("#total").text(+($("#total").text()) + 1);
}

// pilih todo
$("ul").on("click", "li", function(){
	$(this).toggleClass("marcado");
	if($(this).hasClass("marcado"))
		$("#complete").text(+($("#complete").text()) + 1);
	else
		$("#complete").text(+($("#complete").text()) - 1);
});

// hapus todo
$("ul").on("click", ".erase", function(event){
	$(this).parent().fadeOut(200, function(){
		if($(this).hasClass("marcado"))
			$("#complete").text(+($("#complete").text()) - 1);
		$(this).remove();
		$("#total").text(+($("#total").text()) - 1);
	});
	event.stopPropagation();
});

// klik edit todo
$("ul").on("click", ".editor", function(event){
	var texto = $(this).prev();
	texto.html("<input type='text' placeholder='" + texto.text() + "' class='edit'/>");
	texto.find("input").focus();
	event.stopPropagation();
});

// keluar fokus saat edit 
$("ul").on("blur", ".edit", function(){
	if($(this).val().length == 0)
		$(this).parent().text($(this).attr('placeholder'));
});