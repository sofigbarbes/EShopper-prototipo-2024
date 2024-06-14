window.history.forward()

// Interval function for mouse position acquisition
var mouse_position = [0, 0]
var target = ''
var has_mouse_position = false
var is_clicked = 0
var m_click_pos = [0, 0]
var click_target = ''

//set target
window.onmousemove = function (e) {
  mouse_position = [e.pageX, e.pageY]
  if (e.target.getAttribute('click_type')) {
    target = 'target';
  }else {
    target = 'void';
  }
  has_mouse_position = true
  console.log('mpos: ' + mouse_position)
}

window.onmouseup = function (e) {
  m_click_pos = [e.pageX, e.pageY]
  if (e.target.getAttribute('click_type')) {
    target = 'target';
  }else {
    target = 'void';
  }
  click_target = target;
  is_clicked = 1;
}

var mouse_record_array = []

/*
Properties that can be deduced:
- Missed clicks
-
*/

var raw_data = sessionStorage.getItem('mouse_recording')
if (raw_data != null) {
  mouse_record_array = JSON.parse(raw_data) // no brackets
}

window.setInterval(function () {
  if (has_mouse_position) {
    mouse_record_array.push({'mouse_pos': mouse_position, 'mouse_target': target, 'is_clicked': is_clicked, 'click_pos': m_click_pos, 'click_target': click_target, 'page': window.location.href})
    if (is_clicked == 1) is_clicked = 0 // Reset click
  }
}, 100) // Every 0.1 sec

var time = 0
window.onload = function () {
  time = Date.now()
}

var times_array = []

var data_times = sessionStorage.getItem('times')
if (data_times != null) {
  times_array = JSON.parse(data_times) // no brackets
  console.log(times_array)
}

function on_change_page () {
  // Save here
  time = Date.now() - time
  times_array.push([document.title, time])
  window.sessionStorage.setItem('times', JSON.stringify(times_array))
  window.sessionStorage.setItem('mouse_recording', JSON.stringify(mouse_record_array))
}

var count = 0
window.addEventListener('click', () => {
  count++
  window.sessionStorage.setItem('click_count', parseInt(window.sessionStorage.getItem('click_count')) + count)
})
