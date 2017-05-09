var images = {
  colour_shape: ['Stimuli/bottle_clear.png', 'Stimuli/bottle_odd.png', 'Stimuli/bottle_green1.png', 'Stimuli/bottle_green2.png'],
  colour_orientation: ['Stimuli/greenUp.png', 'Stimuli/orangeDown.png', 'Stimuli/orangeUp.png', 'Stimuli/orangeUp.png'],
  colour_size: ['Stimuli/yellow.png', 'Stimuli/green_big.png', 'Stimuli/green_small.png', 'Stimuli/green_small.png'],
  shape_orientation: ['Stimuli/cup_odd.png', 'Stimuli/cup_plain1.png', 'Stimuli/cup_plain2.png', 'Stimuli/cup_plain2.png'],
  shape_size: ['Stimuli/circle.png', 'Stimuli/triangle_big.png', 'Stimuli/triangle_small.png', 'Stimuli/triangle_small.png'],
  shape_number: ['Stimuli/triangle.png', 'Stimuli/circle_double.png', 'Stimuli/circle_single.png', 'Stimuli/circle_single.png'],
  number_colour: ['Stimuli/blue_single.png', 'Stimuli/blueRed.png', 'Stimuli/blueWhite1.png', 'Stimuli/blueWhite2.png'],
  number_size: ['Stimuli/little_double.png','Stimuli/big_single.png',  'Stimuli/little_single.png', 'Stimuli/little_single.png'],
  instrumentType_orchestra: ['Stimuli/flute.png', 'Stimuli/guitar.png', 'Stimuli/violin.png', 'Stimuli/cello.png'],
  letter_familiarity: ['Stimuli/Nassau.png', 'Stimuli/London.png', 'Stimuli/Luanda.png', 'Stimuli/Lusaka.png'],
  status_familiarity: ['Stimuli/Poland.png', 'Stimuli/Paris.png', 'Stimuli/Pretoria.png', 'Stimuli/Perth.png'],
  manMade_noWater: ['Stimuli/bath.png', 'Stimuli/mountain.png', 'Stimuli/river.png', 'Stimuli/lake.png'],
  gender_letter: ['Stimuli/Adam.png', 'Stimuli/Emma.png', 'Stimuli/Anna.png', 'Stimuli/Alice.png'],
  meaning_wordType: ['Stimuli/door.png', 'Stimuli/eat.png', 'Stimuli/bread.png', 'Stimuli/cheese.png'],
  deadLang_currentLang: ['Stimuli/latin.png', 'Stimuli/english.png', 'Stimuli/spanish.png', 'Stimuli/french.png'],
  flying_engine: ['Stimuli/helicopter.png', 'Stimuli/bicycle.png', 'Stimuli/car.png', 'Stimuli/bus.png']
};

var keys = Object.keys( images );

var trials = [];

for(i = 0; i < keys.length; i++) {
  var stim = {
    stimuli: images[keys[i]],
    likely: ['most','second','unlikely','unlikely']
  }
  
  var o = [0, 1, 2, 3]
  var order = jsPsych.randomization.shuffle(o);
  
  var grid = {};
  var g = [[stim.stimuli[order[0]], stim.stimuli[order[1]]], [stim.stimuli[order[2]], stim.stimuli[order[3]]]];
  grid.stimuli = g
  
  var l = [[stim.likely[order[0]], stim.likely[order[1]]], [stim.likely[order[2]], stim.likely[order[3]]]];
  grid.likely = l
  
  trials.push(grid);
  
}

var trials = jsPsych.randomization.shuffleNoRepeats(trials);

var scale1 = ["Strongly Disagree", "Disagree", "Moderately Disagree", "Neutral", "Moderately Agree", "Agree", "Strongly Agree"];

var welcome_block = {
  type: "text", 
  text: "Welcome to the experiment. Press C to begin.", 
  cont_key: 'c'
}

var consent = {
  type: "survey-likert",
  preamble: "<p> </p><p><b>CONSENT FORM</b></p><p> </p>" +
    "<p>You are invited to participate in a study that is conducted at the Cognitive Science Department of Central European University, " +
    "Budapest, and at the Hebrew University of Jerusalem, led by Professor Natalie Sebanz and Dr. Ruth Mayo. This is an online experiment that " +
    "you can complete anywhere.</p><p><b>Purpose, usefulness, and benefits of the Study.</b> The purpose of this research is to allow us to " +
    "better understand how people act together. The research is useful because it will help us to understand the specific coordination and " +
    "communication abilities of humans. A potential benefit of participating in the study is that you can get familiar with Cognitive Science research.</p>" +
    "<p><b>Procedure.</b> If you choose to participate in the study, you will receive more detailed instructions about the specific tasks. " +
    "In this study, you will be asked to make decisions about images that appear on the screen, using the keys on your keyboard. " +
    "You will be connected with our experimental server, where your responses will be connected remotely with another individual. " +
    "This other person will not be able to see any responses that you make, and will not have remote access to your computer. " +
    "In this experiment, your payment will be calculated on the basis of your and your partner's responses. To ensure the confidentiality of your " +
    "and your partner's responses, only a small subset of trials will be used to calculate this payment (e.g. a random subset of five out of fifteen trials will " +
    "be selected and your payment based off of that. This ensures that you cannot work out each others' responses on the basis of your reward).</p>" +
    "<p><b>Potential Risks.</b> Any risks associated with participation in this experiment are minimal. " +
    "Your online privacy is as secure as if you were using any other site, and depends on your personal security measures on your computer.</p>" +
    "<p><b>Your rights as a participant.</b> Participation in this study is voluntary. You may choose not to participate, and you may withdraw " +
    "at any time during the study without giving any reason. " +
    "If you choose to withdraw now or later, you can do so by pressing the ESCAPE key and closing your browser window. " +
    "If you withdraw from the study, your data will not be recorded. If you have signed up for this through an online experiment recruitment service, " +
    "you will be reimbursed for your time through that service. You will receive a minimum of USD$.05 (???), with additional rewards calculated " +
    "on the basis of your performance with your partner.</p>" +
    "<p><b>Data storage and protection.</b> In this study, we will record information about your performance (e.g., how fast you moved and how " +
    "many correct responses you gave). These data are confidential. We use a number code to identify the data. The data will not be directly " +
    "linked to your name, IP address, or any other identifying information. " +
    "Information about your identity is kept strictly separate from the code and data. The same is true for questionnaire data. " +
    "You may be given a questionnaire about your general disposition towards other people. A code will be assigned to these questionnaires and they " +
    "will not be directly linked to any personal information. " +
    "Experimenters do not have access to your identifying information beyond what is provided by the experiment recruitment service, and we comply with their " +
    "<a href='https://help.surveymonkey.com/articles/en_US/kb/Data-Ownership'>Data Security Protocols</a>We take secure storage of the collected data very seriously. " +
    "Data that we do collect will be stored on password-protected servers. The recorded data are accessible only to the lead researcher of the " +
    "study and those to whom he or she explicitly grants access rights.</p>" +
    "<p><b>Questions?</b> If you have any questions about the study or how your data will be protected, feel free to contact Dr. " +
    "James Strachan (<a href='mailto:strachanj@ceu.edu'>strachanj@ceu.edu</a>)." +
    "If you are happy to proceed, please click the radio button below.",
  questions: ["I give my consent for my data to be used in the way described above"],
  labels: [" "]
}

