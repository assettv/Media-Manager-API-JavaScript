# Media Manager External API - Javascript

This library allows you to easily interact with Media Managers External APIs.

## Setting up

First you must add the library code to the ``head`` tag.

``` html
<script src="mediamanager-external-library.js"></script>
```

## Setting client

You will need to set your shortname, this can be done via the ``client`` function.

``` javascript
mediamanager.external.client("{shortname}");
```

## onComplete

All API functions can be passed a ``onComplete`` function. 

``` javascript
function(json, code, request){
  
}
```

## Templates

A list of the template APIs that can be used on the external API.

### Most viewed videos on template

You can get the most viewed videos on template

``` javascript
mediamanager.external.template.getMostViewedVideos("{template_id"}, Function onComplete);
```

### Recommend template video

This will return a recommendation based on another video.

``` javascript
mediamanager.external.template.recommendVideo("{template_id"}, "{video_id}", Function onComplete);
```

### Search template videos

Search videos on given template. 

``` javascript
mediamanager.external.template.searchVideos("{template_id"}, "{term}", Function onComplete);
```

You can also pass an ``array`` of search terms also.

``` javascript
mediamanager.external.template.searchVideos("{template_id"}, ["term1","term2"], Function onComplete);
```

### Get videos

Get all videos on a given template

``` javascript
mediamanager.external.template.getVideos("{template_id"}, Function onComplete);

### Get audios

Get all audios on a given template

``` javascript
mediamanager.external.template.getVideos("{template_id"}, Function onComplete);
```