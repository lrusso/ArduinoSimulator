// CREATING THE WEB WORKER (THE CPP INTERPRETER)
var myWorker;
var myWorkerRunning;
var myLedPin = -1;
var myDCMotorPin = -1;
var myAnalogPinsOnBoard = 5;
var myDigitalPinsOnBoard = 13;

function confirmCustom(title,message,yes,no,myCallback)
	{
	try
		{
		// CREATING THE CONFIRM CONTAINER
		var confirmContainer = document.createElement("div");
		confirmContainer.style.position = "fixed";
		confirmContainer.style.top = 0;
		confirmContainer.style.bottom = 0;
		confirmContainer.style.left = 0;
		confirmContainer.style.right = 0;
		confirmContainer.style.zIndex = 9999;
		confirmContainer.style.backgroundColor = "rgba(0,0,0,0.5)";

		// CREATING THE CONFIRM FORM
		var confirmForm = document.createElement("div");
		confirmForm.style.position = "relative";
		confirmForm.style.top = "50%";
		confirmForm.style.left = 0;
		confirmForm.style.right = 0;
		confirmForm.style.marginLeft = "auto";
		confirmForm.style.marginRight = "auto";
		confirmForm.style.transform = "translateY(-50%)";
		confirmForm.style.width = "300px";
		confirmForm.style.backgroundColor = "#f2f2f2";
		confirmForm.style.textAlign = "center";

		// CREATING THE CONFIRM TITLE
		var confirmTitle = document.createElement("div");
		confirmTitle.style.textAlign = "left";
		confirmTitle.style.paddingLeft = "10px";
		confirmTitle.style.backgroundColor = "#3a76b1";
		confirmTitle.style.fontFamily = "Arial";
		confirmTitle.style.fontSize = "16px";
		confirmTitle.style.fontWeight = "bold";
		confirmTitle.style.color = "white";
		confirmTitle.style.lineHeight = 2.5;
		confirmTitle.innerHTML = title;

		// CREATING THE CONFIRM MESSAGE
		var confirmMessage = document.createElement("div");
		confirmMessage.style.padding = "20px";
		confirmMessage.style.fontFamily = "Arial";
		confirmMessage.style.fontSize = "16px";
		confirmMessage.style.color = "black";
		confirmMessage.style.textAlign = "center";
		confirmMessage.style.lineHeight = 2;
		confirmMessage.innerHTML = message;

		// CREATING THE CONFIRM YES BUTTON
		var confirmButtonYes = document.createElement("div");
		confirmButtonYes.style.padding = "10px";
		confirmButtonYes.style.backgroundColor = "#d2d2d2";
		confirmButtonYes.style.border = "1px solid #b2b2b2";
		confirmButtonYes.style.fontFamily = "Arial";
		confirmButtonYes.style.fontSize = "16px";
		confirmButtonYes.style.color = "black";
		confirmButtonYes.style.textAlign = "center";
		confirmButtonYes.style.lineHeight = 1.5;
		confirmButtonYes.style.display = "inline-block";
		confirmButtonYes.style.marginBottom = "10px";
		confirmButtonYes.style.paddingLeft = "40px";
		confirmButtonYes.style.paddingRight = "40px";
		confirmButtonYes.style.cursor = "pointer";
		confirmButtonYes.addEventListener("click",function(event)
			{
			// REMOVING THE CONFIRM CONTAINER
			document.body.removeChild(confirmContainer);

			// EXECUTING THE CALLBACK FUNCTION
			myCallback();
			});
		confirmButtonYes.innerHTML = yes;

		// CREATING THE CONFIRM NO BUTTON
		var confirmButtonNo = document.createElement("div");
		confirmButtonNo.style.padding = "10px";
		confirmButtonNo.style.backgroundColor = "#d2d2d2";
		confirmButtonNo.style.border = "1px solid #b2b2b2";
		confirmButtonNo.style.fontFamily = "Arial";
		confirmButtonNo.style.fontSize = "16px";
		confirmButtonNo.style.color = "black";
		confirmButtonNo.style.textAlign = "center";
		confirmButtonNo.style.lineHeight = 1.5;
		confirmButtonNo.style.display = "inline-block";
		confirmButtonNo.style.marginLeft = "20px";
		confirmButtonNo.style.marginBottom = "10px";
		confirmButtonNo.style.paddingLeft = "40px";
		confirmButtonNo.style.paddingRight = "40px";
		confirmButtonNo.style.cursor = "pointer";
		confirmButtonNo.addEventListener("click",function(event)
			{
			// REMOVING THE CONFIRM CONTAINER
			document.body.removeChild(confirmContainer);

			try
				{
				// UNLOCKING THE EDITOR AND SHOWING THE POINTER
				editor.setOptions({readOnly: false, highlightGutterLine: true});
				editor.renderer.$cursorLayer.element.style.display = "block";

				// FOCUSING THE EDITOR
				editor.focus();
				}
				catch(err)
				{
				}
			});
		confirmButtonNo.innerHTML = no;

		// ADDING ALL THE ELEMENTS TO THE CONFIRM CONTAINER
		confirmForm.appendChild(confirmTitle);
		confirmForm.appendChild(confirmMessage);
		confirmForm.appendChild(confirmButtonYes);
		confirmForm.appendChild(confirmButtonNo);
		confirmContainer.appendChild(confirmForm);

		// ADDING THE CONFIRM CONTAINER TO THE DOCUMENT
		document.body.appendChild(confirmContainer);
		}
		catch(err)
		{
		}
	}

