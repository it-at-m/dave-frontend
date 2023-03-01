import Vue from 'vue'

let timeout: number;

let scrollListener = (binding: any) => {
  let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 1;
  if (bottomOfWindow) {
    if (timeout) {
      // debounce
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      binding.value();
    }, 50);
  }
};

Vue.directive('infinite-scroll', {
  bind: function (el, binding) {

    if (binding.value instanceof Function) {
      window.addEventListener('scroll', function () {
        scrollListener(binding)
      });
    }
  },
  unbind: function () {
    window.removeEventListener('scroll', scrollListener)
  }
});
