import * as alt from 'alt';
import  chat  from "chat";
import './vehicleEx';
alt.on('playerChangedVehicleSeat', (player, vehicle, oldseat, newseat) => {
    
    alt.emitClient(player, 'playerChangedVehicleSeat', vehicle,newseat);
});
alt.on('playerEnteredVehicle', (player, vehicle, seat) => {
    alt.emitClient(player, 'playerEnteredVehicle', vehicle,seat);
});
alt.on('playerLeftVehicle', (player, vehicle, seat) => {
    alt.emitClient(player, 'playerLeftVehicle', vehicle, seat);
});
alt.on('player:Spawn', (player) => {
  
    newVeh(player)
});
alt.onClient('vehicle:ToggleEngine', toggleEngine);
function toggleEngine(player, data) {
    const vehicle = data.vehicle;
    if (!player.vehicle) return;
    let currentEngineOn = vehicle.isEngineOn
    currentEngineOn = !currentEngineOn ? true : !currentEngineOn;
    if (vehicle.fuel <= 0) {
        currentEngineOn = false;
        vehicle.fuel =0;
        return
    }
    alt.log('toggleEngine', currentEngineOn, vehicle.fuel)
    alt.emitClient(player, 'vehicle:StartEngine', currentEngineOn);
}
chat.registerCmd('fuel', player => {
    if (player.vehicle) {
        player.vehicle.fillFuel()
    }
    
})
chat.registerCmd('veh',player=>newVeh(player))
chat.registerCmd('te', (player) => alt.emitClient(player,'vehicle:ToggleEngine'))

function newVeh(player) {
      try {
          const vehicle = new alt.Vehicle('exemplar', player.pos.x, player.pos.y, player.pos.z, 0, 0, 0)
          vehicle.fuel = 100
          vehicle.isEngineOn = false
          vehicle.basefuel = 10000
          
    } catch (error) {
        alt.log(error)
    }
}


