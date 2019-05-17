<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Elaborazioni</title>

<!-- Bootstrap CSS -->
<c:import url="./include/importh.jsp" />

</head>

<body>
	<main> <header>
		<c:import url="./include/menu.jsp" />
		<br>
		<h1>Elaborazioni</h1>
	</header>
	<article>
		<div class="container">
			<select class="js-example-data-array" name="state">
			</select>
			<input type="button" value="seleziona" id="selElab">		
		</div>

	</article>

	</main>

	<c:import url="./include/script.jsp" />
	<script src="./js/elaborazioni.js" type="module"></script>


</body>
</html>
