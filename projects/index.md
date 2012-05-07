---
layout: default
title: Projects
Time-stamp: <2012-05-07 01:18:45>
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


<div class="project">
  <div class="project-icon image left">
    <a href="/projects/arduino-ds1302"
    title="arduino-ds1302"><img src="/static/images/questionmark.png"
    width="75" height="75" alt="arduino-ds1302" /></a>
  </div>

  <a href="/projects/arduino-ds1302" class="project-link">arduino-ds1302</a>

  <div class="project-desc">
    DS1302 Real Time Clock (RTC) library for Arduino.
  </div>

  <div class="project-activity meta">
    2009
  </div>
</div>


<div class="project">
  <div class="project-icon image left">
    <a href="/projects/cscredits"
    title="cscredits"><img src="/projects/cscredits/cscredits.png" width="75"
    height="75" alt="cscredits" /></a>
  </div>

  <a href="/projects/cscredits" class="project-link">cscredits</a>

  <div class="project-desc">
    A utility to manage bills for a resource shared equally among many people.
  </div>

  <div class="project-activity meta">
    2008
  </div>
</div>


<div class="project">
  <div class="project-icon image left">
    <a href="/projects/cumtd"
    title="cumtd">
      <img src="http://farm6.static.flickr.com/5129/5299728290_a11173930f_s.jpg"
      width="75" height="75" alt="WML phone interface listing upcoming buses"
      /></a>
  </div>

  <a href="/projects/cumtd" class="project-link">CUMTD Phone Interface</a>

  <div class="project-desc">
    Displays upcoming bus information for various stops in the Champaign-Urbana
    area.
  </div>

  <div class="project-activity meta">
    2006
  </div>
</div>
