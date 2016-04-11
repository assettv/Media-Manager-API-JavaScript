# Media Manager External API - Javascript

[![Build Status](https://travis-ci.org/media-manager/Media-Manager-API-JavaScript.svg?branch=patch/tests)](https://travis-ci.org/media-manager/Media-Manager-API-JavaScript)

This library allows you to easily interact with Media Manager's External APIs.

## Setting up

### Script

First you must add the library code to the ``head`` tag.

``` html
<script src="mediamanager-external-library-min.js"></script>
```

### Dependencies

Each dependency listed here needs to be added before the Media Manager External Libarary script, like in the example above.

- Media Manager embed library*
- [nanoajax](https://github.com/yanatan16/nanoajax)

*The Media Manager embed library can be retrieved from this link `https://{shortname}.getmediamanager.com/js/mm.embed.v1.min.js`, where `{shortname}` is your Media Manager shortname. 
This is the subdomain of your Media Manager dashboard URL: `https://{shortname}.getmediamanager.com/`.

### Setting client

You will need to set your shortname, this can be done via the ``client`` function.

``` javascript
mediamanager.external.client("{shortname}");
```

### onComplete

All API functions can be passed a `onComplete` function. 

``` javascript
function(json, code, request){
  
}
```

## Embedding

You may wish to record analytics against your external template so that it appears under the `SHOW template`. You can make sure this happens by using the `mediamanager.external.embed()` function instead of `mediamanager.embed()`.

``` javascript
mdiamanager.external.embed("{external_template_id}","{element_id}"); //element_id is not required
```

If you do not embed this way, then all analytics will be recorded against the template you provided using ``mediamanager.template()`` only.

``` html
<script src="https://{shortname}.getmediamanager.com/js/mm.embed.v1.min.js"></script>
```

Simply replace ``{shortname}`` with your accounts shortname.

## Templates

A list of the template APIs that can be used on the external API.

### Most viewed videos on template

You can get the most viewed videos on template

``` javascript
mediamanager.external.template.getMostViewedVideos("{template_id"}, Function onComplete, filters);
```

### Recommend video

This will return a recommendation based on another video.

``` javascript
mediamanager.external.template.recommendVideo("{template_id"}, "{video_id}", Function onComplete, filters);
```

### Search videos

Search videos on given template. 

``` javascript
mediamanager.external.template.searchVideos("{template_id"}, "{term}", Function onComplete, filters);
```

You can also pass an ``array`` of search terms also.

``` javascript
mediamanager.external.template.searchVideos("{template_id"}, ["term1","term2"], Function onComplete, filters);
```

### Get videos

Get all videos on a given template.

``` javascript
mediamanager.external.template.getVideos("{template_id"}, Function onComplete, filters);
```

### Get audios

Get all audios on a given template.

``` javascript
mediamanager.external.template.getAudios("{template_id"}, Function onComplete, filters);
```

## Playlists

The playlist APIs allow you to get content on a external template, but filter the content down by a playlist.

### Get audios

Get all audios on a given template and playlist.

``` javascript
mediamanager.external.playlist.getAudios("{playlist_id}","{template_id"}, Function onComplete, filters);
```

### Get videos

Get all audios on a given template and playlist.

``` javascript
mediamanager.external.playlist.getVideos("{playlist_id}","{template_id"}, Function onComplete, filters);
```

### Get video

Get video on a given template and playlist.

``` javascript
mediamanager.external.playlist.getVideos("{playlist_id}","{template_id"},"{video_id}", Function onComplete, filters);
```

### Get audio

Get audio on a given template and playlist.

``` javascript
mediamanager.external.playlist.getVideos("{playlist_id}","{template_id"},"{audio_id}", Function onComplete, filters);
```

## Global Filters

You can also add filters to the API calls by using the ``addFilter`` function. This allows you to filter down your content further. The ``addFilter`` function returns a new instance of the mediamanager.external object with the filterName and filterValue added to its globalFilters property.

``` javascript
mediamanager.external = mediamanager.external.addFilter("{filterName}", "{filterValue}");
```

**e.g.**

``` javascript
//CHANGE THE PAGER TO BE 2 PER PAGE.
mediamanager.external = mediamanager.external.addFilter("perPage",2);
```

## Responses

All responses will be returned as ``json``.

### Paged

All responses will be returned in paged format.

``` javascript
{
    current_page: 1,
    data: [...],
    from: 1,
    last_page: 1,
    per_page: 24,
    to: 5,
    total: 5
}
```

``data`` contains an ``array`` of all the api content. The functions above will automatically return the ``data``.

### Errors

**Invalid 'templateID'**

An invalid templateID has been passed.

**Template is not an external template**

The template you have passed is not a "external template".

**API Cannot be called from {domain}**

External APIs can only be called from the registered domain of the external template.