try
	{
	// SETTING THE DEFAULT FILE NAME IN THE LABEL
	document.getElementById("arduinosimulator_filename").innerHTML = STRING_FILENAME;

	// SETTING THE PATH OF THE ACE CORE
	ace.config.set("basePath",".");

	// CREATING THE ACE INSTANCE
	var editor = ace.edit("arduinosimulator_textcode");

	// SETTING THE OPTIONS
	editor.setOptions({fontSize:"14px",showPrintMargin:false,showInvisibles:true,tabSize:4,useSoftTabs:false,highlightActiveLine:false});

	// REMOVING COMMAND
	editor.commands.removeCommand("gotoline");

	// SETTING THE DEFAULT PROGRAMMING LANGUAGE IN THE ACE CORE
	editor.session.setMode("ace/mode/c_cpp");

	// DISABLING WORKERS
	editor.session.setUseWorker(false);

	// SETTING WELCOME MESSAGE
	editor.setValue(STRING_WELCOME);

	// CLEARING SELECTION
	editor.clearSelection();

	// MOVING TO TOP OF THE DOCUMENT
	editor.selection.moveTo(0,0);

	// CLEARING THE UNDOMANAGER RECORDS
	editor.session.getUndoManager().reset();

	// WORKAROUND FOR SYNTAX HIGHLIGHTING LARGE LINES AND FILES
	editor.session.bgTokenizer.tokenizer.$setMaxTokenCount(999999);

	// GETTING FOCUS IN THE EDITOR
	editor.focus();

	// SETTING WHAT WILL HAPPEN WHEN THE EDITOR CONTENT CHANGES
	editor.getSession().on("change", function()
		{
		// THE DOCUMENT WILL BE DIRTY
		window.onbeforeunload = function(e){return "changed";};

		// THE UNDO BUTTON WILL BE ENABLED
		document.getElementById("buttonUndo").classList.add("arduinosimulator_button_undo_enabled");
		document.getElementById("buttonUndo").classList.remove("arduinosimulator_button_undo_disabled");
		});
	}
	catch(err)
	{
	}

function menuNewFile()
	{
	try
		{
		// IF THE DOCUMENT IS DIRTY, A DISCARD CHANGES QUESTION WILL SHOW UP
		if (!editor.session.getUndoManager().isClean())
			{
			// LOCKING THE EDITOR AND HIDING THE POINTER
			editor.setOptions({readOnly: true, highlightGutterLine: false});
			editor.renderer.$cursorLayer.element.style.display = "none";

			// SHOWING A DIALOG IN ORDER TO CONFIRM IF THE USER WANTS TO LOSE ANY UNSAVED CHANGES
			confirmCustom(STRING_LOSECHANGES_TITLE,STRING_LOSECHANGES_MESSAGE,STRING_LOSECHANGES_YES,STRING_LOSECHANGES_NO, menuNewFileExecute);
			}
			else
			{
			// EXECUTING THE NEW FILE FUNCTION
			menuNewFileExecute();
			}
		}
		catch(err)
		{
		}
	}

function menuNewFileExecute(files)
	{
	try
		{
		// STOPPING THE SIMULATOR (IF RUNNING)
		stoppingSimulator();

		// CLEARING THE SERIAL MONITOR
		document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML = "";

		// SETTING THE DEFAULT FILE NAME IN THE LABEL
		STRING_FILENAME = STRING_FILENAME_EMPTY + ".ino";
		document.getElementById("arduinosimulator_filename").innerHTML = STRING_FILENAME;

		// SETTING THE DEFAULT PROGRAMMING LANGUAGE
		editor.session.setMode("ace/mode/c_cpp");

		// CLEARING THE EDITOR CONTENT
		editor.setValue("");

		// CLEARING SELECTION
		editor.clearSelection();

		// MOVING TO TOP OF THE DOCUMENT
		editor.selection.moveTo(0,0);

		// CLEARING THE UNDOMANAGER RECORDS
		editor.session.getUndoManager().reset();

		// UNLOCKING THE EDITOR AND SHOWING THE POINTER
		editor.setOptions({readOnly: false, highlightGutterLine: true});
		editor.renderer.$cursorLayer.element.style.display = "block";

		// SETTING THE DEFAULT STATE FOR EACH BUTTON
		document.getElementById("buttonUndo").classList.add("arduinosimulator_button_undo_disabled");
		document.getElementById("buttonUndo").classList.remove("arduinosimulator_button_undo_enabled");
		document.getElementById("buttonRedo").classList.add("arduinosimulator_button_redo_disabled");
		document.getElementById("buttonRedo").classList.remove("arduinosimulator_button_redo_enabled");

		// HIDING THE SEARCH BOX (IF AVAILABLE)
		try{editor.searchBox.hide();}catch(err){}

		// SETTING THE DOCUMENT AS CLEAN
		window.onbeforeunload = null;

		try{editor.focus()}catch(err){}
		}
		catch(err)
		{
		}
	}

function menuOpenFile()
	{
	try
		{
		// IF THE DOCUMENT IS DIRTY, A DISCARD CHANGES QUESTION WILL SHOW UP
		if (!editor.session.getUndoManager().isClean())
			{
			// LOCKING THE EDITOR AND HIDING THE POINTER
			editor.setOptions({readOnly: true, highlightGutterLine: false});
			editor.renderer.$cursorLayer.element.style.display = "none";

			// SHOWING A DIALOG IN ORDER TO CONFIRM IF THE USER WANTS TO LOSE ANY UNSAVED CHANGES
			confirmCustom(STRING_LOSECHANGES_TITLE,STRING_LOSECHANGES_MESSAGE,STRING_LOSECHANGES_YES,STRING_LOSECHANGES_NO, menuOpenFileSelect);
			}
			else
			{
			// EXECUTING THE OPEN FILE FUNCTION
			menuOpenFileSelect();
			}
		}
		catch(err)
		{
		}
	}

function menuOpenFileSelect()
	{
	try
		{
		// UNLOCKING THE EDITOR AND SHOWING THE POINTER
		editor.setOptions({readOnly: false, highlightGutterLine: true});
		editor.renderer.$cursorLayer.element.style.display = "block";

		// FOCUSING THE EDITOR
		editor.focus();

		// SHOWING THE OPEN FILE DIALOG
		document.getElementById("fileOpener").click();
		}
		catch(err)
		{
		}
	}

