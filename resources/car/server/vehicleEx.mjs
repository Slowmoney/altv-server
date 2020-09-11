import * as alt from 'alt';
alt.Vehicle.prototype.updateFuel = function updateFuel(player) {
    let currentFuel = this.fuel
    //let currentEngineOn = this.isEngineOn
    if (!this.lastpos) {
        this.lastpos = this.pos
    }
    let dist = distance(this.pos, this.lastpos)
   
        currentFuel -= dist
    this.lastpos = this.pos 
     
    
    if (currentFuel <= 0 ) {
        alt.emitClient(null, 'vehicle:KillEngine', this);
        currentFuel = 0
        //currentEngineOn = false;
    }
  
   // this.isEngineOn = currentEngineOn
    this.fuel = currentFuel
}
alt.Vehicle.prototype.fillFuel = function fillFuel(player) {
    this.fuel = 1000
}

function distance(p1,p2){
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 + (p2.z - p1.z) ** 2)
}
Object.defineProperty(alt.Vehicle.prototype, "fuel", {

    get: function fuel() {
        return this.getSyncedMeta('fuel')
    },
    set: function fuel(s) {
        if (s) {
            return this.setSyncedMeta('fuel', s)
        }
    },
});
Object.defineProperty(alt.Vehicle.prototype, "basefuel", {

    get: function basefuel() {
        return this.getSyncedMeta('basefuel')
    },
    set: function basefuel(s) {
        if (s) {
            return this.setSyncedMeta('basefuel', s)
        }
    },
});
/* Object.defineProperty(alt.Vehicle.prototype, "isEngineOn", {

    get: function isEngineOn() {
        return this.getSyncedMeta('isEngineOn')
    },
    set: function isEngineOn(s) {
        if (s) {
            return this.setSyncedMeta('isEngineOn', s)
        }
    },
}); */
Object.defineProperty(alt.Vehicle.prototype, "lastpos", {

    get: function lastpos() {
        return this.getSyncedMeta('lastpos')
    },
    set: function lastpos(s) {
        if (s) {
            return this.setSyncedMeta('lastpos', s)
        }
    },
});


alt.onClient('updateFuel', (player,vehicle) => {
    vehicle.updateFuel(player)
});