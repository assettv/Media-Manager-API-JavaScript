# Media Manager External API - Javascript

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


## API Responses

All responses will be returned as ``json``.

### Pages

All responses will be returned in a paged format.

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

Value for ``data`` is an ``array`` of all the api content. The functions outlined in this document will automatically return the ``data``.


## Embedding

You may wish to record analytics against your external template so that it appears under the `SHOW template`. You can make sure this happens by using the `mediamanager.external.embed()` function instead of `mediamanager.embed()`.
This function embeds into an element with an id based on the given external template id if no element id is given.

``` javascript
mdiamanager.external.embed("{external_template_id}", "{element_id}"); //element_id is not required
```

If you do not embed this way, then all analytics will be recorded against the template you provided using `mediamanager.template()` only.

``` html
<script src="https://{shortname}.getmediamanager.com/js/mm.embed.v1.min.js"></script>
```

Simply replace ``{shortname}`` with your accounts shortname.


## Templates

A list of the template APIs that can be used on the external API.

### Most viewed videos on template

You can get the most viewed videos on template

``` javascript
mediamanager.external.template.getMostViewedVideos(template_id, onComplete, filters);
```

**Params**
- `template_id`: String
    - A Media Manager Template ID.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.

### Recommend video

This will return a recommendation based on another video.

``` javascript
mediamanager.external.template.recommendVideo(template_id, video_id, onComplete, filters);
```

**Params**
- `template_id`: String 
    - A Media Manager Template ID.
- `video_id`: String
    - A Media Manager Video ID.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.

### Search videos

Search videos on given template. 

``` javascript
mediamanager.external.template.searchVideos(template_id, term, onComplete, filters);
```

**Params**
- `template_id`: String
    - A Media Manager Template ID.
- `term`: String | Array(String)
    - A string with the term by which to search.
    - Or an array of strings, each with a term by which to search.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.

### Get videos

Get all videos on a given template.

``` javascript
mediamanager.external.template.getVideos(template_id, onComplete, filters);
```

**Params**
- `template_id`: String
    - A Media Manager Template ID.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.

### Get audios

Get all audios on a given template.

``` javascript
mediamanager.external.template.getAudios(template_id, onComplete, filters);
```

**Params**
- `template_id`: String
    - A Media Manager Template ID.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.

## Playlists

The playlist APIs allow you to get content on a external template, but filter the content down by a playlist.

### Get all audio

Get all audio on a given template and playlist.

``` javascript
mediamanager.external.playlist.getAudios(playlist_id, template_id, onComplete, filters);
```

**Params**
- `playlist_id`: String
    - A Media Manager Playlist ID.
- `template_id`: String
    - A Media Manager Template ID.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.

### Get videos

Get all audios on a given template and playlist.

``` javascript
mediamanager.external.playlist.getVideos(playlist_id, template_id, onComplete, filters);
```

**Params**
- `playlist_id`: String
    - A Media Manager Playlist ID.
- `template_id`: String
    - A Media Manager Template ID.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.

### Get video

Get video on a given template and playlist.

``` javascript
mediamanager.external.playlist.getVideos(playlist_id, template_id, video_id, onComplete, filters);
```

**Params**
- `playlist_id`: String
    - A Media Manager Playlist ID.
- `template_id`: String
    - A Media Manager Template ID.
- `video_id`: String
    - A Media Manager Video ID.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.

### Get audio

Get audio on a given template and playlist.

``` javascript
mediamanager.external.playlist.getAudio(playlist_id, template_id, audio_id, onComplete, filters);
```

**Params**
- `playlist_id`: String
    - A Media Manager Playlist ID.
- `template_id`: String
    - A Media Manager Template ID.
- `audio_id`: String
    - A Media Manager Audio ID.
- `onComplete`: Function
    - Callback for when template videos were retrieved.
- `filters`: Object
    - Filters to apply to the API request.


### Global Filters

You can also add filters to the API calls by using the `addFilter` function. This allows you to filter down your content further. The `addFilter` function returns a new instance of the mediamanager.external object with the filterName and filterValue added to its globalFilters property.

``` javascript
mediamanager.external = mediamanager.external.addFilter(filterName, filterValue);
```

**Params**
- `filterName`: String
    - The key or name of a filter to apply.
- `filterValue`: String | Number
    - The value of a filter to apply.

**Example**

``` javascript
//CHANGE THE API TO RETURN 2 RESULTS PER PAGE.
mediamanager.external = mediamanager.external.addFilter("perPage", 2);
```

## Errors

**Invalid 'templateID'**

An invalid templateID has been passed.

**Template is not an external template**

The template you have passed is not a "external template".

**API Cannot be called from {domain}**

External APIs can only be called from the registered domain of the external template.