function menuOpenFileExecute(file)
	{
	try
		{
		// STOPPING THE EMULATION (IF RUNNING)
		stoppingSimulator();

		// CLEARING THE SERIAL MONITOR
		document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML = "";

		// LOCKING THE EDITOR AND HIDING THE POINTER
		editor.setOptions({readOnly: true, highlightGutterLine: false});
		editor.renderer.$cursorLayer.element.style.display = "none";

		// SHOWING THE LOADING SPLASH
		document.getElementsByClassName("arduinosimulator_splash_container")[0].style.display = "block";

		// CREATING THE FILEREADER
		var filereader = new FileReader();
		filereader.file_name = file.name;

		// SETTING THE FILE NAME
		STRING_FILENAME = file.name;

		// WAITING FOR THE SPLASH CONTAINER TO BE DISPLAYED
		setTimeout(function()
			{
			// CHECKING THE FILE EXTENSION
			var extension = filereader.file_name.split(".").pop().toLowerCase();
			filereader.onload = function()
				{
				// GETTING THE FILE CONTENT
				var content = this.result;

				// SETTING THE FILE NAME VALUE IN THE LABEL
				document.getElementById("arduinosimulator_filename").innerHTML = STRING_FILENAME;

				// SETTING THE PROGRAMMING LANGUAGE IN THE ACE CORE
				editor.session.setMode("ace/mode/c_cpp");

				// SETTING THE FILE CONTENT INTO THE EDITOR
				editor.setValue(content);

				// CLEARING SELECTION
				editor.clearSelection();

				// MOVING TO TOP OF THE DOCUMENT
				editor.selection.moveTo(0,0);

				// CLEARING THE UNDOMANAGER RECORDS
				editor.session.getUndoManager().reset();

				// SETTING THE DEFAULT STATE FOR EACH BUTTON
				document.getElementById("buttonUndo").classList.add("arduinosimulator_button_undo_disabled");
				document.getElementById("buttonUndo").classList.remove("arduinosimulator_button_undo_enabled");
				document.getElementById("buttonRedo").classList.add("arduinosimulator_button_redo_disabled");
				document.getElementById("buttonRedo").classList.remove("arduinosimulator_button_redo_enabled");

				// HIDING THE SEARCH BOX (IF AVAILABLE)
				try{editor.searchBox.hide();}catch(err){}

				// SETTING THE DOCUMENT AS CLEAN
				window.onbeforeunload = null;

				// SCROLLING TO TOP OF THE DOCUMENT
				editor.scrollToLine(0,true,true,function(){});

				// GETTING FOCUS IN THE EDITOR
				editor.focus();

				// UNLOCKING THE EDITOR AND SHOWING THE POINTER
				editor.setOptions({readOnly: false, highlightGutterLine: true});
				editor.renderer.$cursorLayer.element.style.display = "block";

				// HIDING THE LOADING SPLASH
				document.getElementsByClassName("arduinosimulator_splash_container")[0].style.display = "none";

				// CLEARING THE SELECTED FILE VALUE
				document.getElementById("fileOpener").value = null;
				};

			// READING THE FILE
			filereader.readAsText(file,"ISO-8859-1");
			}, 200);
		}
		catch(err)
		{
		}

	// CLEARING THE SELECTED FILE VALUE
	document.getElementById("fileOpener").value = null;
	}

function menuSaveFile()
	{
	try
		{
		// GETTING THE EDITOR CONTENT AS A BLOB VALUE
		var blobValue = new Blob([editor.getValue()],{type:"text/plain"});

		// GETTING THE FILE NAME
		var filename = STRING_FILENAME;

		// DOWNLOADING THE FILE
		var link = document.createElement("a");
		link.style.display = "none";
		document.body.appendChild(link);
		link.href = URL.createObjectURL(blobValue);
		link.download = filename || "data.json";
		link.click();

		try
			{
			// CLEARING THE UNDOMANAGER RECORDS
			editor.session.getUndoManager().reset();

			// SETTING THE DEFAULT STATE FOR EACH BUTTON
			document.getElementById("buttonUndo").classList.add("arduinosimulator_button_undo_disabled");
			document.getElementById("buttonUndo").classList.remove("arduinosimulator_button_undo_enabled");
			document.getElementById("buttonRedo").classList.add("arduinosimulator_button_redo_disabled");
			document.getElementById("buttonRedo").classList.remove("arduinosimulator_button_redo_enabled");

			// HIDING THE SEARCH BOX (IF AVAILABLE)
			try{editor.searchBox.hide();}catch(err){}

			// SETTING THE DOCUMENT AS CLEAN
			window.onbeforeunload = null;

			// GETTING FOCUS IN THE EDITOR
			editor.focus();
			}
			catch(err)
			{
			}
		}
		catch(err)
		{
		}
	}

function menuInsert(file)
	{
	try
		{
		var filereader = new FileReader();
		filereader.file_name = file.name;

		// CHECKING THE FILE EXTENSION
		var extension = filereader.file_name.split(".").pop().toLowerCase();
		filereader.onload = function()
			{
			// GETTING THE FILE CONTENT
			var content = this.result;

			// SETTING THE FILE CONTENT INTO THE EDITOR
			editor.session.insert(editor.getCursorPosition(), content);

			// CLEARING SELECTION
			editor.clearSelection();

			// GETTING FOCUS IN THE EDITOR
			editor.focus();

			// CLEARING THE SELECTED FILE VALUE
			document.getElementById("fileInserter").value = null;
			};

		// READING THE FILE
		filereader.readAsDataURL(file);

		// CLEARING THE SELECTED FILE VALUE
		document.getElementById("fileInserter").value = null;
		}
		catch(err)
		{
		}
	}

function menuSearch()
	{
	// SHOWING THE SEARCH BOX
	try
		{
		editor.execCommand("find");
		}
		catch(err)
		{
		}
	}

function menuUndo()
	{
	try
		{
		// UNDO THE EDITOR
		editor.undo();

		// GETTING FOCUS IN THE EDITOR
		editor.focus();

		// CLEARING SELECTION
		editor.clearSelection();

		// IF THERE ARE ANY UNDOS LEFT, THE UNDO BUTTON WILL BE DISABLED
		if (!editor.session.getUndoManager().hasUndo())
			{
			document.getElementById("buttonUndo").classList.add("arduinosimulator_button_undo_disabled");
			document.getElementById("buttonUndo").classList.remove("arduinosimulator_button_undo_enabled");
			}

		// IF THERE ARE ANY REDOS LEFT, THE REDO BUTTON WILL BE DISABLED
		if (editor.session.getUndoManager().hasRedo())
			{
			document.getElementById("buttonRedo").classList.add("arduinosimulator_button_redo_enabled");
			document.getElementById("buttonRedo").classList.remove("arduinosimulator_button_redo_disabled");
			}
		}
		catch(err)
		{
		}
	}

