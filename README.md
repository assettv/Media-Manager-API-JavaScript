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
```

### Get audios

Get all audios on a given template

``` javascript
mediamanager.external.template.getAudios("{template_id"}, Function onComplete);
```

## Playlists

The playlist APIs allow you to get content on a external template, but filter the content down by a playlist.

### Get audios

Get all audios on a given template and playlist

``` javascript
mediamanager.external.playlist.getAudios("{playlist_id}","{template_id"}, Function onComplete);
```

### Get videos

Get all audios on a given template and playlist

``` javascript
mediamanager.external.playlist.getVideos("{playlist_id}","{template_id"}, Function onComplete);
```

### Get video

Get video on a given template and playlist

``` javascript
mediamanager.external.playlist.getVideos("{playlist_id}","{template_id"},"{video_id}", Function onComplete);
```

### Get audio

Get audio on a given template and playlist

``` javascript
mediamanager.external.playlist.getVideos("{playlist_id}","{template_id"},"{audio_id}", Function onComplete);
```

## Responses

All responses will be returned as ``json``. Sometimes errors can be thrown.

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