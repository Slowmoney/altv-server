Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            show: false,
            speed:0,
            gear:0,
            rpm:0,
            fuel:0,
            
        };
    },
    mounted() {
        
        if ('alt' in window) {
            alt.on('speedometr:show', (e) => {
                this.show = e;
                e ? alt.emit('speedometr:showed') : alt.emit('speedometr:hide')
            });
            alt.on('speedometr:draw', (speed, gear, rpm) => {
                this.speed = speed;
                this.gear = gear;
                this.rpm = rpm;
               
            })
            alt.on('speedometr:drawFuel',(fuel)=>{
                this.fuel=fuel
            })
        }
    },
    methods: {


    }
});
