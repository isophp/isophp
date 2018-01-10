<!DOCTYPE html>
<html>
<head>
    {% block head %}
        <link rel="stylesheet" href="style.css" />
    {% endblock %}

    <title>{% block title %}{% endblock %} - My Webpage</title>
</head>

<body>
<div id="content">{% block content %}{% endblock %}</div>
<div id="footer">
    {% block footer %}&copy; Copyright 2018, ISOPHP社区.{% endblock %}
</div>
</body>
</html>
