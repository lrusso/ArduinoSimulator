// CREATING THE WEB WORKER (THE CPP COMPILER)
var myWorker;
var myWorkerRunning;

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

function menuRun()
	{
	try
		{
		// CHECKING IF THE WEB WORKER IS RUNNING
		if (myWorkerRunning==false)
			{
			// UPDATING THE WEB WORKER STATUS
			myWorkerRunning = true;

			// CREATING THE WEB WORKER
			myWorker = new Worker("ArduinoSimulatorCompiler.js");

			// SETTING WHAT HAPPENS WHEN DATA IS RECEIVED FROM THE WEB WORKER
			myWorker.onmessage = function(e)
				{
				// ADDING DATA TO THE SERIAL MONITOR
				document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML = document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].innerHTML + e.data;
				}

			// RUNNING THE SKETCH
			runSketch(editor.getValue());
			}
			else
			{
			// UPDATING THE WEB WORKER STATUS
			myWorkerRunning = false;

			// TERMINATING THE WEB WORKER
			myWorker.terminate();
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
	// Converting the Arduino methods and classes (JSCPP doesn't support structs yet)
	sketch = convertArduinoSketch(sketch);

	var code = "#include <iostream>" +

				// main implementation that will execute setup and loop
				"int main(){int internalLoopSystem=0;setup();while(true){loop();internalLoopSystem=internalLoopSystem+1;}return 0;}"

				+

				// setup and loop prototypes implementation
				"void setup();" +
				"void loop();"

				+

				// adding the Arduino sketch
				sketch

				+

				// Serial implementation (JSCPP doesn't support structs yet)
				"void _Serial_Begin(int baudRate);" +
				"void _Serial_Begin(int baudRate){}" +
				"void _Serial_Print(char *text);" +
				"void _Serial_Print(char *text){while(*text){cout << (*text);++text;};}" +
				"void _Serial_Println(char *text);" +
				"void _Serial_Println(char *text){while(*text){cout << (*text);++text;}cout << \"<br/>\";}";

	// SENDING THE SKETCH TO THE WEB WORKER IN ORDER TO BE EXECUTED
	myWorker.postMessage(code);
	}

function convertArduinoSketch(a)
	{
	a = a.replaceAll("Serial.begin","_Serial_Begin");
	a = a.replaceAll("Serial.println","_Serial_Println");
	a = a.replaceAll("Serial.print","_Serial_Print");
	return a;
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

	// SHOWING THE SERIAL MONITOR
	document.getElementsByClassName("arduinosimulator_output_container")[0].style.display = "block";
	document.getElementsByClassName("arduinosimulator_output_monitor")[0].style.display = "block";
	document.getElementsByClassName("arduinosimulator_output_monitor_data")[0].style.display = "block";
	document.getElementsByClassName("arduinosimulator_output_monitor_title")[0].style.display = "block";
	

	// RESIZING THE EDITOR
	resizeArduinoSimulatorEditor();

	// SETTING WHAT HAPPENS WHEN EACH ELEMENT IS CLICKED
	document.getElementById("buttonNew").addEventListener("click",function(event){menuNewFile()});
	document.getElementById("buttonOpen").addEventListener("click",function(event){menuOpenFile()});
	document.getElementById("buttonSave").addEventListener("click",function(event){menuSaveFile()});
	document.getElementById("buttonUndo").addEventListener("click",function(event){menuUndo()});
	document.getElementById("buttonRedo").addEventListener("click",function(event){menuRedo()});
	document.getElementById("buttonSearch").addEventListener("click",function(event){menuSearch()});
	document.getElementById("buttonRun").addEventListener("click",function(event){menuRun()});
	document.getElementById("arduinosimulator_filename").addEventListener("click",function(event){editor.focus()});
	});