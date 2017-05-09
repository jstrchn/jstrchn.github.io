/**
 * jsPsych plugin for showing scenes that mimic the experiments described in
 *
 * Fiser, J., & Aslin, R. N. (2001). Unsupervised statistical learning of
 * higher-order spatial structures from visual scenes. Psychological science,
 * 12(6), 499-504.
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['grid-stim'] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    // default parameter values
    trial.image_size = trial.image_size || [250, 250];
    trial.timing_stim = trial.timing_stim || -1;
    trial.timing_response = trial.timing_response || -1;
    trial.choices = trial.choices || [];
    trial.response_ends_trial = (typeof trial.response_ends_trial == 'undefined') ? true : trial.response_ends_trial;

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
    display_element.html(plugin.generate_stimulus(trial.stimuli, trial.image_size));

    // this array holds handlers from setTimeout calls
    // that need to be cleared if the trial ends early
    var setTimeoutHandlers = [];

    // store response
    var response = {
      rt: -1,
      key: -1
    };
    
    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      for (var i = 0; i < setTimeoutHandlers.length; i++) {
        clearTimeout(setTimeoutHandlers[i]);
      }

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimuli,
        "key_press": response.key 
      };

      //jsPsych.data.write(trial_data);

      // clear the display
      display_element.html('');

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      $("#jspsych-single-stim-stimulus").addClass('responded');

      // only record the first response
      if (response.key == -1) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
        allow_held_key: false}
        );
    }
    
    // hide image if timing is set
    if (trial.timing_stim > 0) {
      var t1 = setTimeout(function() {
        $('#jspsych-single-stim-stimulus').css('visibility', 'hidden');
      }, trial.timing_stim);
      setTimeoutHandlers.push(t1);
    }

    // end trial if time limit is set
    if (trial.timing_response > 0) {
      var t2 = setTimeout(function() {
        end_trial();
      }, trial.timing_response);
      setTimeoutHandlers.push(t2);
    }

  };

 plugin.generate_stimulus = function(pattern, image_size) {
    var nrows = pattern.length;
    var ncols = pattern[0].length;

    // create blank element to hold code that we generate
    $('body').append($('<div>', {
      id: 'jspsych-vsl-grid-scene-dummy',
      css: {
        display: 'none'
      }
    }));

    // create table
    $('#jspsych-vsl-grid-scene-dummy').append($('<table>', {
      id: 'jspsych-vsl-grid-scene-table',
      css: {
        'border-collapse': 'collapse',
        'margin-left': 'auto',
        'margin-right': 'auto'
      }
    }));

    for (var row = 0; row < nrows; row++) {
      $("#jspsych-vsl-grid-scene-table").append($('<tr>', {
        id: 'jspsych-vsl-grid-scene-table-row-' + row,
        css: {
          height: image_size[1] + "px"
        }
      }));
      for (var col = 0; col < ncols; col++) {
        $("#jspsych-vsl-grid-scene-table-row-" + row).append($('<td>', {
          id: 'jspsych-vsl-grid-scene-table-' + row + '-' + col,
          css: {
            padding: image_size[1] / 10 + "px " + image_size[0] / 10 + "px",
            border: '1px solid #555'
          }
        }));
        $('#jspsych-vsl-grid-scene-table-' + row + '-' + col).append($('<div>', {
          id: 'jspsych-vsl-grid-scene-table-cell-' + row + '-' + col,
          css: {
            width: image_size[0] + "px",
            height: image_size[1] + "px"
          }
        }));
      }
    }


    for (var row = 0; row < nrows; row++) {
      for (var col = 0; col < ncols; col++) {
        if (pattern[row][col] !== 0) {
          $('#jspsych-vsl-grid-scene-table-cell-' + row + '-' + col).append($('<img>', {
            src: pattern[row][col],
            css: {
              width: image_size[0] + "px",
              height: image_size[1] + "px",
            }
          }));
        }
      }
    }

    var html_out = $('#jspsych-vsl-grid-scene-dummy').html();
    $('#jspsych-vsl-grid-scene-dummy').remove();

    return html_out;

  };

  return plugin;
})();
