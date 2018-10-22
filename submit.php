<!doctype html>
<html>

	<head>
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="./css/styles.css">
		<title>MLS5 Story Creator | Submitted</title>
	</head>

	<body>
		
		<h1>MLS5 Story Creator</h1>
		<p>A tool to build story data to use in MLS5. Exports to JSON format.</p>
		
		<?php
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
			header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With');

			// Handling data in JSON format on the server-side using PHP
			header("Content-Type: application/json");
			
			// build a PHP variable from JSON sent using POST method
			$submission = json_decode(stripslashes(file_get_contents("php://input")));
			
			//build a PHP variable from the JSON of the existing submission file
			$existingStories = json_decode(stripslashes(file_get_contents("./res/data/data_eventsStory_submissions.json")));
			
			//append the submission to the existing story JSON
			array_push($existingStories, $submission);
			
			// save the merged JSON to a file
			file_put_contents("./res/data/data_eventsStory_submissions.json", json_encode($existingStories));

		?>
		<h2>Submission received!</h2>
	</body>
	
</html>