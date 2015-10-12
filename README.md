# Media Manager External API - Javascript

## Setting up

## Setting client

You will need to set your shortname, this can be done via the ``client`` function.

``` javascript
mediamanager.external.client("{shortname}");
```

## Templates

There are a number of different external APIs for getting template data.

### Most viewed videos

You can get the most viewed videos on template

``` javascript
mediamanager.external.template.getTemplateMostViewed("{template_id"});
```