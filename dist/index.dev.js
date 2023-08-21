"use strict";

// this is the js
function cleargsearch() {
  var gs = document.getElementById('gsearch');
  gs.value = "";
  gs.style.color = 'rgb(255,255,255)';
}

function stringize(arr) {
  var i = 0;
  var str = "";

  while (i < arr.length) {
    str += arr[i];

    if (i != arr.length - 1) {
      str += "&NEXT&";
    }

    i += 1;
  }

  return str;
}

function savearr() {
  localStorage.setItem('todol', stringize(todo));
  console.log('saved', stringize(todo));
}

function getarr() {
  var u = localStorage.getItem('todol');

  if (u == null) {
    localStorage.setItem('todol', stringize([])); // initialize

    return [];
  }

  return u.split('&NEXT&');
}

function drawdimond(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y - 12.5);
  ctx.lineTo(x + 12.5, y);
  ctx.lineTo(x, y + 12.5);
  ctx.lineTo(x - 12.5, y);
  ctx.fill();
}

function rendertodo() {
  // clear the holder;
  var holder = document.getElementById('todo');
  holder.innerHTML = "";
  var integra = document.getElementById('tasks');
  integra.innerHTML = "\n    <h1 class=\"taskheader\">Tasks</h1>\n    ";
  var i = 0;

  while (i < todo.length) {
    var sg = todo[i].split('&dueat&');
    holder.innerHTML += "\n        <div class=\"tdtile\">\n            <div class=\"lefts\">".concat(sg[0], "</div>\n            <div class=\"due\">").concat(sg[1], "</div>\n        </div>\n        ");
    integra.innerHTML += "\n        <div id=\"tileg".concat(i, "\" class=\"tdtile-main\" onclick=\"select(").concat(i, ")\" onmouseover=\"movehighlight(").concat(i, "); ontile = ").concat(i, ";\">\n            <div class=\"lefts\" style=\"margin-top: 8px;\">\n            <input type=\"text\" class=\"taskname\" id=\"tname").concat(i, "\" name=\"tname").concat(i, "\" value=\"").concat(sg[0], "\" onchange=\"changename(").concat(i, ");\">\n            <input type=\"text\" class=\"taskdate\" id=\"due").concat(i, "\" name=\"due").concat(i, "\" value=\"").concat(sg[1], "\" onchange=\"changedue(").concat(i, ");\">\n            </div>\n            <div class=\"due\">\n            <div class=\"delete\" onclick='deletetd(").concat(i, ");'>Done</div>\n            <div class=\"order\" onclick='prioritize(").concat(i, ");'>Prioritize</div>\n            <div class=\"order\" onclick='deprioritize(").concat(i, ");'>Deprioritize</div>\n            </div>\n        </div>\n        ");
    i += 1;
  }

  integra.innerHTML += "\n    <div class=\"addnew\" onclick=\"addnew();\">+</div>\n    <div class=\"addnew\" onclick=\"closetasks();\" style='font-size: 20px; width: 10%; margin-top: 20px; margin-left: 45%; padding-top: 12px;'>Save & close</div>\n    ";
  savearr();
}

function addnew() {
  todo.push("&dueat&");
  rendertodo();
}

function changename(num) {
  // change name of num to tx
  var it = todo[num];
  it = it.split('&dueat&');
  var tx = document.getElementById('tname' + num).value;
  todo[num] = tx + '&dueat&' + it[1];
  rendertodo();
}

function changedue(num) {
  // change name of num to tx
  var it = todo[num];
  it = it.split('&dueat&');
  var tx = document.getElementById('due' + num).value;
  todo[num] = it[0] + '&dueat&' + tx;
  rendertodo();
}

function randcolor() {
  return 'rgb(' + (Math.random() * 100 + 155) + ',' + (Math.random() * 100 + 155) + ',' + (Math.random() * 100 + 155) + ")";
}

function getconfetti() {
  var arr = [];
  u = 0;

  while (u < 100) {
    arr.push([randcolor(), Math.random() * window.innerWidth, -Math.random() * 900]);
    u += 1;
  }

  return arr;
}

