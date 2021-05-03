import axios from 'axios'

let baseURL = ''
// baseURL = 'http://localhost:3000'
baseURL = 'https://meeting-room-api.herokuapp.com'

export const apiHelper = axios.create({
  baseURL
})

export const iziToast = {
  options: {
    show: {
      theme: 'dark',
      icon: 'icon-person',
      position: 'bottomRight',
      progressBarColor: 'rgb(0, 255, 184)',
      close: true,
      buttons: [
        [
          '<button>Ok</button>',
          function (instance, toast) {
            alert('')
          },
          true
        ],
        [
          '<button>Close</button>',
          function (instance, toast) {
            instance.hide(
              {
                transitionOut: 'fadeOutUp',
                onClosing: function (instance, toast, closedBy) {
                  console.info('closedBy: ' + closedBy)
                }
              },
              toast,
              'buttonName'
            )
          }
        ]
      ],
      onOpening: function (instance, toast) {
        console.info('callback abriu!')
      },
      onClosing: function (instance, toast, closedBy) {
        console.info('closedBy: ' + closedBy)
      }
    },
    ballon: {
      balloon: true,
      position: 'bottomCenter'
    },
    info: {
      theme: 'dark',
      icon: 'fas fa-exclamation-circle',
      position: 'bottomRight',
      progressBarColor: 'rgba(0, 255, 184, 0)',
      close: false
    },
    success: {
      theme: 'dark',
      icon: 'fas fa-check-circle',
      iconColor: 'rgb(150, 220, 150)',
      progressBarColor: 'rgba(0, 255, 184, 0)',
      close: false
    },
    warning: {
      position: 'topLeft'
    },
    error: {
      close: false,
      icon: 'fas fa-times',
      iconColor: 'rgb(220, 150, 150)',
      progressBarColor: 'rgba(0, 255, 184, 0)'
    },
    question: {
      timeout: 20000,
      close: false,
      overlay: true,
      toastOnce: true,
      id: 'question',
      zindex: 999,
      position: 'center',
      buttons: [
        [
          '<button><b>YES</b></button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
          },
          true
        ],
        [
          '<button>NO</button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
          }
        ]
      ],
      onClosing: function (instance, toast, closedBy) {
        console.info('Closing | closedBy: ' + closedBy)
      },
      onClosed: function (instance, toast, closedBy) {
        console.info('Closed | closedBy: ' + closedBy)
      }
    }
  }
}

