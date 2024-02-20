// search button

function searchToggle(obj, evt) {
  var container = $(obj).closest('.search-wrapper');
  if (!container.hasClass('active')) {
    container.addClass('active');
    evt.preventDefault();
  }
  else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
    container.removeClass('active');
    // clear input
    container.find('.search-input').val('');
  }
}

$(document).ready(function () {
  initChartTip('.ct-donut-wrapper');
});


/*-------chart tip js start------------*/

function initChartTip(element) {
  var thisChart = $(element);
  thisChart.mouseover(function (event) {
    if ($(event.target).attr('show-tip')) {
      var tip = $(event.target).attr('show-tip');
      window[tip](event);
    }
  });

  thisChart.mouseout(function (event) {
    hideCtTip(event);
    $(event.target).closest('.ct-donut-wrapper').find('.ct-donut-slice').attr('stroke-width', '10');
    $(event.target).closest('.ct-donut-wrapper').find('.ct-donut-center').html('Syllabus');
  });
}

function showCtTip(event) {
  var posCss = {};
  var tip = $(event.target).closest('.ct-donut-wrapper').find('.ct-tip');
  var tipH = tip.height();
  var winH = $(window).height() - 100;
  var winW = $(".sylabus-container").width() - 90;
  var tipX = event.pageX - (8 + 80);
  var tipY = event.pageY + 8;
  var posX = 'left';
  var posY = 'top';
  if (event.pageX < 90) {
    tipX = event.pageX;
    var posX = 'left';   
  }
  if (event.pageX > winW) {
    tipX = event.pageX;
    var posX = 'right';
  }
  if (event.pageY > winH) {
    tipY = event.pageY - (tipH + 8);
  }
  posCss[posX] = tipX;
  posCss[posY] = tipY;
  tip.css(posCss).fadeIn();
}

function hideCtTip(event) {
  $(event.target).closest('.ct-donut-wrapper').find('.ct-tip').hide();
}

function ctDonutTip(event) {
  var parent = $(event.target).closest('.ct-donut-wrapper');
  $('.ct-donut-slice', parent).attr('stroke-width', '10');
  $(event.target).attr('stroke-width', '11');
  var per = $(event.target).attr('percent-value');
  var total = $(event.target).attr('total-val');
  var stroke = $(event.target).attr('stroke');
  var titile = $(event.target).attr('slice-title');
  var usage = $(event.target).attr('usage');
  var tipHTML = $('<div><span class="ct-tip-dot" style="background-color: ' + stroke + ';"></span> <strong>' + titile + '</strong></div><div >' + usage + ' out of ' + total + ' courses</div>');
  $('.ct-tip', parent).html(tipHTML);
  showCtTip(event);
  $('.ct-donut-center', parent).text(per);
}


// Calander

var currentMonth = document.querySelector(".current-month");
var calendarDays = document.querySelector(".calendar-days");
var today = new Date();
var date = new Date();


currentMonth.textContent = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
today.setHours(0,0,0,0);
renderCalendar();

function renderCalendar(){
    const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate();
    const totalMonthDay = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    const startWeekDay = new Date(date.getFullYear(),date.getMonth(),1).getDay();
    
    calendarDays.innerHTML = "";

    let totalCalendarDay = 6 * 7;
    for (let i = 0; i < totalCalendarDay; i++) {
        let day = i-startWeekDay;

        if(i <= startWeekDay){
            // adding previous month days
            calendarDays.innerHTML += `<div class='padding-day'>${prevLastDay-i}</div>`;
        }else if(i <= startWeekDay+totalMonthDay){
            // adding this month days
            date.setDate(day);
            date.setHours(0,0,0,0);
            
            let dayClass = date.getTime()===today.getTime() ? 'current-day' : 'month-day';
            calendarDays.innerHTML += `<div class='${dayClass}'>${day}</div>`;
        }else{
            // adding next month days
            calendarDays.innerHTML += `<div class='padding-day'>${day-totalMonthDay}</div>`;
        }
    }
}

document.querySelectorAll(".month-btn").forEach(function (element) {
	element.addEventListener("click", function () {
		date = new Date(currentMonth.textContent);
        date.setMonth(date.getMonth() + (element.classList.contains("prev") ? -1 : 1));
		currentMonth.textContent = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
		renderCalendar();
	});
});

// document.querySelectorAll(".btn").forEach(function (element) {
// 	element.addEventListener("click", function () {
//         let btnClass = element.classList;
//         date = new Date(currentMonth.textContent);
//         if(btnClass.contains("today"))
//             date = new Date();
//         else if(btnClass.contains("prev-year"))
//             date = new Date(date.getFullYear()-1, 0, 1);
//         else
//             date = new Date(date.getFullYear()+1, 0, 1);
        
// 		currentMonth.textContent = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
// 		renderCalendar();
// 	});
// });