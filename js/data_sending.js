// Initialize Parse
Parse.initialize('lAuROx5QhwGFEiE4crU3SSiH6PjxA1fiBgUZmSIZ', 'rOqeVp94axh0LAivp9HE2CGlxtJB7AbnY5SRDLmF')
Parse.serverURL = 'https://parseapi.back4app.com/'

// var Participant = Parse.Object.extend("Participants")
var Participant = Parse.Object.extend('Participants') // test class

function test_data_submission () {
  current_participant = new Participant()
  current_participant.set('completion_date', new Date(Date.now()))
  current_participant.set('mouse_tracking', 'testing{fds}')
  current_participant.set('user_agent', navigator.userAgent)
  current_participant.set('times', '1,2,3')
  current_participant.set('click_count', '45')
  current_participant.set('gender', 'mujer')
  current_participant.set('birthday', 'today')
  current_participant.set('modo', 'claro')

  current_participant.save().then(function (participant) {
    console.log('Data submitted')
  }).catch(function (error) {
    console.log('Error: ' + error.message)
  })
}

function submit_data () {
  // Do not send multiple times = save in session storage
  var data = sessionStorage.getItem('has_sent')
  data = null
  if (data == null) {
    on_change_page()
    // Has not already sent duing this session, send the data
    sessionStorage.setItem('has_sent', true)
    // Create participant
    current_participant = new Participant()
    current_participant.set('completion_date', new Date(Date.now()))

    var mouse_movement_array = []
    var raw_data_movement = sessionStorage.getItem('mouse_movements')
    if (raw_data_movement != null) {
      console.log('Parsing')
      mouse_movement_array = JSON.parse(raw_data_movement) // no brackets
      console.log('End Parsing')
    }
    current_participant.set('mouse_movements', mouse_movement_array)

    var mouse_click_array = []
    var raw_data_click = sessionStorage.getItem('mouse_clicks')
    if (raw_data_click != null) {
      console.log('Parsing')
      mouse_click_array = JSON.parse(raw_data_click) // no brackets
      console.log('End Parsing')
    }
    current_participant.set('mouse_clicks', mouse_click_array)

    // Get navigator data (system info)
    current_participant.set('user_agent', navigator.userAgent)

    current_participant.set('click_count', sessionStorage.getItem('click_count'))

    var times_array = []
    var data_times = window.sessionStorage.getItem('times')
    if (data_times != null) {
      times_array = JSON.parse(data_times) // no brackets
    }
    current_participant.set('times', times_array)

    current_participant.set('gender', sessionStorage.getItem('gender'))
    current_participant.set('birthday', sessionStorage.getItem('birthday'))
    current_participant.set('q_color_combination', sessionStorage.getItem('q_color_combination'))
    current_participant.set('q_font_legible', sessionStorage.getItem('q_font_legible'))
    current_participant.set('q_navigability', sessionStorage.getItem('q_navigability'))
    current_participant.set('q_reconocibles', sessionStorage.getItem('q_reconocibles'))
    current_participant.set('q_task1_time', sessionStorage.getItem('q_task1_time'))
    current_participant.set('q_task2_time', sessionStorage.getItem('q_task2_time'))
    current_participant.set('q_task3_time', sessionStorage.getItem('q_task3_time'))
    current_participant.set('q_recommend', sessionStorage.getItem('q_recommend'))


    current_participant.set('total_time', sessionStorage.getItem('tiempo_total'))
    var modo_elemento = document.querySelector("head meta[name='modo']")
    current_participant.set('modo', modo_elemento.getAttribute('content'))

    current_participant.save().then(function (participant) {
      console.log('Participant created successfully')
      console.log(participant)
      console.log('Data submitted')
      sessionStorage.setItem('participant_ID', participant.id)
    }).catch(function (error) {
      console.log('Error: ' + error.message)
      sessionStorage.removeItem('has_sent')
    })
  }else {
    // Has sent during this session, do not resend
    console.log('Already submitted during this session')
  }
}
