---
layout: default
title: Projects
Time-stamp: <2012-05-05 18:31:24>
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


<div class="project">
  <div class="project-icon image left">
    <a href="/projects/infinitemachine" title="infinitemachine"><img
    src="/projects/infinitemachine/infinitemachine.png" width="75" height="75"
    alt="infinitemachine" /></a>
  </div>

  <a href="/projects/infinitemachine" class="project-link">infinitemachine</a>

  <div class="project-desc">
    A static content website generator.
  </div>

  <div class="project-activity meta">
    <span id="infinitemachine-commit"></span>
  </div>
</div>

<script type="text/javascript">
$(window).load(function () {
  var al = new libgithub.ActivityLine('msparks', 'infinitemachine');
  al.gravatarSizeIs(0);
  al.targetIs('#infinitemachine-commit');
});
</script>


<div class="project">
  <div class="project-icon image left">
    <a href="/projects/irssiscripts" title="irssiscripts"><img
    src="/projects/irssiscripts/irssiscripts.png" width="75" height="75"
    alt="irssiscripts" /></a>
  </div>

  <a href="/projects/irssiscripts" class="project-link">irssiscripts</a>

  <div class="project-desc">
    A collection of scripts I have written
    for <a href="http://irssi.org">Irssi</a>.
  </div>

  <div class="project-activity meta">
    <span id="irssiscripts-commit"></span>
  </div>
</div>

<script type="text/javascript">
$(window).load(function () {
  var al = new libgithub.ActivityLine('msparks', 'irssiscripts');
  al.gravatarSizeIs(0);
  al.targetIs('#irssiscripts-commit');
});
</script>


<div class="project">
  <div class="project-icon image left">
    <a href="/projects/libgithub" title="libgithub"><img
    src="/static/images/questionmark.png" width="75" height="75"
    alt="libgithub" /></a>
  </div>

  <a href="/projects/libgithub" class="project-link">libgithub</a>

  <div class="project-desc">
    A JavaScript library to display GitHub data on websites. It populates
    the 'Activity' lines on this page.
  </div>

  <div class="project-activity meta">
    <span id="libgithub-commit"></span>
  </div>
</div>

<script type="text/javascript">
$(window).load(function () {
  var al = new libgithub.ActivityLine('msparks', 'libgithub');
  al.gravatarSizeIs(0);
  al.targetIs('#libgithub-commit');
});
</script>


<div class="project">
  <div class="project-icon image left">
    <a href="/projects/pastee" title="pastee"><img
    src="/static/images/questionmark.png" width="75" height="75"
    alt="pastee" /></a>
  </div>

  <a href="/projects/pastee" class="project-link">pastee</a>

  <div class="project-desc">
    A secure pastebin.
  </div>

  <div class="project-activity meta">
    <span id="pastee-commit"></span>
  </div>
</div>

<script type="text/javascript">
$(window).load(function () {
  var al = new libgithub.ActivityLine('msparks', 'pastee');
  al.gravatarSizeIs(0);
  al.targetIs('#pastee-commit');
});
</script>


<div class="project">
  <div class="project-icon image left">
    <a href="https://github.com/msparks/svcshare"
       title="dotfiles" target="_blank">
      <img src="/static/images/questionmark.png" width="75" height="75"
           alt="svcshare" />
    </a>
  </div>

  <a href="https://github.com/msparks/svcshare"
     class="project-link" target="_blank">svcshare</a>

  <div class="project-desc">
    A distributed queueing system.
  </div>

  <div class="project-activity meta">
    <span id="svcshare-commit"></span>
  </div>
</div>

<script type="text/javascript">
$(window).load(function () {
  var al = new libgithub.ActivityLine('msparks', 'svcshare');
  al.gravatarSizeIs(0);
  al.targetIs('#svcshare-commit');
});
</script>

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
    <a href="/projects/alphasign"
    title="alphasign"><img src="/static/images/questionmark.png" width="75"
    height="75" alt="alphasign" /></a>
  </div>

  <a href="/projects/alphasign" class="project-link">alphasign</a>

  <div class="project-desc">
    An implementation of the Alpha Sign Communications Protocol in Python. It
    is used to control Alpha American LED signs.
  </div>

  <div class="project-activity meta">
    2009
  </div>
</div>


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
