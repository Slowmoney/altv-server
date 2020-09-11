import * as alt from 'alt';
alt.Vehicle.prototype.updateFuel = function updateFuel(player) {
    let currentFuel = this.fuel
    let currentEngineOn = this.isEngineOn
    currentFuel -= 0.01
    if (currentFuel <= 0 && currentEngineOn) {
        alt.emitClient(null, 'vehicle:KillEngine', this);
        currentFuel = 0
        currentEngineOn = false;
    }
    this.isEngineOn = currentEngineOn
    this.fuel = currentFuel
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
Object.defineProperty(alt.Vehicle.prototype, "isEngineOn", {

    get: function isEngineOn() {
        return this.getSyncedMeta('isEngineOn')
    },
    set: function isEngineOn(s) {
        if (s) {
            return this.setSyncedMeta('isEngineOn', s)
        }
    },
});



alt.onClient('updateFuel', (player, vehicle) => {
    vehicle.updateFuel(player)
});