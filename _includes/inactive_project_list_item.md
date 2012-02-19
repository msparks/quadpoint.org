<div class="project">
  <div class="project-icon image left">
    <a href="{{node.link}}" title="{{node.title}}">
      <img src="{{node.icon}}" width="75" height="75" alt="{{node.title}}" />
    </a>
  </div>

  <a href="{{node.link}}" class="project-link">{{node.title}}</a>

  <div class="project-desc">
    {{node.content}}
  </div>

  <div class="project-activity meta">
    {{node.date|date:"%Y"}}
  </div>
</div>
