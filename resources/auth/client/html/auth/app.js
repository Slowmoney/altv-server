Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            show: false,
            registration: false,
            username: '',
            pass: '',
            pass1: '',
            pass2: '',
            email: '',
            
            errors: []
        };
    },
    mounted() {
        if ('alt' in window) {
            alt.on('auth:Error', this.error);
            alt.on('auth:Ready', this.setReady);
            alt.emit('auth:Ready');
        } else {
            this.setReady();
        }
    },
    methods: {
        setReady() {
            this.show = true;
        },
        toRegister(i) {
            this.registration = i
            this.clrError()
        },
        valid() {
           
            if (this.registration) {
                if (this.username === '') {
                    this.error('Введите Имя');
                    return;
                }
                if (this.username.length <= 3) {
                    this.error('Имя больше 4 символов');
                    return;
                }
                if (this.email.indexOf('@') == -1) {
                    this.error('Введите верный емайл');
                    return;
                }
                if (this.pass1.length <= 3) {
                    this.error('Пароль больше 4 символов');
                    return;
                }
                if (this.pass1 === '') {
                    this.error('Введите пароль');
                    return;
                }
                if (this.pass1.length <= 3) {
                    this.error('Пароль меньше 4 символов');
                    return;
                }
                if (this.pass2 === '') {
                    this.error('Введите пароль');
                    return;
                }
                if (this.pass2.length <= 3) {
                    this.error('Пароль меньше 4 символов');
                    return;
                }
                if (this.pass1 != this.pass2) {
                    this.error('Пароли разные');
                    return;
                }
            }else{
              if (this.username === '') {
                this.error('Введите логин');
                return;
            }
            if (this.username.length <= 3) {
                this.error('Имя меньше 4 символов');
                return;
            }
            if (this.pass === '') {
                this.error('Введите пароль');
                return;
            }
            if (this.pass.length <= 3) {
                this.error('Пароль меньше 4 символов');
                return;
            }  
            }
            return true
        },
        login() {
            this.clrError()
            if ( this.valid()) {
               if ('alt' in window) {
                  
                if (this.registration) {
                    alt.emit('auth:Try', this.username, this.pass1, this.email);
                    return;
                }
                alt.emit('auth:Try', this.username, this.pass);
            }  
            }
           
           
        },
        error(s) { this.errors.push(s) },
        clrError() { this.errors = [] },

    }
});
