var demandSupply_DemandChanges = 0; //-2 to 2
var demandSupply_SupplyChanges = 0; //-2 to 2

var demandSupply_PED = 0; //-4 to 4
var demandSupply_PES = 0; //-4 to 4

let demandSupply_DemandButtonGroup = $("#button_group_demand");
let demandSupply_DemandButtonFallLot = $("#button_demand_fall_lot");
let demandSupply_DemandButtonFallLittle = $("#button_demand_fall_little");
let demandSupply_DemandButtonNoShift = $("#button_demand_no_shift");
let demandSupply_DemandButtonRiseLittle = $("#button_demand_rise_little");
let demandSupply_DemandButtonRiseLot = $("#button_demand_rise_lot");

let demandSupply_PEDSlider = $("#range_ped");

let demandSupply_SupplyButtonGroup = $("#button_group_supply");
let demandSupply_SupplyButtonFallLot = $("#button_supply_fall_lot");
let demandSupply_SupplyButtonFallLittle = $("#button_supply_fall_little");
let demandSupply_SupplyButtonNoShift = $("#button_supply_no_shift");
let demandSupply_SupplyButtonRiseLittle = $("#button_supply_rise_little");
let demandSupply_SupplyButtonRiseLot = $("#button_supply_rise_lot");

let demandSupply_PESSlider = $("#range_pes");

let demandSupply_ButtonCreateGraph = $("#button_create_graph");

localStorage.setItem("demandSupply_DemandChanges", '0');
localStorage.setItem("demandSupply_SupplyChanges", '0');
localStorage.setItem("demandSupply_PED", '0');
localStorage.setItem("demandSupply_PES", '0');

demandSupply_DemandButtonFallLot.click(function() {
  demandSupply_DemandChanges = -2;
  localStorage.setItem("demandSupply_DemandChanges", demandSupply_DemandChanges);
  demandSupply_DemandButtonFallLot.addClass("demand-button-clicked");
  demandSupply_DemandButtonFallLittle.removeClass("demand-button-clicked");
  demandSupply_DemandButtonNoShift.removeClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLittle.removeClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLot.removeClass("demand-button-clicked");
});

demandSupply_DemandButtonFallLittle.click(function() {
  demandSupply_DemandChanges = -1;
  localStorage.setItem("demandSupply_DemandChanges", demandSupply_DemandChanges);
  demandSupply_DemandButtonFallLot.removeClass("demand-button-clicked");
  demandSupply_DemandButtonFallLittle.addClass("demand-button-clicked");
  demandSupply_DemandButtonNoShift.removeClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLittle.removeClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLot.removeClass("demand-button-clicked");
});

demandSupply_DemandButtonNoShift.click(function() {
  demandSupply_DemandChanges = 0;
  localStorage.setItem("demandSupply_DemandChanges", demandSupply_DemandChanges);
  demandSupply_DemandButtonFallLot.removeClass("demand-button-clicked");
  demandSupply_DemandButtonFallLittle.removeClass("demand-button-clicked");
  demandSupply_DemandButtonNoShift.addClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLittle.removeClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLot.removeClass("demand-button-clicked");
});

demandSupply_DemandButtonRiseLittle.click(function() {
  demandSupply_DemandChanges = 1;
  localStorage.setItem("demandSupply_DemandChanges", demandSupply_DemandChanges);
  demandSupply_DemandButtonFallLot.removeClass("demand-button-clicked");
  demandSupply_DemandButtonFallLittle.removeClass("demand-button-clicked");
  demandSupply_DemandButtonNoShift.removeClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLittle.addClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLot.removeClass("demand-button-clicked");
});


demandSupply_DemandButtonRiseLot.click(function() {
  demandSupply_DemandChanges = 2;
  localStorage.setItem("demandSupply_DemandChanges", demandSupply_DemandChanges);
  demandSupply_DemandButtonFallLot.removeClass("demand-button-clicked");
  demandSupply_DemandButtonFallLittle.removeClass("demand-button-clicked");
  demandSupply_DemandButtonNoShift.removeClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLittle.removeClass("demand-button-clicked");
  demandSupply_DemandButtonRiseLot.addClass("demand-button-clicked");
});

demandSupply_PEDSlider.on('input', function() {
  demandSupply_PED = this.value;
  localStorage.setItem("demandSupply_PED", demandSupply_PED);
});

demandSupply_SupplyButtonFallLot.click(function() {
  demandSupply_SupplyChanges = -2;
  localStorage.setItem("demandSupply_SupplyChanges", demandSupply_SupplyChanges);
  demandSupply_SupplyButtonFallLot.addClass("supply-button-clicked");
  demandSupply_SupplyButtonFallLittle.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonNoShift.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLittle.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLot.removeClass("supply-button-clicked");
});

demandSupply_SupplyButtonFallLittle.click(function() {
  demandSupply_SupplyChanges = -1;
  localStorage.setItem("demandSupply_SupplyChanges", demandSupply_SupplyChanges);
  demandSupply_SupplyButtonFallLot.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonFallLittle.addClass("supply-button-clicked");
  demandSupply_SupplyButtonNoShift.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLittle.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLot.removeClass("supply-button-clicked");
});

demandSupply_SupplyButtonNoShift.click(function() {
  demandSupply_SupplyChanges = 0;
  localStorage.setItem("demandSupply_SupplyChanges", demandSupply_SupplyChanges);
  demandSupply_SupplyButtonFallLot.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonFallLittle.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonNoShift.addClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLittle.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLot.removeClass("supply-button-clicked");
});


demandSupply_SupplyButtonRiseLittle.click(function() {
  demandSupply_SupplyChanges = 1;
  localStorage.setItem("demandSupply_SupplyChanges", demandSupply_SupplyChanges);
  demandSupply_SupplyButtonFallLot.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonFallLittle.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonNoShift.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLittle.addClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLot.removeClass("supply-button-clicked");
});


demandSupply_SupplyButtonRiseLot.click(function() {
  demandSupply_SupplyChanges = 2;
  localStorage.setItem("demandSupply_SupplyChanges", demandSupply_SupplyChanges);
  demandSupply_SupplyButtonFallLot.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonFallLittle.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonNoShift.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLittle.removeClass("supply-button-clicked");
  demandSupply_SupplyButtonRiseLot.addClass("supply-button-clicked");
});

demandSupply_PESSlider.on('input', function() {
  demandSupply_PES = this.value;
  localStorage.setItem("demandSupply_PES", demandSupply_PES);
});

demandSupply_ButtonCreateGraph.click(function() {
  window.location.href = "demand_supply_graph.html";
});