function menuRedo()
	{
	try
		{
		// REDO THE EDITOR
		editor.redo();

		// GETTING FOCUS IN THE EDITOR
		editor.focus();

		// CLEARING SELECTION
		editor.clearSelection();

		// IF THERE ARE ANY UNDOS LEFT, THE UNDO BUTTON WILL BE DISABLED
		if (!editor.session.getUndoManager().hasRedo())
			{
			document.getElementById("buttonRedo").classList.add("arduinosimulator_button_redo_disabled");
			document.getElementById("buttonRedo").classList.remove("arduinosimulator_button_redo_enabled");
			}

		// IF THERE ARE ANY REDOS LEFT, THE REDO BUTTON WILL BE DISABLED
		if (editor.session.getUndoManager().hasUndo())
			{
			document.getElementById("buttonUndo").classList.add("arduinosimulator_button_undo_enabled");
			document.getElementById("buttonUndo").classList.remove("arduinosimulator_button_undo_disabled");
			}
		}
		catch(err)
		{
		}
	}

function menuLed()
	{
	try
		{
		// CHECKING IF THE LED MUST BE DISCONNECTED
		if (myLedPin+1>myDigitalPinsOnBoard)
			{
			// DISCONNECTING THE LED
			myLedPin = -1;
			}
			else
			{
			// UPDATING THE LED PIN VALUE
			myLedPin = myLedPin + 1;
			}

		// UPDATING THE LED PIN STATUS
		updateLedPinStatus();
		}
		catch(err)
		{
		}
	}

function menuRun()
	{
	try
		{
		// CHECKING IF THE WEB WORKER IS RUNNING
		if (myWorkerRunning==false)
			{
			// UPDATING THE MENU RUN ICON
			document.getElementById("buttonRun").className = "arduinosimulator_button_stop_enabled";

			// UPDATING THE WEB WORKER STATUS
			myWorkerRunning = true;

			// CREATING THE WEB WORKER
			myWorker = new Worker("ArduinoSimulatorInterpreter.js");

			// SETTING WHAT HAPPENS WHEN DATA IS RECEIVED FROM THE WEB WORKER
			myWorker.onmessage = function(e)
				{
				try
					{
					// GETTING THE DATA SENT FROM THE SIMULATOR
					var myReceivedData = e.data;

					// CHECKING IF THE SIMULATOR SAID THAT THE CODE HAS A BUG
					if (myReceivedData==null)
						{
						// STOPPING THE SIMULATION
						stoppingSimulator();
						}
						else
						{
						// CHECKING IF A DIGITAL PIN EVENT OCCURRED
						if (myReceivedData.indexOf("_DIGITAL_PIN_STATUS_")>-1)
							{
							// CHECKING IF THE DIGITAL PIN THAT GOT THE CALL IS THE SAME AS THE ONE IN MYLEDPIN VARIABLE
							if (myReceivedData.indexOf("_" + myLedPin + "_")>-1)
								{
								// CHECKING IF THE CALL HAS A TRUE ATTACHED TO IT
								if (myReceivedData.indexOf("TRUE")>-1)
									{
									// TURNING ON THE LED LIGHT
									document.getElementById("ledStatus").className = "arduinosimulator_output_hardware_led_image_on";
									}
									else
									{
									// TURNING OFF THE LED LIGHT
									document.getElementById("ledStatus").className = "arduinosimulator_output_hardware_led_image_off";
									}
								}
							}
						// CHECKING IF AN ANALOG PIN EVENT OCCURRED
						else if (myReceivedData.indexOf("_ANALOG_PIN_STATUS_")>-1)
							{
							if (myReceivedData.indexOf("_" + myDCMotorPin + "_")>-1)
								{
								// GETTING THE DUTY
								var duty = myReceivedData.substr(myReceivedData.lastIndexOf("_")+1,myReceivedData.length);

								if (duty>0)
									{
									// TURNING ON THE DC MOTOR
									document.getElementById("motorStatus").className = "arduinosimulator_output_hardware_dcmotor_image_on";
									}
									else
									{
									// TURNING OFF THE DC MOTOR
									document.getElementById("motorStatus").className = "arduinosimulator_output_hardware_dcmotor_image_off";
									}
								}
							}
						else
							{
							// ADDING THE RECEIVED DATA TO THE SERIAL MONITOR
							document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML = document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML + myReceivedData;
							}
						}
					}
					catch(err)
					{
					}
				}

			// RUNNING THE SKETCH
			runSketch(editor.getValue());
			}
			else
			{
			// STOPPING THE SIMULATION
			stoppingSimulator();
			}

		// FOCUSING THE EDITOR
		editor.focus();
		}
		catch(err)
		{
		}
	}

function clearSerialMonitor()
	{
	try
		{
		// CLEARING THE SERIAL MONITOR DATA
		document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML = "";

		// FOCUSING THE EDITOR
		editor.focus();
		}
		catch(err)
		{
		}
	}

function stoppingSimulator()
	{
	try
		{
		// TERMINATING THE WEB WORKER
		try{myWorker.terminate()}catch(err){}

		// UPDATING THE MENU RUN ICON
		document.getElementById("buttonRun").className = "arduinosimulator_button_run_enabled";

		// UPDATING THE WEB WORKER STATUS
		myWorkerRunning = false;

		// UPDATING THE LED PIN STATUS
		updateLedPinStatus();

		// UPDATING THE DC MOTOR PIN STATUS
		updateDCMotorPinStatus();
		}
		catch(err)
		{
		}
	}

