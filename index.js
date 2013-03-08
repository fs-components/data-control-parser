/*
 * Req:
 * - Add classname of the control to the element
 * - Change data-control to data-control-init upon instantiation
 * - parse the data-config attribute (which contains a JSON cfg obj )
 * - return the parsed config obj
 * - DOES NOT fetch all the controls from the DOM like the frontier version does...
*/

/*
 * Component Description
 * Component equivalent of frontier controls.js file. Parses data-control and data-config and returns cfg obj.
 *
 */ 

module.exports = function(el){
  
  //extract the data-control
  var control = el.getAttribute("data-control");
  var dataConfig = el.getAttribute('data-config');
  var config = {};

  //try to parse it (since it's a JSON obj)
  if (dataConfig) {
    try {
      config = JSON.parse(dataConfig);
    }
    catch (e) {
      console.error("Unable to parse data-config object: " + dataConfig);
      return;
    }
  }

  //if success, set up cfg obj
  config.container = el;
  config.control = control;

  // convert to done
  el.removeAttribute("data-control");
  el.setAttribute("data-control-init", control); 

  //add control class name (like the frontier version does)
  var controlClass = control.charAt(0).toLowerCase() + control.substr(1);
  el.className += " " + controlClass;

  //return config obj
  return config;
}



//USE these for test cases
//TESTING ONLY
    //create test element (this would be good for our test)
    // var test_el = document.createElement("div");
    // test_el.innerHTML = '<div data-control="someControl" data-config=\'{"someKey":"someVal"}\'></div>';
    // console.log(parseCtrlConfigs(test_el.firstChild));