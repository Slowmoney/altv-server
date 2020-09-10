Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            show: true,
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
                
                this.$refs.rpm.style.height = this.rpm*150+'px'
                if (this.rpm>0.9) {
                    this.$refs.rpm.style.backgroundColor = '#ff5722'
                }else if (this.rpm > 0.3) {
                    this.$refs.rpm.style.backgroundColor = '#ff9800'
                }else{
                    this.$refs.rpm.style.backgroundColor = '#8bc34a'
                    
                }

            })
            alt.on('speedometr:drawFuel',(fuel)=>{
                this.fuel=fuel
            })
        }
    },
    methods: {


    }
});
