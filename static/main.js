$(document).ready(function() {
    $('#transcriptForm').submit(function(event) {
        event.preventDefault(); 
        document.getElementById('spinner').style.display = 'block';
        
        var videoLink = $('#videoLink').val();
        
        $.ajax({
            type: 'POST',
            url: '/summarize',
            data: {video_link: videoLink},
            success: function(response) {
                document.getElementById('spinner').style.display = 'none';
                $('#summaryResult').show();
                $('#summaryContent').html(response.summary);
                $('#transcriptContent').html(response.transcript);
                
                // Initialize YouTube Player
                var player = new YT.Player('player', {
                    height: '360',
                    width: '100%',
                    videoId: response.video_id,
                    playerVars: {
                        'autoplay': 1,
                        'controls': 1
                    },
                    events: {
                        'onReady': onPlayerReady
                    }
                });
                
                // Scroll to the summary result section
                $('html, body').animate({
                    scrollTop: $('#summaryResult').offset().top
                }, 1000);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

    // Switch between Summary and Transcript tabs
    $('#summaryTab').click(function() {
        $('#summaryTab').addClass('active');
        $('#transcriptTab').removeClass('active');
        $('#summaryContent').addClass('show active');
        $('#transcriptContent').removeClass('show active');
    });

    $('#transcriptTab').click(function() {
        $('#transcriptTab').addClass('active');
        $('#summaryTab').removeClass('active');
        $('#transcriptContent').addClass('show active');
        $('#summaryContent').removeClass('show active');
    });

    function onPlayerReady(event) {
        event.target.playVideo();
    }
});

function copyText() {
    var textToCopy = $('.tab-pane.active').text();
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Text copied successfully');
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
}

function downloadText() {
    var textToDownload = $('.tab-pane.active').text();
    var videoLink = $('#videoLink').val();
    var blob = new Blob([textToDownload + '\n\nVideo Link: ' + videoLink], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "summary.txt");
}

document.getElementById('inputLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior (e.g., navigation)
    document.getElementById('videoLink').focus(); // Focus on the input field
});

$(document).ready(function() {
    $('html, body').animate({ scrollTop: 0 }, 'fast'); // Scroll to top when page is loaded
});