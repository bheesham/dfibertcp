// Copyright (C) 2011 Bheesham Persaud.
show_torrent_start = function( id ) {
	 $( '#torrent-controls-' + id + ' span.torrent-stop' ).hide();
	 $( '#torrent-controls-' + id + ' span.torrent-wait' ).hide();
	 $( '#torrent-controls-' + id + ' span.torrent-start' ).show();
}
show_torrent_stop = function( id ) {
	$( '#torrent-controls-' + id + ' span.torrent-start' ).hide();
	$( '#torrent-controls-' + id + ' span.torrent-wait' ).hide();
	$( '#torrent-controls-' + id + ' span.torrent-stop' ).show();
}

show_torrent_wait = function( id ) {
	$( '#torrent-controls-' + id + ' span.torrent-stop' ).hide();
	$( '#torrent-controls-' + id + ' span.torrent-start' ).hide();
	$( '#torrent-controls-' + id + ' span.torrent-wait' ).show();
}

show_torrent_other = function( id ) {
	$( '#torrent-controls-' + id + ' span.torrent-delete' ).show();
	$( '#torrent-controls-' + id + ' span.torrent-options' ).show();
	$( '#torrent-controls-' + id + ' span.torrent-show-files' ).show();
}

update_torrents = function( base_url, ids ) {
	$.getJSON( base_url + 'index.php/Ajax/info/' + ids , function(data) {
		if ( data.result == 'success' ) {
			 $.each( data.arguments.torrents , function( i, torrent ) {
				$( '#torent-progress-bar-' + torrent.id ).css( 'width', ( torrent.percentDone*100 ).toFixed(2) + '%' );
				$( '#torent-progress-bar-' + torrent.id + ' p' ).text( ( torrent.percentDone*100 ).toFixed(2) + '%' );
				
				$( '#upload-' + torrent.id ).text( jQuery.fn.size_from_bytes( torrent.rateUpload ) );
				$( '#download-' + torrent.id ).text( jQuery.fn.size_from_bytes( torrent.rateDownload ) );
				
				$( '#uploaded-' + torrent.id ).text( jQuery.fn.size_from_bytes( torrent.uploadedEver ) );
				
				$( '#downloaded-' + torrent.id ).text( jQuery.fn.size_from_bytes( torrent.downloadedEver ) );
				
				$( '#peers-downloading-' + torrent.id ).text( torrent.peersSendingToUs );
				$( '#peers-connected-' + torrent.id ).text( torrent.peersConnected );
				
				$( '#eta-' + torrent.id ).text( torrent.eta );
				$( '#eta-' + torrent.id ).time_from_seconds();
				
				if ( torrent.status == 1 ) {
					$( '#status-' + torrent.id ).text('Waiting to verify...');
				} else if ( torrent.status == 2 ) {
					$( '#status-' + torrent.id ).text('Verifying...');
				} else if ( torrent.status == 4 ) {
					$( '#status-' + torrent.id ).text('Downloading');
					show_torrent_stop( torrent.id );
				} else if ( torrent.status == 8 ) {
					$( '#status-' + torrent.id ).text('Seeding');
					show_torrent_stop( torrent.id );
				} else if ( torrent.status == 16 ) {
					$( '#status-' + torrent.id ).text('Stopped');
					show_torrent_start( torrent.id );
				}
				show_torrent_other( torrent.id );
			 });
		} else {
			alert( data.error );
		}
	});
}

