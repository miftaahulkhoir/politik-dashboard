var themeprimary = localStorage.getItem("themeprimary") || '#1a7cbc';
var themesecondary = localStorage.getItem("themesecondary") || '#f07521';
var themesuccess = localStorage.getItem("themesuccess") || '#83C31B';
var themeinfo = localStorage.getItem("themeinfo") || '#18a0fb';
var themewarning = localStorage.getItem("themewarning") || '#FFC261';


window.Codexdmeki = {
	themeprimary: themeprimary,
	themesecondary: themesecondary,
	themesuccess: themesuccess,
	themeinfo: themeinfo,
	themewarning: themewarning,
};




//*** light & dark action  ***//
$('.action-dark').click(function(){   
	$(this).toggleClass('action-light');   
	$('.icon-dark').toggle('');
	$('.icon-light').toggle('');
	$('body').toggleClass('darkmode');
});  




//*** customizer ***//
$('.customizer-action').click(function(){   
	$('.theme-cutomizer , .customizer-layer').toggleClass('active');
	
});

$('.customizer-header').click(function(){   
	$('.theme-cutomizer , .customizer-layer').toggleClass('active');
});



$('.dark-action').click(function(){   
	$('body').addClass('darkmode');
});
$('.light-action').click(function(){   
	$('body').removeClass('darkmode');
});

$('.customizeoption-list li').click(function(){   
	$(this).addClass('active-mode')
	$(this).siblings().removeClass('active-mode')
});

$('.ltr-action').click(function(){   
	$('body').removeClass('rtlmode');
});
$('.rtl-action').click(function(){   
	$('body').addClass('rtlmode');
});


