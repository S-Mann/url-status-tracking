# url-status-tracking
Continuously track the current status of a site

You might need to allow CORS on chrome. All you need to do in the index page is add the required URL and it will be tracked automatically.

Currently the time between updates is hardcoded to **1 min** and any [HTTP Status Codes](https://httpstatuses.com/) except for `500s` is considered healthy.
