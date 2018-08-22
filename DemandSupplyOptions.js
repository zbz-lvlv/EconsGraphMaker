var demandSupply_DemandChanges = 0; //-2 to 2
var demandSupply_SupplyChanges = 0; //-2 to 2

var demandSupply_PED = 0; //-4 to 4
var demandSupply_PES = 0; //-4 to 4

let demandSupply_DemandButtons = [
  $("#button_demand_fall_lot"),
  $("#button_demand_fall_little"),
  $("#button_demand_no_shift"),
  $("#button_demand_rise_little"),
  $("#button_demand_rise_lot")
];

let demandSupply_SupplyButtons = [
  $("#button_supply_fall_lot"),
  $("#button_supply_fall_little"),
  $("#button_supply_no_shift"),
  $("#button_supply_rise_little"),
  $("#button_supply_rise_lot")
];

let demandSupply_PEDButtons = [
  $("#button_ped_M4"),
  $("#button_ped_M3"),
  $("#button_ped_M2"),
  $("#button_ped_M1"),
  $("#button_ped_0"),
  $("#button_ped_P1"),
  $("#button_ped_P2"),
  $("#button_ped_P3"),
  $("#button_ped_P4")
];

let demandSupply_PESButtons = [
  $("#button_pes_M4"),
  $("#button_pes_M3"),
  $("#button_pes_M2"),
  $("#button_pes_M1"),
  $("#button_pes_0"),
  $("#button_pes_P1"),
  $("#button_pes_P2"),
  $("#button_pes_P3"),
  $("#button_pes_P4")
];

let demandSupply_ButtonCreateGraph = $("#button_create_graph");

localStorage.setItem("demandSupply_DemandChanges", '0');
localStorage.setItem("demandSupply_SupplyChanges", '0');
localStorage.setItem("demandSupply_PED", '0');
localStorage.setItem("demandSupply_PES", '0');

function removeClassFromArray(className, arrayToRemoveFrom){
  for(var i = 0; i < arrayToRemoveFrom.length; i++){
    arrayToRemoveFrom[i].removeClass(className);
  }
}

demandSupply_DemandButtons.forEach(function(button, index){
  button.click(function() {
    demandSupply_DemandChanges = index - 2;
    localStorage.setItem("demandSupply_DemandChanges", demandSupply_DemandChanges);
    removeClassFromArray("demand-button-clicked", demandSupply_DemandButtons);
    button.addClass("demand-button-clicked");
  });
});

demandSupply_PEDButtons.forEach(function(button, index){
  button.click(function() {
    demandSupply_PED = index - 4;
    localStorage.setItem("demandSupply_PED", demandSupply_PED);
    removeClassFromArray("demand-button-clicked", demandSupply_PEDButtons);
    button.addClass("demand-button-clicked");
  });
});

demandSupply_SupplyButtons.forEach(function(button, index){
  button.click(function() {
    demandSupply_SupplyChanges = index - 2;
    localStorage.setItem("demandSupply_SupplyChanges", demandSupply_SupplyChanges);
    removeClassFromArray("supply-button-clicked", demandSupply_SupplyButtons);
    button.addClass("supply-button-clicked");
  });
});

demandSupply_PESButtons.forEach(function(button, index){
  button.click(function() {
    demandSupply_PES = index - 4;
    localStorage.setItem("demandSupply_PES", demandSupply_PES);
    removeClassFromArray("supply-button-clicked", demandSupply_PESButtons);
    button.addClass("supply-button-clicked");
  });
});

demandSupply_ButtonCreateGraph.click(function() {
  window.location.href = "demand_supply_graph.html";
});
