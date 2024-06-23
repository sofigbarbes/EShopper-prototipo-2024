// Interval function for mouse position acquisition
var mouse_position = [0, 0]
var has_mouse_value = false
var m_click_pos = [0, 0]
var click_target = ''

var target_movement = ''
var target_click = ''

var mouse_movements_array = []
var mouse_clicks_array = []

// guardar momento de inicio si no existe (primera pantalla solo)
if (!sessionStorage.getItem('fecha_inicio')) {
  sessionStorage.setItem('fecha_inicio', Date.now())
}

var raw_data_movement = sessionStorage.getItem('mouse_movements')
if (raw_data_movement != null) {
  mouse_movements_array = JSON.parse(raw_data_movement) // no brackets
}

var raw_data_click = sessionStorage.getItem('mouse_clicks')
if (raw_data_click != null) {
  mouse_clicks_array = JSON.parse(raw_data_click) // no brackets
}
// set target
window.onmousemove = function (e) {
  mouse_position = [e.pageX, e.pageY]
  if (e.target.getAttribute('click_type') == 'target') {
    target_movement = 'target'
  }else {
    target_movement = 'void'
  }
  has_mouse_value = true
}

window.onclick = function (e) {
  m_click_pos = [e.pageX, e.pageY]
  if (e.target.getAttribute('click_type') == 'target') {
    target_click = 'target'
  }
  else if (e.target.getAttribute('click_type') == 'wrong_target') {
    target_click = 'wrong_target'
  }else {
    target_click = 'void'
  }
  var raw_data_click = sessionStorage.getItem('mouse_clicks')
  if (raw_data_click != null) {
    mouse_clicks_array = JSON.parse(raw_data_click) // no brackets
  }

  mouse_clicks_array.push(
    {
      'click_pos': m_click_pos,
      'click_target': target_click,
      'page': window.location.pathname
    })
  sessionStorage.setItem('mouse_clicks', JSON.stringify(mouse_clicks_array))
}

window.setInterval(function () {
  if (has_mouse_value) {
    mouse_movements_array.push(
      {'mouse_pos': mouse_position,
        'mouse_target': target_movement,
        'page': window.location.pathname
      })
    has_mouse_value = false
  }
}, 100) // Every 0.1 sec

var time = 0
window.onload = function () {
  time = Date.now()
}
var times_array = []
var data_times = sessionStorage.getItem('times')
if (data_times) {
  times_array = JSON.parse(data_times) // no brackets
}

function on_change_page () {
  // Save here
  time = Date.now() - time
  times_array.push([window.location.pathname, time])
  window.sessionStorage.setItem('times', JSON.stringify(times_array))
  window.sessionStorage.setItem('mouse_movements', JSON.stringify(mouse_movements_array))
  window.sessionStorage.setItem('mouse_clicks', JSON.stringify(mouse_clicks_array))
}

window.addEventListener('click', () => {
  prev_count = window.sessionStorage.getItem('click_count')
  if (prev_count) {
    window.sessionStorage.setItem('click_count', parseInt(prev_count) + 1)
  }else {
    window.sessionStorage.setItem('click_count', 1)
  }
})

function finish_page_data () {
  if (sessionStorage.getItem('fecha_inicio')) {
    var tiempo_total = (Date.now() - parseInt(sessionStorage.getItem('fecha_inicio'))) / 1000
    sessionStorage.setItem('tiempo_total', tiempo_total)
  }

  if (window.innerWidth <= 920) {
    sessionStorage.setItem('device', 'mobile')
  }else {
    sessionStorage.setItem('device', 'desktop')
  }
  // /
  sessionStorage.setItem('gender', document.querySelector('input[name="gender"][checked]').getAttribute('value'))
  sessionStorage.setItem('birthday', document.querySelector('input#start').value)
  sessionStorage.setItem('q_color_combination', document.querySelector('input[name="color_combination"][checked]').getAttribute('value'))
  sessionStorage.setItem('q_font_legible', document.querySelector('input[name="font_legible"][checked]').getAttribute('value'))
  sessionStorage.setItem('q_navigability', document.querySelector('input[name="navigability"][checked]').getAttribute('value'))
  sessionStorage.setItem('q_reconocibles', document.querySelector('input[name="reconocibles"][checked]').getAttribute('value'))
  sessionStorage.setItem('q_task1_time', document.querySelector('input[name="task1_time"][checked]').getAttribute('value'))
  sessionStorage.setItem('q_task2_time', document.querySelector('input[name="task2_time"][checked]').getAttribute('value'))
  sessionStorage.setItem('q_task3_time', document.querySelector('input[name="task3_time"][checked]').getAttribute('value'))
  sessionStorage.setItem('q_task4_time', document.querySelector('input[name="task4_time"][checked]').getAttribute('value'))
  sessionStorage.setItem('q_recommend', document.querySelector('input[name="recommend"][checked]').getAttribute('value'))
}
