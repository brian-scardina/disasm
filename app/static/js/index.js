/* 
 * Copyright 2016 MongoDB Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var URL_DELETE_FILE = '/delete_file';

if ($("#file_selector").val() == "") {
    $(".file_submit").prop("disabled", true);
}

$("#file_selector").change(function(e) {
    if ($(this).val() == "") { // disable submit
        $(".file_submit").prop("disabled", true);
    }
    else { // enable submit
        $(".file_submit").prop("disabled", false);
    }
});

var show_error = $('#meta-data').attr("data-show-error") === "True";
rivets.bind($('#errors'), {show_error: show_error});

// bind remove file
$(".file").on("click", ".remove-file", function(e) {
	var fileDiv = e.delegateTarget;
	fileDiv.getAttribute('data-uuid');
	// delete this file
  $.ajax({
    type: "DELETE",
    url: URL_DELETE_FILE + '?' + $.param({
    	'uuid': fileDiv.getAttribute('data-uuid')
    }),
  }).done(function(data) {
  	// if successfully removed metadata for this file
  	if (data["response"] && data["response"] == 1) {
  		fileDiv.remove();
  	}
  	else { // handle error
  		
  	}
  });
});

// fire off loading screen when you click a file, or when you upload a file
$(".filename a, .file_submit").on("click", function() {
  $('.overlay').fadeIn();
  $('.pacman').fadeIn();
});

// question/help
$(".help-button").on('click', function() {
  $.colorbox({
    href: "static/html/help.html", 
  });
});
            