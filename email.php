<!doctype html>
<html>

	<head>
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="./css/styles.css">
		<title>EMAIL TEST | Submitted</title>
	</head>

	<body>
		
		
		<?php
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
			header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With');

			// Handling data in JSON format on the server-side using PHP
			header("Content-Type: application/json");
		
			$to = "contact@niallslater.com";
			$subject = "Test email";
			$txt = "Test email content\ntest test test";
			$headers = "From: robot@niallslater.com";

			mail($to,$subject,$txt,$headers);
			echo "Mail sent";
		?>
	</body>
	
</html>