function deletetd(num) {
  var el, confetti, lucid, r, _air, civic;

  return regeneratorRuntime.async(function deletetd$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // just remove the entry
          todo.splice(num, 1); // basically like shrink the one

          el = document.getElementById('tileg' + num); // confetti ig

          cvs.style.zIndex = 100;
          confetti = getconfetti();
          lucid = 100;
          r = 100;

        case 6:
          if (!(lucid >= -20)) {
            _context.next = 18;
            break;
          }

          el.style.width = lucid * 0.9 + "%";
          console.log('supposedly set to 10');
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          _air = 0;

          while (_air < confetti.length) {
            ctx.fillStyle = confetti[_air][0];
            console.log(confetti[_air][0]);
            drawdimond(confetti[_air][1], (100 - lucid) / 33 * window.innerHeight + confetti[_air][2]);
            _air += 1;
          }

          _context.next = 14;
          return regeneratorRuntime.awrap(sleep(2));

        case 14:
          lucid = lucid - (110 - lucid) / 50;
          r -= 1; // not used var

          _context.next = 6;
          break;

        case 18:
          civic = 100;

        case 19:
          if (!(civic >= -10)) {
            _context.next = 28;
            break;
          }

          el.style.height = civic / 2 + "px";
          el.style.marginBottom = civic * 0.2 + "px";
          console.log('supposedly set to 10');
          _context.next = 25;
          return regeneratorRuntime.awrap(sleep(2));

        case 25:
          civic = civic - (110 - civic) / 50;
          _context.next = 19;
          break;

        case 28:
          el.style.display = 'none';
          cvs.style.zIndex = -1;
          rendertodo();

        case 31:
        case "end":
          return _context.stop();
      }
    }
  });
}

function prioritize(num) {
  // swap num and the one on top of it
  if (num == 0) {
    // cant swap
    return;
  }

  var holder = todo[num];
  todo[num] = todo[num - 1];
  todo[num - 1] = holder;
  lastselected -= 1;
  rendertodo();
}

function deprioritize(num) {
  // swap with the one below
  // if its the last then dont swap
  if (num == todo.length - 1) {
    return;
  }

  var holder = todo[num];
  todo[num] = todo[num + 1];
  todo[num + 1] = holder;
  lastselected += 1;
  rendertodo();
}

function select(n) {
  lastselected = n;
}

function movehighlight(n) {
  var si = 0; // reset the highlights

  while (si < todo.length) {
    var y = document.getElementById('tileg' + si);
    y.style.background = "rgba(210,210,210,0.7)";
    si += 1;
  } // now highlight the right one


  var o = document.getElementById('tileg' + n);
  o.style.background = "rgba(210,210,210,1)";
}

function deselectall() {
  var si = 0; // reset the highlights

  while (si < todo.length) {
    var y = document.getElementById('tileg' + si);
    y.style.border = "0px solid darkblue";
    si += 1;
  }
}

function selectt(n) {
  var y = document.getElementById('tileg' + n);
  y.style.border = "3px solid darkblue";
  selected = true;
}

var dt = new Date();
var firefox = document.getElementById('firefox');
var time = document.getElementById('time');
var date = document.getElementById('date');
var left = document.getElementById('s1');
var right = document.getElementById('s2');
var gselected = false;
var lastselected = -1;
var ontile = -1;
var selected = false;
var openedt = false; // we can just have an arr storing all the stuff
// and when we need to store it we can stringify it

var todo = getarr();
rendertodo();
var canvas = document.querySelector('.myCanvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight - 100;
var cvs = document.getElementById('canvas-container');
var k;

(function _callee() {
  var d, weatherobj, weather;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("./tk.json").then(function (r) {
            return r.json();
          }));

        case 2:
          d = _context2.sent;
          k = d.data[0];
          k = JSON.stringify(k);
          k = k.replace('{"name":"', '');
          k = k.replace('"}', ''); //console.log(k);
          //http://api.weatherapi.com/v1

          weather = document.getElementById('weather');
          fetch("https://api.weatherapi.com/v1/current.json?key=".concat(k, "&q=95129")).then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data);
            weatherobj = data;
            weather.textContent = weatherobj.current.condition.text + " • " + weatherobj.current.temp_f + "°";
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
})();