function updateLedPinStatus()
	{
	try
		{
		// SETTING THE DEFAULT LED IMAGE
		document.getElementById("ledStatus").className = "arduinosimulator_output_hardware_led_image_off";

		// CHECKING IF A LED PIN WAS SET AND IF IT IS VALID
		if (myLedPin>-1 && myLedPin<=myDigitalPinsOnBoard)
			{
			// UPDATING THE LED PIN LABEL WITH THE SELECTED DIGITAL PIN
			document.getElementsByClassName("arduinosimulator_output_hardware_led_label_value")[0].innerHTML = "D" + myLedPin;
			}
			else
			{
			// SETTING THE DEFAULT VALUE FOR THE LED PIN
			myLedPin = -1;

			// UPDATING THE LED PIN LABEL WITH A NOT CONNECTION SIGN
			document.getElementsByClassName("arduinosimulator_output_hardware_led_label_value")[0].innerHTML = "---";
			}
		}
		catch(err)
		{
		}
	}

function updateDCMotorPinStatus()
	{
	try
		{
		// SETTING THE DEFAULT LED IMAGE
		document.getElementById("motorStatus").className = "arduinosimulator_output_hardware_dcmotor_image_off";

		// CHECKING IF A LED PIN WAS SET AND IF IT IS VALID
		if (myDCMotorPin>-1 && myDCMotorPin<=myAnalogPinsOnBoard)
			{
			// UPDATING THE LED PIN LABEL WITH THE SELECTED DIGITAL PIN
			document.getElementsByClassName("arduinosimulator_output_hardware_dcmotor_label_value")[0].innerHTML = "A" + myDCMotorPin;
			}
			else
			{
			// SETTING THE DEFAULT VALUE FOR THE LED PIN
			myDCMotorPin = -1;

			// UPDATING THE LED PIN LABEL WITH A NOT CONNECTION SIGN
			document.getElementsByClassName("arduinosimulator_output_hardware_dcmotor_label_value")[0].innerHTML = "---";
			}
		}
		catch(err)
		{
		}
	}

function resizeArduinoSimulatorEditor()
	{
	try
		{
		// GETTING THE WINDOW SIZE
		var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight|| e.clientHeight|| g.clientHeight;

		// CALCUTING THE NEW SIZE FOR THE EDITOR
		var editHeight = y - 41;

		// RESIZING THE EDITOR
		document.getElementById("arduinosimulator_textcode_container").style.height = editHeight.toString() + "px";
		editor.resize();

		// GETTING FOCUS IN THE EDITOR
		editor.focus();
		}
		catch(err)
		{
		}
	}

