$(document).ready(function() {
	
	// Logs //
	$("#Component").change(function(){
		if (!!$(this).val()) {
			$("#tblComponents").load("/logs/index/Component:" + $(this).val() + ' #tblComponents');
		} else {
			$("#tblComponents").load('/logs/index/ #tblComponents');
		}
	});

	$("#btnComponentRefresh").button().click(function(){
		if (!!$("#Component").val()) {
			$("#tblComponents").load("/logs/index/Component:" + $("#Component").val() + ' #tblComponents');
		} else {
			$("#tblComponents").load('/logs/index/ #tblComponents');
		}
	});
	// Logs //
	
	// Events //
	$( "#selectable" ).selectable({
		stop: function() {
			$("#selectable input").removeAttr("checked");
			$(".ui-selected input", this).each(function() {
				$(this).attr("checked", "checked");
			})
		}
	});

	$("#Events_list").selectable({ appendTo: "#Events_list li", filter: "li" });

	$("#EventsButtonDelete").click(function () {
		$("#Events_list li.ui-selected").each(function() {
			console.log($(this).attr('id'));
		});
	});

	$("#EventsButtonSearch").button();
	$("#EventsIndexForm").submit(function() {
		$base_url = '/events/index/';

		$( "li.ui-selected" ).each(function() {
			$monitor_id = $(this).attr('id').split('_');
			$base_url = $base_url + 'MonitorId:'+$monitor_id[1]+'/';
		});

		$start_date = $("#EventStartDate").val();
		$start_hour = $("#EventStartHour").val();
		$start_min = $("#EventStartMinute").val();

		$end_date = $("#EventEndDate").val();
		$end_hour = $("#EventEndHour").val();
		$end_min = $("#EventEndMinute").val();

		var start = $start_date + ' ' + $start_hour + ':' + $start_min;
		var end = $end_date + ' ' + $end_hour + ':' + $end_min;

		var start_epoch = new Date(start).getTime()/1000.0;
		var end_epoch = new Date(end).getTime()/1000.0;

		$base_url = $base_url + 'StartTime:'+start_epoch+'/';
		$base_url = $base_url + 'StartTime:'+end_epoch+'/';

		$('#Events').load($base_url + ' #Events');
	});

    $( "#EventStartDate" ).datepicker({
		changeMonth: true,
		changeYear: true,
		defaultDate: -1,
		onClose: function( selectedDate ) {
			$("#EventEndDate").datepicker( "option", "minDate", selectedDate );
		}
	});
	$("#EventStartDate").datepicker( "option", "dateFormat", "MM d, yy" );

	$( "#EventEndDate" ).datepicker({
		changeMonth: true,
		changeYear: true,
		defaultDate: +0,
		onClose: function( selectedDate ) {
			$("#EventStartDate").datepicker( "option", "maxDate", selectedDate );
		}
	});
	$("#EventEndDate").datepicker( "option", "dateFormat", "MM d, yy" );

	$("#PreviousEvent").button({
		text: false,
		icons: { primary: 'ui-icon-seek-start' }
	});
	$("#NextEvent").button({
		text: false,
		icons: { primary: 'ui-icon-seek-end' }
	});
	$("#RewindEvent").button({
		text: false,
		icons: { primary: 'ui-icon-seek-prev' }
	});
	$("#FastForwardEvent").button({
		text: false,
		icons: { primary: 'ui-icon-seek-next' }
	});

	$("#PlayEvent").button({
		 text: false,
		 icons: { primary: "ui-icon-play" }
	 })
	 .click(function() {
		 var options;
		 if ( $( this ).text() === "play" ) {
			 options = {
				 label: "pause",
		 icons: { primary: "ui-icon-pause" }
			 };
			 console.log('Pausing!');
		 } else {
			 options = {
				 label: "play",
		 icons: { primary: "ui-icon-play" }
			 };
		 }
		 $( this ).button( "option", options );
	 });

	$("#ZoomOutEvent").button({
		text: false,
		icons: { primary: 'ui-icon-zoomout' }
	});



	$("#daemonStatus").button();
	$("#daemonStatus").click(function(){
		$.post("/app/daemonControl", {command:'stop'})
		.done(function(data) {
			console.log(data);
		});
	});
	// Events //

	// Config //
	$("#tabs").tabs();
	$(document).tooltip({ track:true });
	$('#tabs .row:even').addClass('highlight');
	// Config //
	
	// Global //
	$('#loadingDiv').hide();
	$(document)
		.ajaxStart(function() {
			$('#loadingDiv').show();
		})
		.ajaxStop(function() {
			$('#loadingDiv').hide();
		});
	// Global //

});