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

There are a number of different external APIs for getting template data. All template APIs are called on the template object.

``` javascript
mediamanager.external.template.{functionName};
```

### Most viewed videos on template

You can get the most viewed videos on template

``` javascript
getTemplateMostViewedVideos("{template_id"}, Function onComplete);
```

### Recommend template video

This will return a recommendation based on another video.

``` javascript
recommendTemplateVideo("{template_id"}, "{video_id}", Function onComplete);
```

### Search template videos

Search videos on given template. 

``` javascript
searchTemplateVideos("{template_id"}, "{term}", Function onComplete);
```

You can also pass an ``array`` of search terms also.

``` javascript
searchTemplateVideos("{template_id"}, ["term1","term2"], Function onComplete);
```
