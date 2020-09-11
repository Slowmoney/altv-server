
import alt from 'alt';
import * as native from 'natives';
const url = `http://resource/client/html/speedometr/index.html`;
const urlengine = `http://resource/client/html/engine/index.html`;
let view = new alt.WebView(url);
let viewengine = new alt.WebView(urlengine);
let show = false;

let playerVehicle = false;

alt.setInterval(() => {
    if (!playerVehicle) {
        return;
    }
    if (show) {
        alt.log(playerVehicle.rpm)
        view.emit('speedometr:draw', native.getEntitySpeed(playerVehicle.scriptID), playerVehicle.gear, playerVehicle.rpm, playerVehicle.getSyncedMeta('isEngineOn'));
    }

}, 1);

alt.setInterval(() => {
    if (!playerVehicle) {
        return;
    }
    if (show) {
         
        view.emit('speedometr:drawFuel', playerVehicle.getSyncedMeta('fuel'), playerVehicle.getSyncedMeta('baseFuel'));
        alt.emitServer('updateFuel', playerVehicle)
    }

}, 100);

view.on('speedometr:showed', () => {
    show = true
})
view.on('speedometr:hide', () => {
    show = false
})

alt.onServer('playerEnteredVehicle', (vehicle, seat) => {
    alt.log('playerEnteredVehicle')
    native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, false, false, true);
    playerVehicle = vehicle;
    
    (seat == 1) && !show && view.emit('speedometr:show', true);
});
alt.onServer('playerLeftVehicle', (vehicle, seat) => {
    alt.log('playerLeftVehicle')
    playerVehicle = false;
    showCursor(false);
    alt.toggleGameControls(true);
    (seat == 1) && show && view.emit('speedometr:show', false);
});
alt.onServer('playerChangedVehicleSeat', (vehicle, seat) => {
    alt.log('playerChangedVehicleSeat')
    playerVehicle = vehicle;
   
    (seat == 1) && !show && view.emit('speedometr:show', true);
});

alt.onServer('vehicle:ToggleEngine', toggleEngine)
alt.onServer('vehicle:StartEngine', startEngine)
alt.onServer('vehicle:KillEngine', killEngine)
viewengine.on('engine:toggle', toggleEngine)
viewengine.on('engine:showed', () => {
    showengine = true
})
viewengine.on('engine:hide', () => {
    showengine = false
})
alt.on('keydown', (e) => {
     if (!alt.Player.local.vehicle) return;
    const pedInSeat = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1);
    if (pedInSeat !== alt.Player.local.scriptID) return;
    if (e == 18) {//alt
        viewengine.emit('engine:show', true);
        viewengine.focus()
        showCursor(true);
       
    }
})
alt.on('keyup', (e) => {
    if (e == 18) {//alt
        viewengine.emit('engine:show', false);
        showCursor(false);
        alt.toggleGameControls(true);
    }
})
function toggleEngine() {
    if (!alt.Player.local.vehicle) return;
    const pedInSeat = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1);
    if (pedInSeat !== alt.Player.local.scriptID) return;
    alt.emitServer('vehicle:ToggleEngine', { vehicle: alt.Player.local.vehicle });
}

function startEngine(value) {
    if (!alt.Player.local.vehicle) return;
    native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, value, false, true);
    playerVehicle = alt.Player.local.vehicle;
    
}
function killEngine(vehicle) {
    native.setVehicleEngineOn(vehicle.scriptID, false, true, true)
}
function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) { }
}