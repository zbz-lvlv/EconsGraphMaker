let graphTypeOptions = $("#graph_type_options");
graphTypeOptions.load("start.html");

$("#button_demand_supply").click(function() {
  graphTypeOptions.load("demand_supply_options.html");
});
