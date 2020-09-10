import * as alt from 'alt';
import  chat  from "chat";
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
    vehicle.isEngineOn = !vehicle.isEngineOn ? true : !vehicle.isEngineOn;
    if (vehicle.fuel <= 0) {
        vehicle.isEngineOn = false;
        vehicle.setSyncedMeta('fuel', 0);
    }
    alt.emitClient(player, 'vehicle:StartEngine', vehicle.isEngineOn);
}

chat.registerCmd('veh',player=>newVeh(player))
chat.registerCmd('te', (player) => alt.emitClient(player,'vehicle:ToggleEngine'))

function newVeh(player) {
      try {
          const vehicle = new alt.Vehicle('exemplar', player.pos.x, player.pos.y, player.pos.z, 0, 0, 0)
          vehicle.fuel = 100
          vehicle.setSyncedMeta('fuel', 100);
    } catch (error) {
        alt.log(error)
    }
}