var dd;

if (dt.getHours() >= 12) {
  dd = 'PM';
} else {
  dd = 'AM';
}

var options = {
  hour: "2-digit",
  minute: "2-digit"
};
var options1 = {
  weekday: "long",
  month: "long",
  day: "numeric"
};

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    var reader = new FileReader();

    reader.onloadend = function () {
      callback(reader.result);
    };

    reader.readAsDataURL(xhr.response);
  };

  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

function processimg() {
  var ye = document.getElementById('urimg');
  var theimg = ye.files[0];
  console.log(URL.createObjectURL(theimg));
  var theurl = URL.createObjectURL(theimg); // now we just create a supposed elemtn to display it

  document.getElementById('holderimg').src = theurl; // let thedata = getBase64Image(document.getElementById('holderimg'));

  var thedata;
  toDataURL(theurl, function (dataUrl) {
    console.log('RESULT:', dataUrl);
    thedata = dataUrl;
    console.log(thedata);
    usebg(thedata);
  });
}

var setbg = localStorage.getItem('newbg');
var actbg = document.getElementById('blocker'); // lmfao whys it blocker cuz i didnt wanna change it bruh

if (setbg == null || setbg == 'hehe') {
  setbg = 'linear-gradient(rgb(255, 63, 5),rgb(0, 84, 173));';
  actbg.style.opacity = 0;
}

actbg.style.backgroundImage = setbg;

if (setbg.includes('data')) {
  document.getElementById('fullimg').src = setbg;
}

console.log('tired to set to ' + setbg);

