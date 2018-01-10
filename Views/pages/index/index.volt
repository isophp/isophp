{% extends "layout/index.volt" %}

{% block title %}Index{% endblock %}

{% block head %}<style type="text/css">.important { color: #336699; }</style>{% endblock %}

{% block content %}
    <h1>首页</h1>
    {{ partial('partial/article') }}
{% endblock %}