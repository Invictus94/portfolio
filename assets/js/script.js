
function show_menu() {
  $('#show_menuitems').addClass('active');
}

function hide_menu() {
  $('#show_menuitems').removeClass('active');
}
// --------------------------------------

$(document).ready(function () {
	
  var check = localStorage.getItem('cheat');

  if(check != "OK")
  {
    checkContent("");
    var button = document.getElementById("121");
    button.onkeyup = function() {
      unlockAll(button.value)
    };
  }

});

// --------------------------------------


function unlockAll(value) {
  if(value == "aezakmi")
  {
    localStorage.setItem('cheat', "OK");
  };
}

// --------------------------------------

function checkContent(value, replaceItem) {
  if(value != "aezakmi")
  {
  document.body.querySelectorAll('#resume .my-wrapper .left-wrapper .content .list-inner ol li h6').forEach(function(node) {
     node.innerHTML = '<img src="assets/icons/lock.svg" style="height: 20px;"/>';
  });

     document.body.querySelectorAll('#resume .my-wrapper .right-wrapper .content .list-inner ol li h6').forEach(function(node) {
      node.innerHTML = '<img src="assets/icons/lock.svg" style="height: 20px;"/>';
     });
  }}
  
  // --------------------------------------


window.onload = function () {
  if (isScrolledIntoView($('._re_uy_iu'))) {
    fillprogressbars();
  };
};

// --------------------------------------


$(window).on('scroll', function () {
  fillprogressbars();
});

function fillprogressbars() {
  $('._re_uy_iu').each(function () {
    var textelement = $(this)[0].children[0].children[1];
    var barelement = $(this)[0].children[1].children[0];

    if (isScrolledIntoView($(this)) && (parseInt(barelement.offsetWidth) == 0)) {
      animate(
        barelement, "width", "%", 0, barelement.id, 1000, textelement
      );
    };
  });
}

// --------------------------------------

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// --------------------------------------


function animate(elem, style, unit, from, to, time, textelem) {
  if (!elem) return;
  var start = new Date().getTime(),
    timer = setInterval(function () {
      var step = Math.min(1, (new Date().getTime() - start) / time);
      elem.style[style] = (from + step * (to - from)) + unit;
      textelem.innerHTML = (from + step * (to - from)).toFixed(0) + unit;
      if (step == 1) clearInterval(timer);
    }, 333);
  elem.style[style] = from + unit;
}

// --------------------------------------

function submitForm()
{
  var element = document.getElementById("button-send");
  element.innerHTML = "Sending...";
  element.style.backgroundColor = 'orange';

  var name = document.getElementById("121").value;
  var email = document.getElementById("122").value;
  var subject = document.getElementById("123").value;
  var message = document.getElementById("124").value;
  
  var result = sendMail(name, email, subject, message, element);
  result.then(function(resultValue) {
  if(resultValue == "OK")
  {
     element.innerHTML = "E-Mail sent successfully!";
     element.style.backgroundColor = 'green';
     element.onclick = function() {
       return false;
     };
  }
  else
  {
      element.innerHTML = resultValue;
      element.style.backgroundColor = 'red';
      element.onclick = function() {
        return false;
      };   
    }
  });
}

async function sendMail(name, email, subject, text, element)
{
  return await  Email.send({
    SecureToken : "213d98ad-a408-4324-9c4f-55fa6c5f929c",
    To : "viktoreeeee@gmail.com",
    From : "viktoreeeee@gmail.com",
    Subject : `${name} salje poruku => tema ${subject}`,
    Body : `poruka: ${text} <br/> ${name}-ov Mail je : ${email}`
});

}