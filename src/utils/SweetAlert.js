import Swal from 'sweetalert2'

export const ICON = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    QUESTION: 'question'
}

export const AlertDataLogin = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: ICON.SUCCESS,
        title: 'Signed in successfully'
      })
}

export const AlertForm = (title ="",text = "", icon = ICON.INFO ) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        
      })
      
      Toast.fire({
        icon,
        title,
        text
      })
}