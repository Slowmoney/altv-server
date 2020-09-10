Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            show: false,
           
            
        };
    },
    mounted() {
        
        if ('alt' in window) {
            alt.on('engine:show', (e) => {
                this.show = e;
                e ? alt.emit('engine:showed') : alt.emit('engine:hide')
            });
           
        }
    },
    methods: {
        toggleEngine(){
            alt.emit('engine:toggle',!this.engineOn)
        }

    }
});