function runSketch(sketch)
	{
	// CONVERTING THE ARDUINO METHODS AND CLASSES (JSCPP DOESN'T SUPPORT STRUCTS YET)
	sketch = convertArduinoSketch(sketch);

	var code = "#include <iostream>\n#include <ctime>\n#include <cmath>\n#include <string.h>\n" +

				// MAIN IMPLEMENTATION THAT WILL EXECUTE SETUP AND LOOP
				"int main(){int internalLoopSystem=0;setup();while(true){loop();internalLoopSystem=internalLoopSystem+1;}return 0;}"

				+

				// SETUP AND LOOP PROTOTYPES IMPLEMENTATION
				"void setup();" +
				"void loop();"

				+

				// DIGITAL PINS IMPLEMENTATION
				"bool _digital_pins_active[14] = {false,false,false,false,false,false,false,false,false,false,false,false,false,false};"

				+

				// PINMODE IMPLEMENTATION
				"int INPUT = 0;" +
				"int OUTPUT = 0;" +
				"void pinMode(int digitalpin, int type);" +
				"void pinMode(int digitalpin, int type){_digital_pins_active[digitalpin]=true;}"

				+

				// SIGNAL IMPLEMENTATION FOR DIGITALWRITE AND ANALOGWRITE

				"bool LOW = false;" +
				"bool HIGH = true;"

				+

				// DIGITALWRITE IMPLEMENTATION
				"void digitalWrite(int digitalpin, bool signal);" +
				"void digitalWrite(int digitalpin, bool signal){if(digitalpin==0 && _digital_pins_active[0]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_0_TRUE\";}else if(digitalpin==0 && _digital_pins_active[0]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_0_FALSE\";}else if(digitalpin==1 && _digital_pins_active[1]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_1_TRUE\";}else if(digitalpin==1 && _digital_pins_active[1]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_1_FALSE\";}else if(digitalpin==2 && _digital_pins_active[2]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_2_TRUE\";}else if(digitalpin==2 && _digital_pins_active[2]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_2_FALSE\";}else if(digitalpin==3 && _digital_pins_active[3]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_3_TRUE\";}else if(digitalpin==3 && _digital_pins_active[3]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_3_FALSE\";}else if(digitalpin==4 && _digital_pins_active[4]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_4_TRUE\";}else if(digitalpin==4 && _digital_pins_active[4]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_4_FALSE\";}else if(digitalpin==5 && _digital_pins_active[5]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_5_TRUE\";}else if(digitalpin==5 && _digital_pins_active[5]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_5_FALSE\";}else if(digitalpin==6 && _digital_pins_active[6]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_6_TRUE\";}else if(digitalpin==6 && _digital_pins_active[6]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_6_FALSE\";}else if(digitalpin==7 && _digital_pins_active[7]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_7_TRUE\";}else if(digitalpin==7 && _digital_pins_active[7]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_7_FALSE\";}else if(digitalpin==8 && _digital_pins_active[8]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_8_TRUE\";}else if(digitalpin==8 && _digital_pins_active[8]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_8_FALSE\";}else if(digitalpin==9 && _digital_pins_active[9]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_9_TRUE\";}else if(digitalpin==9 && _digital_pins_active[9]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_9_FALSE\";}else if(digitalpin==10 && _digital_pins_active[10]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_10_TRUE\";}else if(digitalpin==10 && _digital_pins_active[10]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_10_FALSE\";}else if(digitalpin==11 && _digital_pins_active[11]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_11_TRUE\";}else if(digitalpin==11 && _digital_pins_active[11]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_11_FALSE\";}else if(digitalpin==12 && _digital_pins_active[12]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_12_TRUE\";}else if(digitalpin==12 && _digital_pins_active[12]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_12_FALSE\";}else if(digitalpin==13 && _digital_pins_active[13]==true && signal==true){cout <<\"_DIGITAL_PIN_STATUS_13_TRUE\";}else if(digitalpin==13 && _digital_pins_active[13]==true && signal==false){cout <<\"_DIGITAL_PIN_STATUS_13_FALSE\";}}"

				+

				// DIGITALREAD IMPLEMENTATION
				"int digitalRead(int digitalpin);" +
				"int digitalRead(int digitalpin){return LOW;}"

				+

				// ANALOGWRITE IMPLEMENTATION
				"void analogWrite(int analogpin, int duty);" +
				"void analogWrite(int analogpin, int duty){if(analogpin==0){char analogPrefix[100] = \"_ANALOG_PIN_STATUS_0_\";analogWriteAppend(analogPrefix,duty);}else if(analogpin==1){char analogPrefix[100] = \"_ANALOG_PIN_STATUS_1_\";analogWriteAppend(analogPrefix,duty);}else if(analogpin==2){char analogPrefix[100] = \"_ANALOG_PIN_STATUS_2_\";analogWriteAppend(analogPrefix,duty);}else if(analogpin==3){char analogPrefix[100] = \"_ANALOG_PIN_STATUS_3_\";analogWriteAppend(analogPrefix,duty);}else if(analogpin==4){char analogPrefix[100] = \"_ANALOG_PIN_STATUS_4_\";analogWriteAppend(analogPrefix,duty);}else if(analogpin==5){char analogPrefix[100] = \"_ANALOG_PIN_STATUS_5_\";analogWriteAppend(analogPrefix,duty);}}" +
				"void analogWriteAppend(char *analogpin, unsigned int duty);" +
				"void analogWriteAppend(char *analogpin, unsigned int duty){if (duty==0){char dutyString[] = \"0\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==1){char dutyString[] = \"1\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==2){char dutyString[] = \"2\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==3){char dutyString[] = \"3\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==4){char dutyString[] = \"4\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==5){char dutyString[] = \"5\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==6){char dutyString[] = \"6\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==7){char dutyString[] = \"7\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==8){char dutyString[] = \"8\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==9){char dutyString[] = \"9\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==10){char dutyString[] = \"10\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==11){char dutyString[] = \"11\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==12){char dutyString[] = \"12\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==13){char dutyString[] = \"13\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==14){char dutyString[] = \"14\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==15){char dutyString[] = \"15\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==16){char dutyString[] = \"16\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==17){char dutyString[] = \"17\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==18){char dutyString[] = \"18\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==19){char dutyString[] = \"19\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==20){char dutyString[] = \"20\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==21){char dutyString[] = \"21\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==22){char dutyString[] = \"22\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==23){char dutyString[] = \"23\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==24){char dutyString[] = \"24\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==25){char dutyString[] = \"25\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==26){char dutyString[] = \"26\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==27){char dutyString[] = \"27\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==28){char dutyString[] = \"28\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==29){char dutyString[] = \"29\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==30){char dutyString[] = \"30\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==31){char dutyString[] = \"31\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==32){char dutyString[] = \"32\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==33){char dutyString[] = \"33\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==34){char dutyString[] = \"34\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==35){char dutyString[] = \"35\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==36){char dutyString[] = \"36\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==37){char dutyString[] = \"37\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==38){char dutyString[] = \"38\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==39){char dutyString[] = \"39\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==40){char dutyString[] = \"40\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==41){char dutyString[] = \"41\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==42){char dutyString[] = \"42\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==43){char dutyString[] = \"43\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==44){char dutyString[] = \"44\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==45){char dutyString[] = \"45\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==46){char dutyString[] = \"46\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==47){char dutyString[] = \"47\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==48){char dutyString[] = \"48\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==49){char dutyString[] = \"49\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==50){char dutyString[] = \"50\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==51){char dutyString[] = \"51\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==52){char dutyString[] = \"52\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==53){char dutyString[] = \"53\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==54){char dutyString[] = \"54\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==55){char dutyString[] = \"55\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==56){char dutyString[] = \"56\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==57){char dutyString[] = \"57\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==58){char dutyString[] = \"58\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==59){char dutyString[] = \"59\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==60){char dutyString[] = \"60\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==61){char dutyString[] = \"61\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==62){char dutyString[] = \"62\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==63){char dutyString[] = \"63\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==64){char dutyString[] = \"64\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==65){char dutyString[] = \"65\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==66){char dutyString[] = \"66\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==67){char dutyString[] = \"67\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==68){char dutyString[] = \"68\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==69){char dutyString[] = \"69\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==70){char dutyString[] = \"70\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==71){char dutyString[] = \"71\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==72){char dutyString[] = \"72\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==73){char dutyString[] = \"73\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==74){char dutyString[] = \"74\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==75){char dutyString[] = \"75\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==76){char dutyString[] = \"76\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==77){char dutyString[] = \"77\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==78){char dutyString[] = \"78\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==79){char dutyString[] = \"79\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==80){char dutyString[] = \"80\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==81){char dutyString[] = \"81\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==82){char dutyString[] = \"82\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==83){char dutyString[] = \"83\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==84){char dutyString[] = \"84\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==85){char dutyString[] = \"85\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==86){char dutyString[] = \"86\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==87){char dutyString[] = \"87\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==88){char dutyString[] = \"88\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==89){char dutyString[] = \"89\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==90){char dutyString[] = \"90\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==91){char dutyString[] = \"91\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==92){char dutyString[] = \"92\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==93){char dutyString[] = \"93\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==94){char dutyString[] = \"94\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==95){char dutyString[] = \"95\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==96){char dutyString[] = \"96\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==97){char dutyString[] = \"97\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==98){char dutyString[] = \"98\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==99){char dutyString[] = \"99\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==100){char dutyString[] = \"100\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==101){char dutyString[] = \"101\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==102){char dutyString[] = \"102\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==103){char dutyString[] = \"103\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==104){char dutyString[] = \"104\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==105){char dutyString[] = \"105\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==106){char dutyString[] = \"106\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==107){char dutyString[] = \"107\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==108){char dutyString[] = \"108\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==109){char dutyString[] = \"109\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==110){char dutyString[] = \"110\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==111){char dutyString[] = \"111\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==112){char dutyString[] = \"112\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==113){char dutyString[] = \"113\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==114){char dutyString[] = \"114\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==115){char dutyString[] = \"115\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==116){char dutyString[] = \"116\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==117){char dutyString[] = \"117\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==118){char dutyString[] = \"118\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==119){char dutyString[] = \"119\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==120){char dutyString[] = \"120\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==121){char dutyString[] = \"121\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==122){char dutyString[] = \"122\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==123){char dutyString[] = \"123\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==124){char dutyString[] = \"124\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==125){char dutyString[] = \"125\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==126){char dutyString[] = \"126\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==127){char dutyString[] = \"127\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==128){char dutyString[] = \"128\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==129){char dutyString[] = \"129\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==130){char dutyString[] = \"130\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==131){char dutyString[] = \"131\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==132){char dutyString[] = \"132\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==133){char dutyString[] = \"133\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==134){char dutyString[] = \"134\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==135){char dutyString[] = \"135\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==136){char dutyString[] = \"136\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==137){char dutyString[] = \"137\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==138){char dutyString[] = \"138\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==139){char dutyString[] = \"139\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==140){char dutyString[] = \"140\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==141){char dutyString[] = \"141\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==142){char dutyString[] = \"142\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==143){char dutyString[] = \"143\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==144){char dutyString[] = \"144\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==145){char dutyString[] = \"145\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==146){char dutyString[] = \"146\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==147){char dutyString[] = \"147\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==148){char dutyString[] = \"148\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==149){char dutyString[] = \"149\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==150){char dutyString[] = \"150\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==151){char dutyString[] = \"151\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==152){char dutyString[] = \"152\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==153){char dutyString[] = \"153\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==154){char dutyString[] = \"154\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==155){char dutyString[] = \"155\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==156){char dutyString[] = \"156\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==157){char dutyString[] = \"157\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==158){char dutyString[] = \"158\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==159){char dutyString[] = \"159\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==160){char dutyString[] = \"160\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==161){char dutyString[] = \"161\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==162){char dutyString[] = \"162\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==163){char dutyString[] = \"163\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==164){char dutyString[] = \"164\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==165){char dutyString[] = \"165\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==166){char dutyString[] = \"166\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==167){char dutyString[] = \"167\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==168){char dutyString[] = \"168\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==169){char dutyString[] = \"169\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==170){char dutyString[] = \"170\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==171){char dutyString[] = \"171\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==172){char dutyString[] = \"172\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==173){char dutyString[] = \"173\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==174){char dutyString[] = \"174\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==175){char dutyString[] = \"175\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==176){char dutyString[] = \"176\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==177){char dutyString[] = \"177\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==178){char dutyString[] = \"178\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==179){char dutyString[] = \"179\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==180){char dutyString[] = \"180\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==181){char dutyString[] = \"181\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==182){char dutyString[] = \"182\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==183){char dutyString[] = \"183\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==184){char dutyString[] = \"184\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==185){char dutyString[] = \"185\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==186){char dutyString[] = \"186\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==187){char dutyString[] = \"187\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==188){char dutyString[] = \"188\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==189){char dutyString[] = \"189\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==190){char dutyString[] = \"190\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==191){char dutyString[] = \"191\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==192){char dutyString[] = \"192\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==193){char dutyString[] = \"193\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==194){char dutyString[] = \"194\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==195){char dutyString[] = \"195\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==196){char dutyString[] = \"196\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==197){char dutyString[] = \"197\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==198){char dutyString[] = \"198\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==199){char dutyString[] = \"199\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==200){char dutyString[] = \"200\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==201){char dutyString[] = \"201\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==202){char dutyString[] = \"202\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==203){char dutyString[] = \"203\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==204){char dutyString[] = \"204\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==205){char dutyString[] = \"205\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==206){char dutyString[] = \"206\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==207){char dutyString[] = \"207\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==208){char dutyString[] = \"208\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==209){char dutyString[] = \"209\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==210){char dutyString[] = \"210\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==211){char dutyString[] = \"211\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==212){char dutyString[] = \"212\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==213){char dutyString[] = \"213\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==214){char dutyString[] = \"214\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==215){char dutyString[] = \"215\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==216){char dutyString[] = \"216\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==217){char dutyString[] = \"217\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==218){char dutyString[] = \"218\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==219){char dutyString[] = \"219\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==220){char dutyString[] = \"220\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==221){char dutyString[] = \"221\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==222){char dutyString[] = \"222\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==223){char dutyString[] = \"223\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==224){char dutyString[] = \"224\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==225){char dutyString[] = \"225\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==226){char dutyString[] = \"226\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==227){char dutyString[] = \"227\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==228){char dutyString[] = \"228\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==229){char dutyString[] = \"229\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==230){char dutyString[] = \"230\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==231){char dutyString[] = \"231\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==232){char dutyString[] = \"232\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==233){char dutyString[] = \"233\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==234){char dutyString[] = \"234\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==235){char dutyString[] = \"235\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==236){char dutyString[] = \"236\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==237){char dutyString[] = \"237\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==238){char dutyString[] = \"238\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==239){char dutyString[] = \"239\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==240){char dutyString[] = \"240\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==241){char dutyString[] = \"241\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==242){char dutyString[] = \"242\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==243){char dutyString[] = \"243\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==244){char dutyString[] = \"244\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==245){char dutyString[] = \"245\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==246){char dutyString[] = \"246\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==247){char dutyString[] = \"247\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==248){char dutyString[] = \"248\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==249){char dutyString[] = \"249\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==250){char dutyString[] = \"250\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==251){char dutyString[] = \"251\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==252){char dutyString[] = \"252\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==253){char dutyString[] = \"253\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==254){char dutyString[] = \"254\";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==255){char dutyString[] = \"255\";strcat(analogpin,dutyString);cout <<(analogpin);}}"

				+

				// ANALOGREAD IMPLEMENTATION
				"int analogRead(int analogpin);" +
				"int analogRead(int analogpin){return 0;}"

				+

				// DELAY IMPLEMENTATION
				"void delay(int milliseconds);" +
				"void delay(int milliseconds){int endingDelay=time(0)+(milliseconds/1000);while(time(0)<=endingDelay){}}"

				+

				// DELAYMICROSECONDS IMPLEMENTATION
				"void delayMicroseconds(int milliseconds);" +
				"void delayMicroseconds(int milliseconds){delay(milliseconds);}"

				+

				// PULSEIN IMPLEMENTATION
				"unsigned long pulseIn(int pin, int signal);" +
				"unsigned long pulseIn(int pin, int signal){return 0;}"

				+

				// SERIAL IMPLEMENTATION
				"int _Serial_Available();" +
				"int _Serial_Available(){return 0;}" +
				"int _Serial_Read();" +
				"int _Serial_Read(){return -1;}" +
				"void _Serial_Begin(int baudRate);" +
				"void _Serial_Begin(int baudRate){}"

				+

				// THE FOLLOWING BREAKLINES ARE NEED IN ORDER TO PREVENT JSCPP TO SHOW ANY OF THE PREVIOUS CODE IF THE USER CODE FAILS
				"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"

				+

				// ADDING THE ARDUINO SKETCH
				sketch;

	// SENDING THE SKETCH TO THE WEB WORKER IN ORDER TO BE EXECUTED
	myWorker.postMessage(code);
	}

