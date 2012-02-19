<div class="project">
  <div class="project-icon image left">
    <a href="{{node.link}}" title="{{node.title}}">
      <img src="{{node.icon}}" width="75" height="75" alt="{{node.title}}" />
    </a>
  </div>

  <a href="{{node.link}}" class="project-link">{{node.title}}</a>

  <div class="project-desc">
    {{node.summary}}
  </div>

  <div class="project-activity meta">
    <span id="{{node.github | replace: '/','-'}}-commit"></span>
  </div>
</div>

<script type="text/javascript">
$(window).load(function () {
  var al = new libgithub.ActivityLine('msparks', 'arduino-ds1620');
  al.gravatarSizeIs(0);
  al.targetIs('#{{node.github | replace: '/','-'}}-commit');
});
</script>