$(document).ready(function() {
	var base_url = $('#base_url').attr('value');
	
	// Hide the upload form for now
	if ( $('#show-upload-torrent-form').is('*') ) {
		document.getElementById('torrent-options').style.display = 'none';
		document.getElementById('upload-torrent').style.display = 'none';
	}
	
	// Set to vibrate the login form on error.
	if ( $('p.error').is('*') && $('#login-form').is('*') ) {
		var params = {
			frequency: 5000,
			spread: 10,
			duration: 1000
		};
		$('#login-form').vibrate( params );
	}
	
	// Hide the upload form, epand it when they want it.
	$('#show-upload-torrent-form').click( function() {
		if( document.getElementById('upload-torrent').style.display == 'none' ) {
			document.getElementById('upload-torrent').style.display = 'block';
		} else {
			document.getElementById('upload-torrent').style.display = 'none';
		}
	});
	$('#expand-torrent-options').click( function() {
		if(document.getElementById('torrent-options').style.display == 'none') {
			document.getElementById('torrent-options').style.display = 'block';
		} else {
			document.getElementById('torrent-options').style.display = 'none';
		}
	});
	
	// Initiate the tool tip.
	$('.hover').hover( function(e) {
		$('#hover-title-box').html( $(this).attr('title') );
		$(this).attr( 'title', '' )
		$('#hover-title-box').css( { display: 'block', position: 'absolute', top: ( e.pageY+5 ) + 'px' , left: ( e.pageX ) + 'px', 'z-index': 999 } );
		}, function() {
			$(this).attr( 'title', $('#hover-title-box').html() )
			$('#hover-title-box').css( { display: 'none' } );
		}
	);
	
	$(".hover").mousemove( function(e) {
		$('#hover-title-box').css( { top: ( e.pageY+5 ) + "px" , left: ( e.pageX ) + "px" } );
	});
	
	// Update the torrents' information
	if ( $('#uploaded-torrents-list').is('*') ) {
		setInterval( function() {
			update_torrents( base_url, $('#transmission-ids').attr('value') );
		}, 2000 );
	}
	
	// Controls
	$('span.torrent-start').click( function() {
		var id = $(this).attr( 'class' );
		id = id.replace( 'torrent-start torrent-control-', '' );
		show_torrent_wait();
		$.getJSON( base_url + 'index.php/Ajax/start/' + id , function(data) {
			if ( data.result == 'success' ) {
				show_torrent_stop();
			} else {
				show_torrent_start();
				alert( data.error );
			}
		});
	});
	
	$('span.torrent-stop').click( function() {
		var id = $(this).attr( 'class' );
		id = id.replace( 'torrent-stop torrent-control-', '' );
		show_torrent_wait();
		$.getJSON( base_url + 'index.php/Ajax/stop/' + id , function(data) {
			if ( data.result == 'success' ) {
				show_torrent_start();
			} else {
				show_torrent_stop();
				alert( data.error );
			}
		});
	});
	
	$('span.torrent-options').click( function() {
		var id = $(this).attr( 'class' );
		id = id.replace( 'torrent-options torrent-control-', '' );
		var upload = prompt( 'Upload speed (KiB/s):', 200 );
		var download = prompt( 'Download speed (KiB/s):', 200 );
		upload = parseInt( upload );
		download = parseInt( download );
		if ( typeof upload == 'number' && typeof download == 'number' && upload > 0 && download > 0 ) {
			$.getJSON( base_url + 'index.php/Ajax/options/' + id + '/' + upload + '/' + download, function(data) {
				if ( data.result != 'success' ) {
					alert( data.error );
				}
			});
		} else {
			alert( 'You must enter an integer value above 0.' );
		}
	});
	
	$('span.torrent-delete').click( function() {
		var id = $(this).attr( 'class' );
		id = id.replace( 'torrent-delete torrent-control-', '' );
		var del = confirm('Delete this torrent?');
		if ( del ) {
			$.getJSON( base_url + 'index.php/Ajax/delete/' + id, function(data) {
				if ( data.result == 'success' ) {
					var removed = $('#transmission-ids').attr('value');
					removed = removed.replace( id, '' );
					$('#transmission-ids').attr('value', removed )
					$( 'div.torrent-container-' + id ).remove();
					$( '#torrent-files-' + id ).remove();
					alert( 'That torrent has been deleted successfully.' );
				} else {
					alert( data.error );
				}
			});
		}
	});
		
	$('span.torrent-show-files').click( function() {
		var id = $(this).attr( 'class' );
		id = id.replace( 'torrent-show-files torrent-control-', '' );
		$( '#torrent-files-' + id ).toggle( 'fast', function() {
			$.getJSON( base_url + 'index.php/Ajax/files/' + id, function(data) {
				if ( data.result == 'success' ) {
					var ret = new Array;
					ret.push('Filename... Size (When complete)');
					$.each( data.arguments.torrents , function( i, torrent ) {
						$.each( torrent.files , function( i, file ) {
							ret.push( file.name + '... ' + jQuery.fn.size_from_bytes( file.length ) );
						});
					});
					ret = ret.join( "<br />" );
					$( '#torrent-files-' + id ).html( ret );
				} else {
					alert( data.error );
				}
			});
		});
		
	});
});