function convertArduinoSketch(a)
	{
	// FINDING AND REPLACING ALL THE SERIAL.BEGIN
	a = a.replace(/Serial.begin/g,"_Serial_Begin");

	// FINDING AND REPLACING ALL THE SERIAL.PRINTLN
	a = a.replace(/Serial.println/g,"cout <<");

	// FINDING ALL THE COUT FUNCTIONS PREVIOUSLY IMPLEMENTED (BY REPLACING THE PRINTLN FUNCTION)
	// AND ADDING A BREAKLINE AFTER EACH COUT FUNCTION
	var reg = /cout <<\(.*\)/g;
	var matches = a.match(reg);
	if (matches)
		{
		for (var i = 0; i < matches.length; i++)
			{
			var replaceThis = new RegExp(escapeRegex(matches[i]),"g");
			var withThis = matches[i] + ";cout << \"<br />\"";
			a = a.replace(replaceThis, withThis);
			}
		}

	// FINDING AND REPLACING ALL THE SERIAL.PRINT
	a = a.replace(/Serial.print/g,"cout <<");

	// FINDING AND REPLACING ALL THE SERIAL.AVAILABLE
	a = a.replace(/Serial.available/g,"_Serial_Available");

	// FINDING AND REPLACING ALL THE SERIAL.READ
	a = a.replace(/Serial.read/g,"_Serial_Read");

	// FINDING AND REPLACING ALL THE PULSEIN FUNCTIONS
	a = a.replace(/pulseIn/g,"_pulseIn");

	// FINDING AND REPLACING ALL THE BOOLEAN FUNCTIONS
	a = a.replace(/boolean /g,"bool ");

	// RETURNING THE CONVERTED CODE
	return a;
	}