var instructions_block = {
  type: "text",
  text: "<p> </p><p><b>TASK INSTRUCTIONS</b></p><p> </p>" +
    "<p>In this experiment you will be paired with a partner - they have completed the same " +
    "task as you and their responses have been recored. The task involves seeing four images appear on the screen " +
    "and choosing one of the images. Your task is to pick the <i>same image</i> as your partner did..</p>" +
    "<p>The response keys (1-4) correspond to different " +
    "positions, as shown below:</p>" +
    "<center><table style='width: 250px; height: 250px; border: #999999 1px solid;'>" +
    "<tr><td align='center' valign='center' style='border: #999999 1px solid'>1</td>" +
    "<td align='center' valign='center' style='border: #999999 1px solid'>2</td>" +
    "</tr><tr><td align='center' valign='center' style='border: #999999 1px solid'>3</td>" +
    "<td align='center' valign='center' style='border: #999999 1px solid'>4</td>" +
    "</tr></table></center>" +
    "<br/><p>Your task is to pick the <b>same image as your partner</b> as often as " +
    "possible.</p><p>Before each task you will see a grid reminding you of the response keys for each position.</p>" +
    "<p>When you are ready to continue, press C bar to begin.", 
  cont_key: 'c'
}

var debrief_block = {
  type: "text",
  text: "<p>That's everything. Thank you very much.</p>" +
    "<p>Press any key to end the experiment.</p>"
}

var reminder = {
  type: "vsl-grid-scene",
  stimuli: [['Stimuli/1.png', 'Stimuli/2.png'], ['Stimuli/3.png', 'Stimuli/4.png']],
  image_size: [250,250],
  timing_post_trial: 0,
  timing_stim: 500
}

var waiting_forP2 = {
  type: 'multi-stim-multi-response',
  stimuli: ['<div id="countdown"><i>Waiting to establish connection with Player 2...</i></div>',
            '<div id="countdown"><b>Ready...</b></div>',
            '<div id="countdown">3</div>',
            '<div id="countdown">2</div>',
            '<div id="countdown">1</div>'],
  timing_stim: [3000, 1000, 1000, 1000, 1000],
  timing_response: 7000,
  choices: 'none', 
  is_html: true,
  response_ends_trial: false
};

var fixation = {
  type: 'single-stim', 
  stimulus: 'Stimuli/face1.png',
  timing_stim: 1000,
  timing_response: 1000,
  choices: 'none',
  timing_post_trial: 0
}

var questionnaire1 = {
  type: 'survey-likert',
  preamble: "<p>This is the last page!</p><p>We would like to ask some general questions on this page. " +
    "Please indicate how much you agree with each of the following statements using the response buttons.</p>",
  questions: ["Most people are basically honest.", 
              "Most people are trustworthy.",
              "Most people are basically good and kind.",
              "Most people are trustful of others.",
              "I am trustful.",
              "To show you are paying attention, strongly disagree with this statement.",
              "Most people will respond in kind when they are trusted by others."],
  labels: [scale1, scale1, scale1, scale1, scale1, scale1, scale1]
};

var timeline = [];
timeline.push(welcome_block);
timeline.push(consent);
timeline.push(instructions_block);

for(i = 0; i < (trials.length); i++) {
  timeline.push(reminder);
  
  var grid_block = {
    type: 'grid-stim',
    stimuli: trials[i].stimuli,
    data: {
      likely: trials[i].likely
    },
    choices: ['1', '2', '3', '4']
  };
  
  timeline.push(grid_block);
  
}

timeline.push(questionnaire1);
timeline.push(debrief_block);

function sendData(data){
   $.ajax({
     type: 'POST',
     data: {data: JSON.stringify(data)},
     url: 'https://jameswastrachan.000webhostapp.com/sendData.php'
   });
}

/* start the experiment */
  jsPsych.init({
    display_element: $('#jspsych-target'),
    timeline: timeline,
    fullscreen: true,
    on_finish: function(data) {
      console.log(jsPsych.data.dataAsCSV());
      sendData(jsPsych.data.dataAsCSV()) 
    }
  })