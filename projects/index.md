---
layout: default
title: Projects
extensions: ['libgithub', 'math']
Time-stamp: <2012-05-07 22:52:39>
---

This is a collection of public projects I've started or worked on. Most are
software, but I have done a few electronics projects as well.

## Active Projects

I consider a project to be 'active' if I make semi-frequent updates to it and
use it frequently.

{% assign group = 'projects' %}
  {% for node in site.pages %}
    {% if group == node.group %}
{% include project_list_item.md %}
    {% endif %}
  {% endfor %}
{% assign group = nil %}

## Completed and Inactive Projects

The projects I no longer frequently work on are listed here. However, unless
otherwise specified, I do accept patches to these. It is also possible that
some of these may just be on hiatus.

{% assign group = 'projects-inactive' %}
  {% for node in site.pages %}
    {% if group == node.group %}
{% include inactive_project_list_item.md %}
    {% endif %}
  {% endfor %}
{% assign group = nil %}
