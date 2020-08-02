// CREATING THE WEB WORKER (THE CPP INTERPRETER)
var myWorker;
var myWorkerRunning;
var myPinLed = -1;
var myPinsOnBoard = 13;

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
		// STOPPING THE EMULATION (IF RUNNING)
		stoppingEmulator();

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
		stoppingEmulator();

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
		if (myPinLed+1>myPinsOnBoard)
			{
			// DISCONNECTING THE LED
			myPinLed = -1;
			}
			else
			{
			// UPDATING THE PIN LED VALUE
			myPinLed = myPinLed + 1;
			}

		// UPDATING THE PIN LED STATUS
		updatePinLedStatus();
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
				// GETTING THE DATA SENT FROM THE EMULATOR
				var myReceivedData = e.data;

				// CHECKING IF THE EMULATOR SAID THAT THE CODE HAS A BUG
				if (myReceivedData==null)
					{
					// STOPPING THE EMULATION
					stoppingEmulator();
					}
					else
					{
					// CHECKING IF A DIGITAL PIN EVENT OCCURRED (THE SAME LOGIC IS APPLIED FOR ANALOG EVENTS)
					if (myReceivedData.indexOf("_DIGITAL_PIN_STATUS_")>-1)
						{
						// CHECKING IF THE DIGITAL PIN THAT GOT THE CALL IS THE SAME AS THE ONE IN MYPINVARIABLE
						if (myReceivedData.indexOf("_" + myPinLed + "_")>-1)
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
						else
						{
						// ADDING THE RECEIVED DATA TO THE SERIAL MONITOR
						document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML = document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML + myReceivedData;
						}
					}
				}

			// RUNNING THE SKETCH
			runSketch(editor.getValue());
			}
			else
			{
			// STOPPING THE EMULATION
			stoppingEmulator();
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

function stoppingEmulator()
	{
	try
		{
		// TERMINATING THE WEB WORKER
		try{myWorker.terminate()}catch(err){}

		// UPDATING THE MENU RUN ICON
		document.getElementById("buttonRun").className = "arduinosimulator_button_run_enabled";

		// UPDATING THE WEB WORKER STATUS
		myWorkerRunning = false;

		// UPDATING THE PIN LED STATUS
		updatePinLedStatus();
		}
		catch(err)
		{
		}
	}

function updatePinLedStatus()
	{
	try
		{
		// SETTING THE DEFAULT LED IMAGE
		document.getElementById("ledStatus").className = "arduinosimulator_output_hardware_led_image_off";

		// CHECKING IF A PIN LED WAS SET AND IF IT IS VALID
		if (myPinLed>-1 && myPinLed<=myPinsOnBoard)
			{
			// UPDATING THE PIN LED LABEL WITH THE SELECTED DIGITAL PIN
			document.getElementsByClassName("arduinosimulator_output_hardware_led_label_value")[0].innerHTML = "CONNECTED<br/>TO D" + myPinLed;
			}
			else
			{
			// SETTING THE DEFAULT VALUE FOR THE PIN LED
			myPinLed = -1;

			// UPDATING THE PIN LED LABEL WITH A NOT CONNECTION SIGN
			document.getElementsByClassName("arduinosimulator_output_hardware_led_label_value")[0].innerHTML = "NOT<br />CONNECTED";
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

	var code = "#include <iostream>\n#include <ctime>\n#include <cmath>\n" +

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

				// ANALOG PINS IMPLEMENTATION
				"bool _analog_pins_active[6] = {false,false,false,false,false,false};"

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

				// ANALOGWRITE IMPLEMENTATION
				"void analogWrite(int analogpin, bool signal);" +
				"void analogWrite(int analogpin, bool signal){if(analogpin==0 && _analog_pins_active[0]==true && signal==true){cout <<\"_analog_PIN_STATUS_0_TRUE\";}else if(analogpin==0 && _analog_pins_active[0]==true && signal==false){cout <<\"_analog_PIN_STATUS_0_FALSE\";}else if(analogpin==1 && _analog_pins_active[1]==true && signal==true){cout <<\"_analog_PIN_STATUS_1_TRUE\";}else if(analogpin==1 && _analog_pins_active[1]==true && signal==false){cout <<\"_analog_PIN_STATUS_1_FALSE\";}else if(analogpin==2 && _analog_pins_active[2]==true && signal==true){cout <<\"_analog_PIN_STATUS_2_TRUE\";}else if(analogpin==2 && _analog_pins_active[2]==true && signal==false){cout <<\"_analog_PIN_STATUS_2_FALSE\";}else if(analogpin==3 && _analog_pins_active[3]==true && signal==true){cout <<\"_analog_PIN_STATUS_3_TRUE\";}else if(analogpin==3 && _analog_pins_active[3]==true && signal==false){cout <<\"_analog_PIN_STATUS_3_FALSE\";}else if(analogpin==4 && _analog_pins_active[4]==true && signal==true){cout <<\"_analog_PIN_STATUS_4_TRUE\";}else if(analogpin==4 && _analog_pins_active[4]==true && signal==false){cout <<\"_analog_PIN_STATUS_4_FALSE\";}else if(analogpin==5 && _analog_pins_active[5]==true && signal==true){cout <<\"_analog_PIN_STATUS_5_TRUE\";}else if(analogpin==5 && _analog_pins_active[5]==true && signal==false){cout <<\"_analog_PIN_STATUS_5_FALSE\";}}"

				+

				// DELAY IMPLEMENTATION
				"void delay(int milliseconds);" +
				"void delay(int milliseconds){int endingDelay=time(0)+(milliseconds/1000);while(time(0)<=endingDelay){}}"

				+

				// DELAYMICROSECONDS IMPLEMENTATION
				"void delayMicroseconds(int milliseconds);" +
				"void delayMicroseconds(int milliseconds){delay(milliseconds);}"

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

	// FINDID ALL THE COUT FUNCTIONS PREVIOUSLY IMPLEMENTED (BY REPLACING THE PRINTLN FUNCTION)
	// AND ADDING A BREAKLINE AFTER EACH COUT FUNCTION
	var reg = /cout <<\(.*\)/g;
	matches = a.match(reg);
	for (var i = 0; i < matches.length; i++)
		{
		var replaceThis = new RegExp(escapeRegex(matches[i]),"g");
		var withThis = matches[i] + ";cout << \"<br />\"";
		a = a.replace(replaceThis, withThis);
		}

	// FINDING AND REPLACING ALL THE SERIAL.PRINT
	a = a.replace(/Serial.print/g,"cout <<");

	// FINDING AND REPLACING ALL THE SERIAL.AVAILABLE
	a = a.replace(/Serial.available/g,"_Serial_Available");

	// FINDING AND REPLACING ALL THE SERIAL.READ
	a = a.replace(/Serial.read/g,"_Serial_Read");

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

	// CHECKING IF THE USER SET A PIN VALUE IN THE URL
	try
		{
		var tempPinLed = getValueFromURL("pinled");
		if (tempPinLed!=null)
			{
			tempPinLed = parseInt(tempPinLed);
			if (Number.isInteger(tempPinLed)==true)
				{
				myPinLed = tempPinLed;
				}
			}
		}
		catch(err)
		{
		}

	// CHECKING IF A PIN LED WAS SET AND UPDATING THE UI IF NECESSARY
	updatePinLedStatus();

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