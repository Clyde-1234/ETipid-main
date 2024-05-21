const spinnerWrapperEl = document.querySelector('.spinner_wrapper')

window.addEventListener('load', ()=> {
    spinnerWrapperEl.computedStyleMap.opacity = '0'

    setTimeout(() => {

        spinnerWrapperEl.style.display = "none"
    }, 1000)
})