function escapeRegex(value)
	{
	return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");
	}

function getValueFromURL(name)
	{
	var url = location.href;
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
	}

window.addEventListener("resize", function()
	{
	// RESIZING THE EDITOR
	resizeArduinoSimulatorEditor();
	});

window.addEventListener("load", function()
	{
	// SETTING THAT THE WEB WORKER IS NOT RUNNING
	myWorkerRunning = false;

	// HIDING THE LOADING SPLASH
	document.getElementsByClassName("arduinosimulator_splash_container")[0].style.display = "none";

	// SHOWING THE CODE EDITOR
	document.getElementById("arduinosimulator_textcode_container").style.display = "block";

	// CHECKING IF THE USER SET A LED PIN VALUE IN THE URL
	try
		{
		var tempLedPin = getValueFromURL("ledpin");
		if (tempLedPin!=null)
			{
			tempLedPin = parseInt(tempLedPin);
			if (Number.isInteger(tempLedPin)==true)
				{
				myLedPin = tempLedPin;
				}
			}
		}
		catch(err)
		{
		}

	// CHECKING IF THE USER SET A DC MOTOR PIN VALUE IN THE URL
	try
		{
		var tempDCMotorPin = getValueFromURL("dcmotorpin");
		if (tempDCMotorPin!=null)
			{
			tempDCMotorPin = parseInt(tempDCMotorPin);
			if (Number.isInteger(tempDCMotorPin)==true)
				{
				myDCMotorPin = tempDCMotorPin;
				}
			}
		}
		catch(err)
		{
		}

	// CHECKING IF A LED PIN WAS SET AND UPDATING THE UI IF NECESSARY
	updateLedPinStatus();

	// CHECKING IF A DC MOTOR PIN WAS SET AND UPDATING THE UI IF NECESSARY
	updateDCMotorPinStatus();

	// SHOWING THE OUTPUT CONTAINER
	document.getElementsByClassName("arduinosimulator_output_container")[0].style.display = "block";

	// RESIZING THE EDITOR
	resizeArduinoSimulatorEditor();

	// SETTING WHAT HAPPENS WHEN EACH ELEMENT IS CLICKED
	document.getElementById("buttonNew").addEventListener("click",function(event){menuNewFile()});
	document.getElementById("buttonOpen").addEventListener("click",function(event){menuOpenFile()});
	document.getElementById("buttonSave").addEventListener("click",function(event){menuSaveFile()});
	document.getElementById("buttonUndo").addEventListener("click",function(event){menuUndo()});
	document.getElementById("buttonRedo").addEventListener("click",function(event){menuRedo()});
	document.getElementById("buttonSearch").addEventListener("click",function(event){menuSearch()});
	document.getElementById("buttonLed").addEventListener("click",function(event){menuLed()});
	document.getElementById("buttonRun").addEventListener("click",function(event){menuRun()});
	document.getElementById("buttonClear").addEventListener("click",function(event){clearSerialMonitor()});
	document.getElementById("arduinosimulator_filename").addEventListener("click",function(event){editor.focus()});
	});