function usebg(bg) {
  var b1, u;
  return regeneratorRuntime.async(function usebg$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // bc shud be the src
          // in localstorage set what it shud be
          localStorage.setItem('newbg', bg); // so you can just read and play directly
          // dim it

          b1 = document.getElementById('b1');
          b1.style.display = 'block';
          b1.style.opacity = 1;
          u = 0;

        case 5:
          if (!(u < 50)) {
            _context3.next = 12;
            break;
          }

          b1.style.opacity = u / 50;
          _context3.next = 9;
          return regeneratorRuntime.awrap(sleep(2));

        case 9:
          u += 1;
          _context3.next = 5;
          break;

        case 12:
          // now just reload ig and it shud be all good
          location.reload();

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function openbg() {
  var cbg, u;
  return regeneratorRuntime.async(function openbg$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          cbg = document.getElementById('choosebg');
          cbg.style.display = 'block';
          u = 0;

        case 3:
          if (!(u < 100)) {
            _context4.next = 10;
            break;
          }

          cbg.style.opacity = u / 100;
          _context4.next = 7;
          return regeneratorRuntime.awrap(sleep(2));

        case 7:
          u += 1;
          _context4.next = 3;
          break;

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function opentasks() {
  var cbg, u;
  return regeneratorRuntime.async(function opentasks$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          openedt = true;
          cbg = document.getElementById('tasks');
          cbg.style.display = 'block';
          u = 0;

        case 4:
          if (!(u < 100)) {
            _context5.next = 11;
            break;
          }

          cbg.style.opacity = u / 100;
          _context5.next = 8;
          return regeneratorRuntime.awrap(sleep(2));

        case 8:
          u += 1;
          _context5.next = 4;
          break;

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function closetasks() {
  var cbg, u;
  return regeneratorRuntime.async(function closetasks$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          cbg = document.getElementById('tasks');
          openedt = false;
          u = 0;

        case 3:
          if (!(u < 100)) {
            _context6.next = 10;
            break;
          }

          cbg.style.opacity = 1 - u / 100;
          _context6.next = 7;
          return regeneratorRuntime.awrap(sleep(2));

        case 7:
          u += 1;
          _context6.next = 3;
          break;

        case 10:
          cbg.style.display = 'none';

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
}

var lucid = dt.toLocaleTimeString("en-us", options);
var air = dt.toLocaleTimeString("en-us", options1).split(' at');
var blocker = document.getElementById('blocker');
time.textContent = lucid;
date.textContent = air[0];
var google = document.getElementById('todo'); //google.value = 'Search with Google';

var maxtd = google.offsetTop + 20; //google.style.maxHeight = (window.innerHeight-maxtd)+'px';
// google.style.height = '250px';

var sleep = function sleep(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

(function _callee2() {
  var ct, floater, bfactor;
  return regeneratorRuntime.async(function _callee2$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          ct = 0;
          floater = 100;

        case 2:
          if (!(ct <= 1000)) {
            _context7.next = 18;
            break;
          }

          firefox.style.marginTop = floater * 2 + 'px';
          firefox.style.width = (100 - floater) * 1.5 + 'px';
          firefox.style.opacity = ct / 150;
          time.style.opacity = ct / 100;
          date.style.opacity = ct / 120;
          google.style.opacity = ct / 150 - 0.5;
          bfactor = (100 - floater) / 100; //document.body.style.backgroundImage = `linear-gradient(rgb(${bfactor*195}, ${bfactor*35}, 0),rgb(0, ${bfactor*84}, ${bfactor*173}))`;

          blocker.style.opacity = bfactor;

          if (bfactor <= 0.01) {//blocker.style.display = 'none';
          }

          _context7.next = 14;
          return regeneratorRuntime.awrap(sleep(2));

        case 14:
          floater = floater * 0.95;
          ct += 1;
          _context7.next = 2;
          break;

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  });
})(); // google.focus();
// google.select();


(function _callee3() {
  var ee, newc, ttrs;
  return regeneratorRuntime.async(function _callee3$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!true) {
            _context8.next = 24;
            break;
          }

          ee = new Date();
          newc = ee.toLocaleTimeString("en-us", options);

          if (!(newc != time.textContent)) {
            _context8.next = 20;
            break;
          }

          // fade in fade out
          ttrs = 100;

        case 5:
          if (!(ttrs > 0)) {
            _context8.next = 12;
            break;
          }

          time.style.opacity = ttrs / 100;
          _context8.next = 9;
          return regeneratorRuntime.awrap(sleep(2));

        case 9:
          ttrs -= 1;
          _context8.next = 5;
          break;

        case 12:
          time.textContent = newc;

        case 13:
          if (!(ttrs < 100)) {
            _context8.next = 20;
            break;
          }

          time.style.opacity = ttrs / 100;
          _context8.next = 17;
          return regeneratorRuntime.awrap(sleep(2));

        case 17:
          ttrs += 1;
          _context8.next = 13;
          break;

        case 20:
          _context8.next = 22;
          return regeneratorRuntime.awrap(sleep(100));

        case 22:
          _context8.next = 0;
          break;

        case 24:
        case "end":
          return _context8.stop();
      }
    }
  });
})();

(function _callee4() {
  return regeneratorRuntime.async(function _callee4$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
              return;
            }

            var actkey = event.code.replace('Key', '').replace('Digit', ''); // if (!gselected){
            //     google.focus();
            //     google.select();
            //     google.style.color = 'rgb(255,255,255)';
            //     gselected = true;
            // }
            // if (actkey == 'Enter'){
            //     if (google.value != ''){
            //         this.window.location.href = 'https://www.google.com/search?client=firefox-b-1-d&q='+google.value;
            //     }
            // }

            if (actkey == "ArrowDown" && ontile < todo.length - 1) {
              if (!selected) {
                ontile += 1;
                movehighlight(ontile);
              } else {
                // move it down
                deprioritize(lastselected);
                selectt(lastselected);
              }
            }

            if (actkey == "ArrowUp" && ontile > 0) {
              if (!selected) {
                ontile -= 1;
                movehighlight(ontile);
              } else {
                // move it down
                prioritize(lastselected);
                selectt(lastselected);
              }
            }

            if (actkey == "Enter") {
              if (selected) {
                selected = false;
                deselectall();
              } else {
                lastselected = ontile;
                selectt(lastselected);
              }
            }

            if ((actkey == 'Z' || actkey == "Space") && !openedt) {
              opentasks();
            }
          }, true);

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
})();