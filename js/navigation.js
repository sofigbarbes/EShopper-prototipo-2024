function t1_to_page_dark () {
  on_change_page()
  window.location.href = ('index_dark_t1.html')
}
function t1_to_page_light () {
  on_change_page()
  window.location.href = ('index_t1.html')
}

function page_to_t2_dark () {
  on_change_page()
  window.location.href = ('enunciado2_dark.html')
}
function page_to_t2_light () {
  on_change_page()
  window.location.href = ('enunciado2.html')
}

function t2_to_page_dark () {
  on_change_page()
  window.location.href = ('product-details3_dark_t2.html')
}
function t2_to_page_light () {
  on_change_page()
  window.location.href = ('product-details3_t2.html')
}

function page_to_t3_dark () {
  on_change_page()
  window.location.href = ('enunciado3_dark.html')
}
function page_to_t3_light () {
  on_change_page()
  window.location.href = ('enunciado3.html')
}

function t3_to_page_dark () {
  on_change_page()
  window.location.href = ('index_dark_t3.html')
}
function t3_to_page_light () {
  on_change_page()
  window.location.href = ('index_t3.html')
}

function page_to_t4_dark () {
  on_change_page()
  window.location.href = ('enunciado4_dark.html')
}
function page_to_t4_light () {
  on_change_page()
  window.location.href = ('enunciado4.html')
}

function t4_to_page_dark () {
  on_change_page()
  window.location.href = ('cart_dark_t4.html')
}
function t4_to_page_light () {
  on_change_page()
  window.location.href = ('cart_t4.html')
}

function page_to_t5_dark () {
  on_change_page()
  window.location.href = ('enunciado5_dark.html')
}
function page_to_t5_light () {
  on_change_page()
  window.location.href = ('enunciado5.html')
}

function t5_to_page_dark () {
  on_change_page()
  window.location.href = ('product-details3_dark_t5.html')
}
function t5_to_page_light () {
  on_change_page()
  window.location.href = ('product-details3_t5.html')
}

function page_to_end_dark () {
  on_change_page()
  window.location.href = ('final_eshopper_dark.html')
}
function page_to_end_light () {
  on_change_page()
  window.location.href = ('final_eshopper.html')
}
function finish_test_light () {
  if (check_inputs_ok()) {
    on_change_page()
    finish_page_data()
    submit_data()
    setTimeout(function () {
      window.location.href = ('thanks.html')
    }, 1500)
  }
}
function finish_test_dark () {
  if (check_inputs_ok()) {
    on_change_page()
    finish_page_data()
    submit_data()
    setTimeout(function () {
      window.location.href = ('thanks_dark.html')
    }, 1500)
  }
}
function check_inputs_ok () {
  var containers = document.querySelectorAll('.dato_container')
  var validation = true
  containers.forEach((container) => {
    if (!container.querySelector('input[checked]')) {
      container.classList.add('error_fill')
      document.querySelector('.mensaje_error').classList.add('error_fill')
      validation = false
    }
    else{
      container.classList.remove('error_fill')
    }
  })

  return validation
}
