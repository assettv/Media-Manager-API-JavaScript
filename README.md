# Media Manager External API - Javascript

## Setting up

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

### Most viewed videos

You can get the most viewed videos on template

``` javascript
getTemplateMostViewedVideos("{template_id"}, Function onComplete);
```