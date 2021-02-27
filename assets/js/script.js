
// --------------------------------------
// Global Variable

var dictionary;
var advancedViewKey;
var storageName;
var storageValue;

// --------------------------------------


function show_menu() {
  $('#show_menuitems').addClass('active');
}

function hide_menu() {
  $('#show_menuitems').removeClass('active');
}
// --------------------------------------

$(document).ready(function () {

  var url = CryptoJS.enc.Hex.parse('68747470733a2f2f696e76696374757339342e6769746875622e696f2f706f7274666f6c696f2f6173736574732f746578742f64696374696f6e6172792e6a736f6e');

  $.ajax({
    type: 'GET',
    dataType: 'json',
    crossDomain: true,
    url: url.toString(CryptoJS.enc.Utf8),
    success: function (responseData) {

      /* preuzimanje podataka */

      dictionary = responseData;
      advancedViewKey = CryptoJS.enc.Hex.parse(dictionary.code["advancedViewKljuc"]).toString(CryptoJS.enc.Utf8);
      storageName = CryptoJS.enc.Hex.parse(dictionary.code["storageName"]).toString(CryptoJS.enc.Utf8);
      storageValue = CryptoJS.enc.Hex.parse(dictionary.code["storageValue"]).toString(CryptoJS.enc.Utf8);

            /* provjera nivoa autentif */

      var check = localStorage.getItem(storageName);

      if (check != storageValue) {
        checkContent("");
        var button = document.getElementById("121");
        button.onkeyup = function () {
          unlockAll(button.value)
        };
      }
      else
      {
        checkContent("", true);
      }

                  /* prijevod */

      document.documentElement.lang = navigator.language || navigator.userLanguage;

    },
    error: function (responseData, textStatus, errorThrown) {
      alert('Dictionary load failed.');
    }
  });
});

// --------------------------------------

// function convert() {

// var encrypted = CryptoJS.AES.encrypt("value", "tajna");

// var decrypted = CryptoJS.AES.decrypt(encrypted, "tajna");
// alert(decrypted);
// }
// --------------------------------------

function translate(key) {
  var currentLanguage = $('html').attr('lang');
  return dictionary.languages[currentLanguage.substr(0, 2)][key];
}

// --------------------------------------


function unlockAll(value) {
  if (value == advancedViewKey) {
    localStorage.setItem(storageName, storageValue);
  };
}

// --------------------------------------

function checkContent(value, justRemoveClass) {
  if (value != advancedViewKey || justRemoveClass) {
    document.body.querySelectorAll('#resume .my-wrapper .left-wrapper .content .list-inner ol li h6').forEach(function (node) {

      if (justRemoveClass != 1) {
        node.innerHTML = '<img src="assets/icons/lock.svg" style="height: 20px;"/>';
      }

      if (node.classList.contains("hidden")) {
        node.classList.remove("hidden");
      }
    });

    document.body.querySelectorAll('#resume .my-wrapper .right-wrapper .content .list-inner ol li h6').forEach(function (node) {
      if (justRemoveClass != 1) {
        node.innerHTML = '<img src="assets/icons/lock.svg" style="height: 20px;"/>';
      }

      if (node.classList.contains("hidden")) {
        node.classList.remove("hidden");
      }
    });
  }
}

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

function submitForm() {
  var element = document.getElementById("button-send");
  element.innerHTML = "Sending...";
  element.style.backgroundColor = 'orange';

  var name = document.getElementById("121").value;
  var email = document.getElementById("122").value;
  var subject = document.getElementById("123").value;
  var message = document.getElementById("124").value;

  var result = sendMail(name, email, subject, message, element);
  result.then(function (resultValue) {
    if (resultValue == "OK") {
      element.innerHTML = "E-Mail sent successfully!";
      element.style.backgroundColor = 'green';
      element.onclick = function () {
        return false;
      };
    }
    else {
      element.innerHTML = resultValue;
      element.style.backgroundColor = 'red';
      element.onclick = function () {
        return false;
      };
    }
  });
}

async function sendMail(name, email, subject, text, element) {
  return await Email.send({
    SecureToken: "213d98ad-a408-4324-9c4f-55fa6c5f929c",
    To: "viktoreeeee@gmail.com",
    From: "viktoreeeee@gmail.com",
    Subject: `${name} salje poruku => tema ${subject}`,
    Body: `poruka: ${text} <br/> ${name}-ov Mail je : ${email}`
  });

}